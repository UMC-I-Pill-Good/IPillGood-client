'use client';

import { useState, useEffect, useRef } from 'react';
import { ConditionIntakeIcon, ConditionSleepIcon, ConditionVitalityIcon } from '@/assets';
import { IconButton } from '@/shared/components';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { X } from 'lucide-react';
import { getConditionWeekDetail } from '../../api/getConditionWeekDetail';
import { type ConditionWeekDetailResult } from '../../types/condition';

interface ConditionWeekDetailModalProps {
  month: number;
  weekLabel: string;
  recordId: number;
  weekStartDate?: string;
  vitality: number;
  sleepHours: number;
  intakeDays: number;
  totalDays: number;
  onClose: () => void;
}

const ConditionWeekDetailModal = ({
  month,
  weekLabel,
  recordId,
  vitality,
  sleepHours,
  intakeDays,
  totalDays,
  onClose,
}: ConditionWeekDetailModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollLock();
  useEscapeKey(onClose);
  useOutsideClick(contentRef, onClose);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [detailData, setDetailData] = useState<ConditionWeekDetailResult | null>(null);

  // GET /api/v1/conditions/weekly-records/{recordId} 특정 주차 상세 API 연동
  useEffect(() => {
    let isMounted = true;
    if (recordId === undefined) return;

    getConditionWeekDetail(recordId)
      .then((res) => {
        if (isMounted && res.isSuccess && res.result) {
          setDetailData(res.result);
        }
      })
      .catch((err) => {
        console.error('특정 주차 컨디션 상세 조회 중 오류:', err);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [recordId]);

  const formatScore = (val: number | null | undefined): string => {
    if (val === undefined || val === null) return '-';
    return Number(val).toFixed(1);
  };

  const displayVitality = isLoading
    ? formatScore(vitality)
    : detailData?.conditionScore !== undefined
      ? formatScore(detailData.conditionScore)
      : formatScore(vitality);

  const displaySleepHours = isLoading
    ? sleepHours
    : detailData?.sleepHours !== undefined
      ? detailData.sleepHours ?? '-'
      : sleepHours;

  const displayIntakeDays = isLoading
    ? intakeDays
    : detailData?.intakeDaysCount ?? intakeDays;

  const displayTotalDays = isLoading
    ? totalDays
    : 7; // 주간 섭취 기록 일수 분모는 7일 기준이므로 7로 고정

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/30'
      role='dialog'
      aria-modal='true'
    >
      <div
        ref={contentRef}
        className='flex h-[153px] w-[264px] flex-col gap-4 rounded-[20px] bg-white px-5 py-4 shadow-[4px_4px_40px_0_rgba(126,131,135,0.2)]'
      >
        <div className='flex h-9 w-full shrink-0 items-center justify-between'>
          <h3 className='typo-body-5 whitespace-nowrap text-[#111111]'>
            {month}월 {weekLabel} 컨디션
          </h3>

          <IconButton
            icon={<X size={24} className='text-neutral-800' />}
            ariaLabel='컨디션 상세 모달 닫기'
            onClick={onClose}
          />
        </div>

        <div className='flex h-[69px] w-full shrink-0 items-start justify-between'>
          {/* 활력 메트릭 */}
          <div className='flex h-[69px] w-[55px] shrink-0 flex-col items-center gap-1'>
            <div className='flex h-[45px] w-[55px] flex-col items-center gap-1'>
              <p className='typo-caption-2 flex h-[17px] w-full items-center justify-center whitespace-nowrap text-center text-[#111111]'>
                활력
              </p>
              <div className='flex size-6 shrink-0 items-center justify-center'>
                <ConditionVitalityIcon className='block h-[19.31px] w-4 shrink-0' />
              </div>
            </div>
            <div className='flex h-5 w-full items-baseline justify-center whitespace-nowrap text-center text-[#6580EE] typo-caption-2'>
              {displayVitality}
              <span className='mx-1 text-[10px] font-medium leading-[150%] tracking-[-0.011em] text-neutral-500'>
                /
              </span>
              <span className='typo-caption-7 text-neutral-600'>5</span>
            </div>
          </div>

          {/* 수면 메트릭 */}
          <div className='flex h-[69px] w-[55px] shrink-0 flex-col items-center gap-1'>
            <div className='flex h-[45px] w-[55px] flex-col items-center gap-1'>
              <p className='typo-caption-2 flex h-[17px] w-full items-center justify-center whitespace-nowrap text-center text-[#111111]'>
                수면
              </p>
              <div className='flex size-6 shrink-0 items-center justify-center'>
                <ConditionSleepIcon className='block h-5 w-[12.93px] shrink-0' />
              </div>
            </div>
            <div className='flex h-5 w-full items-baseline justify-center whitespace-nowrap text-center text-[#6580EE] typo-caption-2'>
              {displaySleepHours}
              <span className='ml-1 font-[var(--font-dm-sans)] typo-caption-7 text-neutral-600'>
                h
              </span>
            </div>
          </div>

          {/* 섭취 기록 메트릭 */}
          <div className='flex h-[69px] w-[55px] shrink-0 flex-col items-center gap-1'>
            <div className='flex h-[45px] w-[55px] flex-col items-center gap-1'>
              <p className='typo-caption-2 flex h-[17px] w-full items-center justify-center whitespace-nowrap text-center text-[#111111]'>
                섭취 기록
              </p>
              <div className='flex size-6 shrink-0 items-center justify-center'>
                <ConditionIntakeIcon className='block h-5 w-[18px] shrink-0' />
              </div>
            </div>
            <div className='flex h-5 w-full items-baseline justify-center whitespace-nowrap text-center text-[#6580EE] typo-caption-2'>
              {displayIntakeDays}
              <span className='mx-1 text-[10px] font-medium leading-[150%] tracking-[-0.011em] text-neutral-500'>
                / {displayTotalDays}
              </span>
              <span className='typo-caption-7 text-neutral-600'>
                일
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionWeekDetailModal;