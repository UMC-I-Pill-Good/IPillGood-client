'use client';

import { useRouter } from 'next/navigation';
import { useReviewActions } from '../hooks/useReviewActions';
import type { RankingReviewItem } from '../types/review';
import ReviewDeleteModal from './modal/ReviewDeleteModal';
import ReviewReportModal from './modal/ReviewReportModal';
import ReviewCardContent from './ReviewCardContent';

interface ReviewCardProps {
  review: RankingReviewItem;
  productId: number;
  onDelete: () => void;
}

const ReviewCard = ({ review, productId, onDelete }: ReviewCardProps) => {
  const router = useRouter();
  const reviewActions = useReviewActions({ review, onDeleteSuccess: onDelete });

  return (
    <>
      <ReviewCardContent
        review={review}
        onEdit={() =>
          router.push(`/reviews/reviews-edit?productId=${productId}&reviewId=${review.reviewId}`)
        }
        onDelete={reviewActions.openDeleteModal}
        onReport={reviewActions.openReportModal}
        isHelpful={reviewActions.isHelpful}
        helpfulCount={reviewActions.helpfulCount}
        isHelpfulUpdating={reviewActions.isHelpfulUpdating}
        onHelpfulToggle={reviewActions.handleHelpfulToggle}
      />

      {reviewActions.actionError && (
        <p role='alert' className='px-3 typo-caption-6 text-semantic-600'>
          {reviewActions.actionError}
        </p>
      )}

      {reviewActions.isDeleteModalOpen && (
        <ReviewDeleteModal
          onCancel={reviewActions.closeDeleteModal}
          onConfirm={reviewActions.handleDeleteConfirm}
          isSubmitting={reviewActions.isDeleting}
        />
      )}
      {reviewActions.isReportModalOpen && (
        <ReviewReportModal
          onCancel={reviewActions.closeReportModal}
          onSubmit={reviewActions.handleReportSubmit}
          isSubmitting={reviewActions.isReporting}
        />
      )}
    </>
  );
};

export default ReviewCard;
