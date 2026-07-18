'use client';

import { useState, useEffect, type MouseEvent } from 'react';
import { ConditionIntakeIcon, ConditionSleepIcon, ConditionVitalityIcon } from '@/assets';
import { IconButton } from '@/shared/components';
import { useEscapeKey, useScrollLock } from '@/shared/hooks';
import { X } from 'lucide-react';
import { getConditionWeekDetail } from '../../api/getConditionWeekDetail';
import { type ConditionWeekDetailResult } from '../../types/condition';

interface ConditionWeekDetailModalProps {
  month: number;
  weekLabel: string;
  weekStartDate: string;
  vitality: number;
  sleepHours: number;
  intakeDays: number;
  totalDays: number;
  onClose: () => void;
}

const ConditionWeekDetailModal = ({
  month,
  weekLabel,
  weekStartDate,
  vitality,
  sleepHours,
  intakeDays,
  totalDays,
  onClose,
}: ConditionWeekDetailModalProps) => {
  useScrollLock();
  useEscapeKey(onClose);

  const [detailData, setDetailData] = useState<ConditionWeekDetailResult>({
    weekStartDate,
    weekEndDate: '',
    conditionScore: vitality,
    avgSleepHours: sleepHours,
    intakeCompletedDays: intakeDays,
    intakeTotalDays: totalDays,
  });

  // GET /conditions/{weekStartDate} 특정 주차 상세 API 연동
  useEffect(() => {
    if (!weekStartDate) return;

    getConditionWeekDetail(weekStartDate)
      .then((res) => {
        if (res.isSuccess && res.result) {
          setDetailData(res.result);
        }
      })
      .catch((err) => {
        console.error('특정 주차 컨디션 상세 조회 중 오류:', err);
      });
  }, [weekStartDate]);

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const displayVitality = detailData.conditionScore ?? vitality;
  const displaySleepHours = detailData.avgSleepHours ?? sleepHours;
  const displayIntakeDays = detailData.intakeCompletedDays ?? intakeDays;
  const displayTotalDays = detailData.intakeTotalDays ?? totalDays;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/30'
      onClick={handleBackdropClick}
      role='presentation'
    >
      <div
        role='dialog'
        aria-modal='true'
        className='flex h-[153px] w-[264px] flex-col gap-4 rounded-[20px] bg-white px-5 py-4 shadow-[4px_4px_40px_0_rgba(126,131,135,0.2)]'
        onClick={handleModalClick}
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
            <div className='flex h-5 w-full items-center justify-center whitespace-nowrap text-center text-neutral-800 typo-caption-2'>
              {displayVitality}
              <span className='mx-1 text-[13px] font-medium leading-[150%] tracking-[-0.011em] text-neutral-500'>
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
            <div className='flex h-5 w-full items-center justify-center whitespace-nowrap text-center text-neutral-800 typo-caption-2'>
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
            <div className='flex h-5 w-full items-center justify-center whitespace-nowrap text-center text-neutral-800 typo-caption-2'>
              {displayIntakeDays}
              <span className='mx-1 text-[13px] font-medium leading-[150%] tracking-[-0.011em] text-neutral-500'>
                /
              </span>
              <span className='typo-caption-7 text-neutral-600'>
                {displayTotalDays}일
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionWeekDetailModal;