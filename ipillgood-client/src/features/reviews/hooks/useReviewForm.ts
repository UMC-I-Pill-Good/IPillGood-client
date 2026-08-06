import { useRouter } from 'next/navigation';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import { getRankingProductDetail } from '@/features/ranking/api/getRankingProductDetail';
import type { RankingProductDetailDto } from '@/features/ranking/types/ranking';
import { createReview } from '../api/createReview';
import { getReviewById } from '../api/getReviewById';
import { updateReview } from '../api/updateReview';
import { uploadReviewImages } from '../api/uploadReviewImages';
import { MAX_REVIEW_IMAGE_COUNT, SUPPORTED_REVIEW_IMAGE_TYPE_LIST } from '../constants/reviewForm';
import type { ReviewFormMode, ReviewImagePreview } from '../types/reviewForm';

interface UseReviewFormParams {
  mode: ReviewFormMode;
  productId: number;
  reviewId?: number;
}

type ReviewSubmitStage = 'imageUpload' | 'reviewSubmit';

const REVIEW_SUBMIT_STAGE_LABEL: Record<ReviewSubmitStage, string> = {
  imageUpload: '후기 이미지 업로드',
  reviewSubmit: '후기 저장',
};

const getReviewSubmitErrorMessage = (error: unknown, stage: ReviewSubmitStage) => {
  const stageLabel = REVIEW_SUBMIT_STAGE_LABEL[stage];

  if (isAxiosError<{ code?: string; message?: string }>(error)) {
    const errorCode = error.response?.data.code;
    const errorMessage = error.response?.data.message;
    const responseMessage = [errorCode, errorMessage].filter(Boolean).join(' ');

    return `${stageLabel} 실패: ${responseMessage || `HTTP ${error.response?.status ?? '오류'}`}`;
  }

  return error instanceof Error ? `${stageLabel} 실패: ${error.message}` : `${stageLabel} 실패`;
};

export const useReviewForm = ({ mode, productId, reviewId }: UseReviewFormParams) => {
  const router = useRouter();
  const isEditMode = mode === 'edit';
  const [product, setProduct] = useState<RankingProductDetailDto | null>(null);
  const [canEdit, setCanEdit] = useState(!isEditMode);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [imagePreviews, setImagePreviews] = useState<ReviewImagePreview[]>([]);
  const imagePreviewsRef = useRef<ReviewImagePreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [loadRequestVersion, setLoadRequestVersion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
        setImagePreviews(
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
  }, [isEditMode, loadRequestVersion, productId, reviewId]);

  const handleRetryLoad = () => {
    setIsLoading(true);
    setLoadError('');
    setLoadRequestVersion((version) => version + 1);
  };

  useEffect(() => {
    imagePreviewsRef.current = imagePreviews;
  }, [imagePreviews]);

  useEffect(
    () => () => {
      imagePreviewsRef.current.forEach((image) => {
        if (image.file) URL.revokeObjectURL(image.previewUrl);
      });
    },
    [],
  );

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(event.target.files ?? []);
    if (!fileList.length) return;
    const supportedFileList = fileList.filter((file) =>
      SUPPORTED_REVIEW_IMAGE_TYPE_LIST.includes(file.type),
    );
    const availableCount = Math.max(0, MAX_REVIEW_IMAGE_COUNT - imagePreviews.length);

    if (supportedFileList.length !== fileList.length) {
      setSubmitError('JPG, PNG, WEBP 형식의 이미지만 첨부할 수 있습니다.');
    } else if (supportedFileList.length > availableCount) {
      setSubmitError(`이미지는 최대 ${MAX_REVIEW_IMAGE_COUNT}장까지 첨부할 수 있습니다.`);
    } else {
      setSubmitError('');
    }

    const nextImages = supportedFileList.slice(0, availableCount).map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      previewUrl: URL.createObjectURL(file),
      file,
    }));
    setImagePreviews((current) => [...current, ...nextImages]);
    event.target.value = '';
  };

  const handleImageRemove = (imageId: string) => {
    setImagePreviews((current) => {
      const image = current.find((item) => item.id === imageId);
      if (image?.file) URL.revokeObjectURL(image.previewUrl);
      return current.filter((item) => item.id !== imageId);
    });
  };

  const handleSubmit = async () => {
    if (!content.trim() || rating === 0 || isSubmitting || (isEditMode && !reviewId)) return;
    setIsSubmitting(true);
    setSubmitError('');
    let submitStage: ReviewSubmitStage = 'imageUpload';

    try {
      const newImageList = imagePreviews.filter(
        (image): image is ReviewImagePreview & { file: File } => Boolean(image.file),
      );
      const uploadedImageKeyList = newImageList.length
        ? await uploadReviewImages(newImageList.map((image) => image.file))
        : [];
      let uploadedImageIndex = 0;
      const imageKeys = imagePreviews.map((image) => {
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
        router.push(`/reviews?productId=${productId}`);
      }
    } catch (error) {
      setSubmitError(getReviewSubmitErrorMessage(error, submitStage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    product,
    canEdit,
    content,
    rating,
    imagePreviews,
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
