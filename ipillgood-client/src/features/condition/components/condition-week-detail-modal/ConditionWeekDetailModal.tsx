'use client';

import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ConditionIntakeIcon, ConditionSleepIcon, ConditionVitalityIcon } from '@/assets';
import { IconButton } from '@/shared/components';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { X } from 'lucide-react';
import { getConditionWeekDetail } from '../../api/getConditionWeekDetail';
import { type ConditionWeekDetailResult } from '../../types/condition';
import { conditionQueryKeys } from '../../constants/conditionQueryKeys';
import { useConditionErrorToast } from '../../hooks/useConditionErrorToast';
import ConditionMetric from './ConditionMetric';

interface ConditionWeekDetailModalProps {
  month: number;
  weekLabel: string;
  recordId: number;
  onClose: () => void;
}

const ConditionWeekDetailModal = ({
  month,
  weekLabel,
  recordId,
  onClose,
}: ConditionWeekDetailModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollLock();
  useEscapeKey(onClose);
  useOutsideClick(contentRef, onClose);

  const {
    data: detailData,
    isLoading,
    isFetching,
    error,
    isError,
  } = useQuery<ConditionWeekDetailResult>({
    queryKey: conditionQueryKeys.weekDetail(recordId),
    queryFn: async () => {
      const response = await getConditionWeekDetail(recordId);
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '주차 상세 조회에 실패했습니다.');
      }
      return response.result;
    },
    staleTime: 5 * 60_000,
  });

  useConditionErrorToast(
    error,
    isError,
    '주차별 컨디션 정보를 불러오지 못했습니다.',
  );

  const displayVitality = isLoading ? '-' : (detailData?.vitalityScore ?? '-');
  const displaySleepHours = isLoading
    ? '-'
    : detailData
      ? Number((detailData.sleepHours + detailData.sleepMinutes / 60).toFixed(1))
      : '-';
  const displayIntakeDays = isLoading ? '-' : (detailData?.intakeDaysCount ?? '-');

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/30'
      role='dialog'
      aria-modal='true'
      aria-labelledby='condition-week-detail-title'
      aria-busy={isLoading || isFetching}
    >
      <div
        ref={contentRef}
        className='flex min-h-[153px] w-[264px] flex-col gap-4 rounded-[20px] bg-white px-5 py-4 shadow-[4px_4px_40px_0_rgba(126,131,135,0.2)]'
      >
        <div className='flex h-9 w-full shrink-0 items-center justify-between'>
          <h3 id='condition-week-detail-title' className='typo-body-5 whitespace-nowrap text-black'>
            {month}월 {weekLabel} 컨디션
          </h3>

          <IconButton
            icon={<X size={24} className='text-neutral-800' />}
            ariaLabel='컨디션 상세 모달 닫기'
            onClick={onClose}
          />
        </div>

        <div className='flex h-[69px] w-full shrink-0 items-start justify-between'>
          <ConditionMetric
            label='활력'
            icon={<ConditionVitalityIcon className='block h-[19.31px] w-4 shrink-0' />}
            value={
              <>
                {isLoading ? (
                  <span className='h-3 w-5 rounded-full bg-neutral-200 motion-safe:animate-pulse' />
                ) : (
                  displayVitality
                )}
                <span className='mx-1 text-[10px] font-medium leading-[150%] tracking-[-0.011em] text-neutral-500'>
                  /
                </span>
                <span className='typo-caption-7 text-neutral-600'>5</span>
              </>
            }
          />

          <ConditionMetric
            label='수면'
            icon={<ConditionSleepIcon className='block h-5 w-[12.93px] shrink-0' />}
            value={
              <>
                {isLoading ? (
                  <span className='h-3 w-5 rounded-full bg-neutral-200 motion-safe:animate-pulse' />
                ) : (
                  displaySleepHours
                )}
                <span className='ml-1 font-[var(--font-dm-sans)] typo-caption-7 text-neutral-600'>
                  h
                </span>
              </>
            }
          />

          <ConditionMetric
            label='섭취 기록'
            icon={<ConditionIntakeIcon className='block h-5 w-[18px] shrink-0' />}
            value={
              <>
                {isLoading ? (
                  <span className='h-3 w-5 rounded-full bg-neutral-200 motion-safe:animate-pulse' />
                ) : (
                  displayIntakeDays
                )}
                <span className='mx-1 text-[10px] font-medium leading-[150%] tracking-[-0.011em] text-neutral-500'>
                  / 7
                </span>
                <span className='typo-caption-7 text-neutral-600'>일</span>
              </>
            }
          />
        </div>

      </div>
    </div>
  );
};

export default ConditionWeekDetailModal;
