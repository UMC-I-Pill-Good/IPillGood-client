'use client';

import { useRouter } from 'next/navigation';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { EmptyRatingStarIcon, FilledRatingStarIcon } from '@/assets';
import { TextButton } from '@/shared/components';
import { NavBar } from '@/shared/layout';
import RankingPageHeader from '../RankingPageHeader';
import { getRankingProductReviews } from '../../api/getRankingProductReviews';
import { getRankingProductDetail } from '../../api/getRankingProductDetail';
import { updateRankingReview } from '../../api/updateRankingReview';
import { uploadRankingReviewImages } from '../../api/uploadRankingReviewImages';
import type { RankingReviewItem } from '../../types/rankingReview';
import type { RankingProductDetailDto } from '../../types/ranking';
import SupplementDetailSummaryCard from '../detail/SupplementDetailSummaryCard';

interface RankingReviewEditContainerProps {
  productId: number;
  reviewId: number;
}

type ReviewImagePreview = {
  id: string;
  src: string;
  imageKey?: string;
  file?: File;
};

const MAX_IMAGE_COUNT = 3;
const SUPPORTED_IMAGE_TYPE_LIST = ['image/jpeg', 'image/png', 'image/webp'];

const RankingReviewEditContainer = ({ productId, reviewId }: RankingReviewEditContainerProps) => {
  const router = useRouter();
  const [review, setReview] = useState<RankingReviewItem | null>(null);
  const [product, setProduct] = useState<RankingProductDetailDto | null>(null);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [imagePreviews, setImagePreviews] = useState<ReviewImagePreview[]>([]);
  const imagePreviewsRef = useRef<ReviewImagePreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([
      getRankingProductReviews({ productId, size: 20 }),
      getRankingProductDetail(productId),
    ]).then(([reviewResponse, productResponse]) => {
      if (!active) return;
      const foundReview = reviewResponse.result?.reviews.find((item) => item.reviewId === reviewId) ?? null;
      setReview(foundReview);
      setContent(foundReview?.content ?? '');
      setRating(foundReview?.rating ?? 0);
      setImagePreviews(
        foundReview?.imageKeys.map((imageKey, index) => ({
          id: `existing-${index}-${imageKey}`,
          src: imageKey,
          imageKey,
        })) ?? [],
      );
      setProduct(productResponse.result);
      setIsLoading(false);
    });
    return () => {
      active = false;
    };
  }, [productId, reviewId]);

  useEffect(() => {
    imagePreviewsRef.current = imagePreviews;
  }, [imagePreviews]);

  useEffect(() => {
    return () => {
      imagePreviewsRef.current.forEach((image) => {
        if (image.file) URL.revokeObjectURL(image.src);
      });
    };
  }, []);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(event.target.files ?? []);
    if (!fileList.length) return;

    const supportedFileList = fileList.filter((file) => SUPPORTED_IMAGE_TYPE_LIST.includes(file.type));
    if (supportedFileList.length !== fileList.length) {
      setSubmitError('JPG, PNG, WEBP 형식의 이미지만 첨부할 수 있습니다.');
    } else {
      setSubmitError('');
    }

    setImagePreviews((current) => {
      const availableCount = Math.max(0, MAX_IMAGE_COUNT - current.length);
      const nextImages = supportedFileList.slice(0, availableCount).map((file) => ({
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        src: URL.createObjectURL(file),
        file,
      }));
      return [...current, ...nextImages];
    });
    event.target.value = '';
  };

  const handleImageRemove = (imageId: string) => {
    setImagePreviews((current) => {
      const image = current.find((item) => item.id === imageId);
      if (image?.file) URL.revokeObjectURL(image.src);
      return current.filter((item) => item.id !== imageId);
    });
  };

  const handleSubmit = async () => {
    if (!review || !content.trim() || rating === 0 || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const newImageList = imagePreviews.filter(
        (image): image is ReviewImagePreview & { file: File } => Boolean(image.file),
      );
      const uploadedImageKeyList = newImageList.length
        ? await uploadRankingReviewImages(
            newImageList.map((image) => image.file),
            newImageList.map((image) => imagePreviews.indexOf(image)),
          )
        : [];
      let uploadedImageIndex = 0;
      const imageKeyList = imagePreviews.map((image) => {
        if (image.imageKey) return image.imageKey;

        const imageKey = uploadedImageKeyList[uploadedImageIndex];
        uploadedImageIndex += 1;
        return imageKey;
      });

      await updateRankingReview(reviewId, {
        rating,
        content: content.trim(),
        imageKeys: imageKeyList,
      });
      router.back();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '후기를 수정할 수 없습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <main className='min-h-dvh bg-background'><RankingPageHeader title='후기 작성하기' /><p className='p-5 typo-body-10 text-neutral-800'>후기 정보를 불러오는 중입니다.</p></main>;
  }

  if (!review || !review.mine) {
    return <main className='min-h-dvh bg-background'><RankingPageHeader title='후기 작성하기' /><p className='p-5 typo-body-10 text-neutral-800'>수정할 후기를 찾을 수 없습니다.</p></main>;
  }

  return (
    <main className='min-h-dvh bg-background pb-24'>
      <RankingPageHeader title='후기 작성하기' />
      {product && (
        <section className='px-5 pb-2 pt-4'>
          <SupplementDetailSummaryCard product={product} />
        </section>
      )}
      <section className='flex flex-col gap-5 px-5 py-5'>
        <div className='flex flex-col gap-1'>
          <h2 className='typo-body-1 text-black'>만족도</h2>
          <div className='flex items-center gap-1'>
            {Array.from({ length: 5 }, (_, index) => (
              <button
                key={index}
                type='button'
                aria-label={`${index + 1}점`}
                className='flex size-7.5 items-center justify-center'
                onClick={() => setRating(index + 1)}
              >
                {index < rating ? (
                  <FilledRatingStarIcon className='size-5 scale-150 text-secondary-600' aria-hidden='true' />
                ) : (
                  <EmptyRatingStarIcon className='size-5 scale-150 text-neutral-400' aria-hidden='true' />
                )}
              </button>
            ))}
          </div>
          <p className='typo-caption-7 text-neutral-800'>별점을 선택해 주세요</p>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='review-content' className='typo-body-1 text-black'>후기 내용</label>
          <div className='relative h-38.5'>
            <textarea
              id='review-content'
              value={content}
              maxLength={300}
              onChange={(event) => setContent(event.target.value)}
              className='size-full resize-none rounded-lg border border-white bg-white/60 px-2 py-2 pb-7 typo-caption-2 text-black shadow-[0_4px_4px_rgba(126,131,135,0.1)] outline-none'
            />
            <p className='pointer-events-none absolute bottom-2 right-2 typo-caption-7 text-neutral-800'>
              {content.length}/300
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-1'>
            <h2 className='typo-body-1 text-black'>사진 첨부하기</h2>
            <span className='typo-body-11 text-neutral-800'>(선택)</span>
          </div>
          <div className='flex gap-2'>
            {imagePreviews.length < MAX_IMAGE_COUNT && (
              <label className='flex size-25 cursor-pointer items-center justify-center rounded-lg border border-neutral-400 text-4xl font-light text-neutral-500'>
                +
                <input type='file' accept='image/*' multiple className='sr-only' onChange={handleImageChange} />
              </label>
            )}
            {imagePreviews.map((image) => (
              <button
                key={image.id}
                type='button'
                aria-label='첨부 이미지 삭제'
                className='relative flex size-25 items-center justify-center overflow-hidden rounded-lg bg-neutral-300 typo-body-2 text-neutral-800'
                onClick={() => handleImageRemove(image.id)}
              >
                {image.src.startsWith('blob:') || image.src.startsWith('http') || image.src.startsWith('/') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image.src} alt='후기 첨부 이미지' className='size-full object-cover' />
                ) : '사진'}
              </button>
            ))}
          </div>
          <p className='typo-caption-7 text-neutral-800'>최대 3개 첨부 가능</p>
        </div>
        {submitError && <p role='alert' className='typo-caption-7 text-red-600'>{submitError}</p>}
        <TextButton type='button' text={isSubmitting ? '수정 중...' : '수정 완료'} size='xl' className='mt-2 h-13 w-full' disabled={isSubmitting || !content.trim() || rating === 0} onClick={handleSubmit} />
      </section>
      <NavBar />
    </main>
  );
};

export default RankingReviewEditContainer;
