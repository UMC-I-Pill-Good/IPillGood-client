import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { TOAST_MESSAGES } from '@/shared/constants/toastMessages';
import { showToast } from '@/shared/utils';
import { createReviewReport } from '../api/createReviewReport';
import { deleteReview } from '../api/deleteReview';
import { updateReviewHelpful } from '../api/updateReviewHelpful';
import type { RankingReviewItem, ReviewReportReason } from '../types/review';
import { getReviewErrorMessage } from '../utils/reviewError';
import { invalidateReviewQueries } from '../utils/invalidateReviewQueries';

type UseReviewActionsParams = {
  review: RankingReviewItem;
  productId: number;
};

export const useReviewActions = ({ review, productId }: UseReviewActionsParams) => {
  const queryClient = useQueryClient();
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
      setActionError(getReviewErrorMessage(error, '도움됐어요 상태를 변경할 수 없습니다.'));
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
      await invalidateReviewQueries(queryClient, productId);
      setIsDeleteModalOpen(false);
      showToast.success(TOAST_MESSAGES.REVIEW_DELETED);
    } catch {
      setIsDeleteModalOpen(false);
      showToast.error(TOAST_MESSAGES.REVIEW_DELETE_FAILED);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReportSubmit = async (reason: ReviewReportReason, detail: string) => {
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
      showToast.success(TOAST_MESSAGES.REPORT_SUBMITTED);
    } catch {
      setIsReportModalOpen(false);
      showToast.error(TOAST_MESSAGES.REPORT_SUBMIT_FAILED);
    } finally {
      setIsReporting(false);
    }
  };

  return {
    actionError,
    helpfulCount,
    isDeleteModalOpen,
    isDeleting,
    isHelpful,
    isHelpfulUpdating,
    isReportModalOpen,
    isReporting,
    handleDeleteConfirm,
    handleHelpfulToggle,
    handleReportSubmit,
    openDeleteModal: () => setIsDeleteModalOpen(true),
    openReportModal: () => setIsReportModalOpen(true),
    closeDeleteModal: () => setIsDeleteModalOpen(false),
    closeReportModal: () => setIsReportModalOpen(false),
  };
};
