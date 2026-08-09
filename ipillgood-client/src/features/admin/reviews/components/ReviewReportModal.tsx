'use client';

import { useState, type FormEvent } from 'react';
import { isAxiosError } from 'axios';

import { FaqModalCloseIcon } from '@/assets';
import { FetchError, ModalShell, TextButton } from '@/shared/components';
import { showToast } from '@/shared/utils/toast';

import { REVIEW_REPORT_STATUS_LABEL_MAP } from '../constants/ReviewReport';
import { useAdminReviewReportDetailQuery } from '../hooks/useAdminReviewReportDetailQuery';
import { useAdminReviewReportMutation } from '../hooks/useAdminReviewReportMutation';
import type {
  ProcessableReviewStatusType,
  ReportedReviewStatusType,
  ReviewReportDetailResultType,
} from '../types/ReviewReport';

const REVIEW_STATUS_LIST: readonly ReportedReviewStatusType[] = [
  'PENDING',
  'DELETED',
  'MAINTAINED',
  'HIDDEN',
];

interface ReviewReportModalProps {
  reportId: number;
  onClose: () => void;
}

interface ReviewReportModalFormProps {
  review: ReviewReportDetailResultType;
  onClose: () => void;
  onSubmit: (status: ProcessableReviewStatusType, reason: string) => Promise<void>;
  isSubmitting: boolean;
}

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data.message ?? fallbackMessage;
  }

  return error instanceof Error ? error.message : fallbackMessage;
};

const formatWrittenAt = (writtenAt: string) => {
  const [date, time = ''] = writtenAt.split('T');

  return `${date} / ${time.slice(0, 5)}`;
};

const ReviewReportModalForm = ({
  review,
  onClose,
  onSubmit,
  isSubmitting,
}: ReviewReportModalFormProps) => {
  const [selectedStatus, setSelectedStatus] = useState<ReportedReviewStatusType>(
    review.status.type,
  );
  const [processingReason, setProcessingReason] = useState(review.processReason ?? '');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedStatus === 'PENDING') {
      showToast.error('처리할 상태를 선택해 주세요.');
      return;
    }

    const trimmedReason = processingReason.trim();

    try {
      await onSubmit(selectedStatus, trimmedReason);
    } catch {
      // API 오류 시 선택 상태와 처리 사유를 유지합니다.
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex w-full flex-col gap-4'>
      <section className='flex flex-col gap-2.5' aria-labelledby='review-report-title'>
        <div className='flex w-[338px] flex-col gap-1'>
          <h2
            id='review-report-title'
            className='px-3 text-2xl font-semibold leading-none text-black'
          >
            후기 신고 상세
          </h2>
          <dl className='grid grid-cols-[131px_1fr] items-center text-xl font-medium leading-none text-black'>
            <dt className='px-3 py-2'>신고 번호</dt>
            <dd className='px-3 py-2'>{review.reportId}</dd>
            <dt className='px-3 py-2'>신고 사유</dt>
            <dd className='px-3 py-2'>
              <span className='inline-flex rounded-lg bg-secondary px-4 py-1 text-sm leading-none text-white'>
                {review.reason.label}
              </span>
            </dd>
            <dt className='px-3 py-2'>작성자(ID)</dt>
            <dd className='px-3 py-2 whitespace-nowrap'>
              {review.writer.nickname} ({review.writer.username})
            </dd>
            <dt className='px-3 py-2'>작성일</dt>
            <dd className='px-3 py-2 whitespace-nowrap'>{formatWrittenAt(review.writtenAt)}</dd>
          </dl>
        </div>

        <div className='grid grid-cols-[131px_1fr] items-start px-3 py-2 text-xl font-medium leading-none text-black'>
          <span>후기 내용</span>
          <div className='h-[142px] overflow-y-auto whitespace-pre-wrap break-words rounded-[20px] border border-neutral p-2.5 leading-normal text-neutral'>
            {review.content}
          </div>
        </div>
      </section>

      <fieldset className='grid grid-cols-[141px_1fr] items-center text-xl font-medium leading-none text-black'>
        <legend className='sr-only'>처리 상태</legend>
        <span className='px-3 py-2'>처리 상태</span>
        <div className='flex items-center justify-between'>
          {REVIEW_STATUS_LIST.map((status) => (
            <label key={status} className='flex cursor-pointer items-center gap-2'>
              <input
                type='radio'
                name='review-processing-status'
                value={status}
                checked={selectedStatus === status}
                onChange={() => setSelectedStatus(status)}
                disabled={status === 'PENDING'}
                className='size-5 shrink-0 appearance-none rounded-sm border border-neutral checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              />
              <span className='py-2'>{REVIEW_REPORT_STATUS_LABEL_MAP[status]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className='grid grid-cols-[131px_1fr] items-start px-3 py-2 text-xl font-medium leading-none text-black'>
        <span className='leading-normal'>
          처리 사유
          <br />
          (선택)
        </span>
        <textarea
          value={processingReason}
          onChange={(event) => setProcessingReason(event.target.value)}
          maxLength={200}
          disabled={isSubmitting}
          placeholder='처리 사유를 입력하세요 (선택)'
          className='h-[142px] resize-none rounded-[20px] border border-neutral p-2.5 text-xl font-medium leading-normal text-black outline-none placeholder:text-neutral focus-visible:border-primary'
        />
      </label>

      <div className='flex h-10 items-center justify-end gap-2.5'>
        <TextButton
          text='취소'
          variant='outline'
          size='sm'
          onClick={onClose}
          disabled={isSubmitting}
          className='w-32 border-secondary text-secondary shadow-none'
        />
        <TextButton
          type='submit'
          text='저장'
          variant='primary'
          size='sm'
          disabled={isSubmitting}
          className='w-32 shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
        />
      </div>
    </form>
  );
};

const ReviewReportModal = ({ reportId, onClose }: ReviewReportModalProps) => {
  const detailQuery = useAdminReviewReportDetailQuery(reportId);
  const processMutation = useAdminReviewReportMutation();

  const handleClose = () => {
    if (!processMutation.isPending) {
      onClose();
    }
  };

  const handleSubmit = async (status: ProcessableReviewStatusType, processingReason: string) => {
    try {
      const response = await processMutation.mutateAsync({
        reportId,
        body: {
          status,
          processReason: processingReason || undefined,
        },
      });
      showToast.success(response.message || '후기 신고 처리가 저장되었습니다.');
      onClose();
    } catch (error) {
      showToast.error(getErrorMessage(error, '후기 신고 처리를 저장하지 못했습니다.'));
      throw error;
    }
  };

  return (
    <ModalShell
      ariaLabel='후기 신고 상세'
      onClose={handleClose}
      className='max-h-[calc(100dvh-40px)] w-[871px]! max-w-[calc(100vw-40px)] gap-4! overflow-y-auto rounded-[20px]! px-10! py-8! shadow-[4px_4px_20px_rgba(126,131,135,0.2)]'
    >
      <button
        type='button'
        aria-label='후기 신고 상세 모달 닫기'
        onClick={handleClose}
        disabled={processMutation.isPending}
        className='self-end'
      >
        <FaqModalCloseIcon aria-hidden='true' className='size-[30px]' />
      </button>

      {detailQuery.isPending && (
        <p className='py-24 text-center text-xl text-neutral'>신고 상세를 불러오는 중입니다.</p>
      )}
      {detailQuery.isError && (
        <FetchError
          description='신고 상세를 불러오지 못했습니다.'
          onRetry={() => void detailQuery.refetch()}
          className='min-h-0 py-24'
        />
      )}
      {detailQuery.data?.result && (
        <ReviewReportModalForm
          review={detailQuery.data.result}
          onClose={handleClose}
          onSubmit={handleSubmit}
          isSubmitting={processMutation.isPending}
        />
      )}
    </ModalShell>
  );
};

export default ReviewReportModal;
