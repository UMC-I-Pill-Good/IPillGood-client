'use client';

import { Header, NavBar } from '@/shared/layout';
import SupplementDetailSummaryCard from '@/features/ranking/components/detail/SupplementDetailSummaryCard';
import { useReviewForm } from '../hooks/useReviewForm';
import type { ReviewFormMode } from '../types/reviewForm';
import ReviewFormFields from './ReviewFormFields';

interface ReviewFormProps {
  mode: ReviewFormMode;
  productId: number;
  reviewId?: number;
}

const ReviewForm = ({ mode, productId, reviewId }: ReviewFormProps) => {
  const isEditMode = mode === 'edit';
  const title = isEditMode ? '후기 수정하기' : '후기 작성하기';
  const submitButtonText = isEditMode ? '수정 완료' : '작성 완료';
  const {
    product,
    canEdit,
    content,
    rating,
    imagePreviews,
    isLoading,
    isSubmitting,
    submitError,
    setContent,
    setRating,
    handleImageChange,
    handleImageRemove,
    handleSubmit,
  } = useReviewForm({ mode, productId, reviewId });

  if (isLoading) {
    return (
      <main className='min-h-dvh bg-background'>
        <Header title={title} />
        <p className='p-5 typo-body-10 text-neutral-800'>후기 정보를 불러오는 중입니다.</p>
      </main>
    );
  }

  if (!canEdit) {
    return (
      <main className='min-h-dvh bg-background'>
        <Header title={title} />
        <p role={submitError ? 'alert' : undefined} className='p-5 typo-body-10 text-neutral-800'>
          {submitError || '수정할 후기를 찾을 수 없습니다.'}
        </p>
      </main>
    );
  }

  return (
    <main className='min-h-dvh bg-background pb-24'>
      <Header title={title} />
      {product && (
        <section className='px-5 pb-2 pt-4'>
          <SupplementDetailSummaryCard product={product} showReviewButton />
        </section>
      )}
      <ReviewFormFields
        content={content}
        rating={rating}
        imagePreviews={imagePreviews}
        submitError={submitError}
        isSubmitting={isSubmitting}
        submitButtonText={submitButtonText}
        onContentChange={setContent}
        onRatingChange={setRating}
        onImageChange={handleImageChange}
        onImageRemove={handleImageRemove}
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default ReviewForm;
