import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getRankingProductDetail } from '@/features/ranking/api/getRankingProductDetail';
import type { RankingProductDetailDto } from '@/features/ranking/types/ranking';
import { createReview } from '../api/createReview';
import { getReviewById } from '../api/getReviewById';
import { updateReview } from '../api/updateReview';
import { uploadReviewImages } from '../api/uploadReviewImages';
import type { ReviewFormMode, ReviewImagePreview } from '../types/reviewForm';
import { getReviewErrorMessage } from '../utils/reviewError';
import { invalidateReviewQueries } from '../utils/invalidateReviewQueries';
import { useReviewImages } from './useReviewImages';
import { showToast } from '@/shared/utils';

type UseReviewFormParams = {
  mode: ReviewFormMode;
  productId: number;
  reviewId?: number;
};

type ReviewSubmitStage = 'imageUpload' | 'reviewSubmit';

const REVIEW_SUBMIT_STAGE_LABEL: Record<ReviewSubmitStage, string> = {
  imageUpload: '후기 이미지 업로드',
  reviewSubmit: '후기 저장',
};

const getReviewSubmitErrorMessage = (error: unknown, stage: ReviewSubmitStage) => {
  const stageLabel = REVIEW_SUBMIT_STAGE_LABEL[stage];
  return `${stageLabel} 실패: ${getReviewErrorMessage(error, '요청을 처리할 수 없습니다.')}`;
};

export const useReviewForm = ({ mode, productId, reviewId }: UseReviewFormParams) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditMode = mode === 'edit';
  const [product, setProduct] = useState<RankingProductDetailDto | null>(null);
  const [canEdit, setCanEdit] = useState(!isEditMode);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [loadRequestVersion, setLoadRequestVersion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { imagePreviewList, setImagePreviewList, handleImageChange, handleImageRemove } =
    useReviewImages({ onValidationError: setSubmitError });

  useEffect(() => {
    let active = true;
    const reviewRequest = isEditMode && reviewId ? getReviewById(reviewId) : Promise.resolve(null);

    Promise.all([reviewRequest, getRankingProductDetail(productId)])
      .then(([review, productResponse]) => {
        if (!active) return;
        if (!productResponse.isSuccess || !productResponse.result) {
          throw new Error(productResponse.message);
        }
        setCanEdit(!isEditMode || Boolean(review));
        setContent(review?.content ?? '');
        setRating(review?.rating ?? 0);
        setImagePreviewList(
          review?.imageKeys.map((imageKey, index) => ({
            id: `existing-${index}-${imageKey}`,
            previewUrl: review.imageUrls[index],
            imageKey,
          })) ?? [],
        );
        setProduct(productResponse.result);
      })
      .catch(() => {
        if (active) setLoadError('후기 정보를 불러올 수 없습니다.');
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isEditMode, loadRequestVersion, productId, reviewId, setImagePreviewList]);

  const handleRetryLoad = () => {
    setIsLoading(true);
    setLoadError('');
    setLoadRequestVersion((version) => version + 1);
  };

  const handleSubmit = async () => {
    if (!content.trim() || rating === 0 || isSubmitting || (isEditMode && !reviewId)) return;
    setIsSubmitting(true);
    setSubmitError('');
    let submitStage: ReviewSubmitStage = 'imageUpload';

    try {
      const newImageList = imagePreviewList.filter(
        (image): image is ReviewImagePreview & { file: File } => Boolean(image.file),
      );
      const uploadedImageKeyList = newImageList.length
        ? await uploadReviewImages(newImageList.map((image) => image.file))
        : [];
      let uploadedImageIndex = 0;
      const imageKeys = imagePreviewList.map((image) => {
        if (image.imageKey) return image.imageKey;
        const imageKey = uploadedImageKeyList[uploadedImageIndex];
        uploadedImageIndex += 1;
        return imageKey;
      });

      if (imageKeys.some((imageKey) => !imageKey)) {
        throw new Error('업로드된 이미지 키를 확인할 수 없습니다.');
      }

      submitStage = 'reviewSubmit';

      if (isEditMode && reviewId) {
        await updateReview(reviewId, { rating, content: content.trim(), imageKeys });
        router.back();
      } else {
        await createReview({ productId, rating, content: content.trim(), imageKeys });
        await invalidateReviewQueries(queryClient, productId);
        showToast.success('후기가 등록됐어요!');
        router.push(`/reviews?productId=${productId}`);
      }
    } catch (error) {
      setSubmitError(getReviewSubmitErrorMessage(error, submitStage));
      if (!isEditMode) {
        showToast.error('후기 등록에 실패했어요. 다시 시도해 주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    product,
    canEdit,
    content,
    rating,
    imagePreviews: imagePreviewList,
    isLoading,
    loadError,
    isSubmitting,
    submitError,
    setContent,
    setRating,
    handleImageChange,
    handleImageRemove,
    handleRetryLoad,
    handleSubmit,
  };
};
