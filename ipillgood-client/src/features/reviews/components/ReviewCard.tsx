'use client';

import { useState } from 'react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { createReviewReport } from '../api/createReviewReport';
import { deleteReview } from '../api/deleteReview';
import { updateReviewHelpful } from '../api/updateReviewHelpful';
import type { RankingReviewItem } from '../types/review';
import ReviewDeleteModal from './modal/ReviewDeleteModal';
import ReviewReportModal from './modal/ReviewReportModal';
import ReviewCardContent from './ReviewCardContent';

interface ReviewCardProps {
  review: RankingReviewItem;
  productId: number;
  onDelete: () => void;
}

const getReviewActionErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data.message || fallbackMessage;
  }

  return error instanceof Error ? error.message : fallbackMessage;
};

const ReviewCard = ({ review, productId, onDelete }: ReviewCardProps) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isHelpful, setIsHelpful] = useState(review.helpedByMe);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [isHelpfulUpdating, setIsHelpfulUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [actionError, setActionError] = useState('');

  const handleHelpfulToggle = async () => {
    if (review.mine || isHelpfulUpdating) return;
    setIsHelpfulUpdating(true);
    setActionError('');

    try {
      const response = await updateReviewHelpful(review.reviewId, isHelpful);
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message);
      }
      setIsHelpful(response.result.helpful);
      setHelpfulCount(response.result.helpfulCount);
    } catch (error) {
      setActionError(getReviewActionErrorMessage(error, '도움됐어요 상태를 변경할 수 없습니다.'));
    } finally {
      setIsHelpfulUpdating(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setActionError('');

    try {
      const response = await deleteReview(review.reviewId);
      if (!response.isSuccess || !response.result?.deleted) {
        throw new Error(response.message);
      }
      setIsDeleteModalOpen(false);
      onDelete();
    } catch (error) {
      setIsDeleteModalOpen(false);
      setActionError(getReviewActionErrorMessage(error, '후기를 삭제할 수 없습니다.'));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReportSubmit = async (
    reason: Parameters<typeof createReviewReport>[1]['reason'],
    detail: string,
  ) => {
    if (isReporting) return;
    setIsReporting(true);
    setActionError('');

    try {
      const response = await createReviewReport(review.reviewId, {
        reason,
        detail: detail.trim() || null,
      });
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message);
      }
      setIsReportModalOpen(false);
    } catch (error) {
      setIsReportModalOpen(false);
      setActionError(getReviewActionErrorMessage(error, '후기를 신고할 수 없습니다.'));
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <>
      <ReviewCardContent
        review={review}
        onEdit={() =>
          router.push(`/reviews/reviews-edit?productId=${productId}&reviewId=${review.reviewId}`)
        }
        onDelete={() => setIsDeleteModalOpen(true)}
        onReport={() => setIsReportModalOpen(true)}
        isHelpful={isHelpful}
        helpfulCount={helpfulCount}
        isHelpfulUpdating={isHelpfulUpdating}
        onHelpfulToggle={handleHelpfulToggle}
      />

      {actionError && (
        <p role='alert' className='px-3 typo-caption-6 text-semantic-600'>
          {actionError}
        </p>
      )}

      {isDeleteModalOpen && (
        <ReviewDeleteModal
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          isSubmitting={isDeleting}
        />
      )}
      {isReportModalOpen && (
        <ReviewReportModal
          onCancel={() => setIsReportModalOpen(false)}
          onSubmit={handleReportSubmit}
          isSubmitting={isReporting}
        />
      )}
    </>
  );
};

export default ReviewCard;
