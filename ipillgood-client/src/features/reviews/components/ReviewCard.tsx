'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReviewDeleteModal, ReviewReportModal } from '@/shared/components';
import type { RankingReviewItem } from '../types/review';
import ReviewCardContent from './ReviewCardContent';

interface ReviewCardProps {
  review: RankingReviewItem;
  productId: number;
  onDelete: (reviewId: number) => void;
}

const ReviewCard = ({ review, productId, onDelete }: ReviewCardProps) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <>
      <ReviewCardContent
        review={review}
        onEdit={() =>
          router.push(`/reviews/reviews-edit?productId=${productId}&reviewId=${review.reviewId}`)
        }
        onDelete={() => setIsDeleteModalOpen(true)}
        onReport={() => setIsReportModalOpen(true)}
      />

      {isDeleteModalOpen && (
        <ReviewDeleteModal
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            setIsDeleteModalOpen(false);
            onDelete(review.reviewId);
          }}
        />
      )}
      {isReportModalOpen && (
        <ReviewReportModal
          onCancel={() => setIsReportModalOpen(false)}
          onSubmit={() => setIsReportModalOpen(false)}
        />
      )}
    </>
  );
};

export default ReviewCard;
