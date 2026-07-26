'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEscapeKey, useOutsideClick } from '@/shared/hooks';
import type { RankingReviewItem } from '../types/review';
import ReviewCardContent from './ReviewCardContent';
import { ReviewDeleteModal, ReviewReportModal } from './ReviewModals';

interface ReviewCardProps {
  review: RankingReviewItem;
  productId: number;
  onDelete: (reviewId: number) => void;
}

const ReviewCard = ({ review, productId, onDelete }: ReviewCardProps) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = `review-menu-${review.reviewId}`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [helpfulState, setHelpfulState] = useState({
    isHelpful: review.helpedByMe,
    count: review.helpfulCount,
  });

  useEscapeKey(() => {
    if (!isDeleteModalOpen && !isReportModalOpen) setIsMenuOpen(false);
  });
  useOutsideClick(menuRef, () => setIsMenuOpen(false));

  return (
    <>
      <ReviewCardContent
        review={review}
        menuRef={menuRef}
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        isHelpful={helpfulState.isHelpful}
        helpfulCount={helpfulState.count}
        onHelpfulToggle={() => {
          if (review.mine) return;
          setHelpfulState((current) => ({
            isHelpful: !current.isHelpful,
            count: current.count + (current.isHelpful ? -1 : 1),
          }));
        }}
        onMenuToggle={() => setIsMenuOpen((open) => !open)}
        onMenuClose={() => setIsMenuOpen(false)}
        onEdit={() =>
          router.push(`/reviews/reviews-edit?productId=${productId}&reviewId=${review.reviewId}`)
        }
        onDelete={() => {
          setIsMenuOpen(false);
          setIsDeleteModalOpen(true);
        }}
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
