'use client';

import { Header } from '@/shared/layout';
import { FetchError, LoadingSpinner } from '@/shared/components';
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
    loadError,
    isSubmitting,
    submitError,
    setContent,
    setRating,
    handleImageChange,
    handleImageRemove,
    handleRetryLoad,
    handleSubmit,
  } = useReviewForm({ mode, productId, reviewId });

  if (isLoading) {
    return (
      <main className='min-h-dvh bg-background'>
        <Header title={title} />
        <LoadingSpinner />
      </main>
    );
  }

  if (loadError) {
    return (
      <main className='min-h-dvh bg-background'>
        <Header title={title} />
        <FetchError description={loadError} onRetry={handleRetryLoad} />
      </main>
    );
  }

  if (!canEdit) {
    return (
      <main className='min-h-dvh bg-background'>
        <Header title={title} />
        <FetchError
          title='후기를 수정할 수 없어요'
          description='수정할 후기를 찾을 수 없거나 수정 권한이 없습니다.'
        />
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
