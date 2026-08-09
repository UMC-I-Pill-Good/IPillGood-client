'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useConditionStore } from '../../store/useConditionStore';
import { useConditionContext } from '../ConditionProvider';
import { type ConditionGraphPointType } from '../../types/condition';
import ConditionWeekDetailModal from '../condition-week-detail-modal/ConditionWeekDetailModal';
import ConditionGraphSvg from './ConditionGraphSvg';

import {
  AXIS_BOTTOM,
  POINT_END_X,
  POINT_START_X,
  SCORE_INTERVAL,
} from '../../constants/conditionGraph';

const getScoreY = (score: number) => {
  return AXIS_BOTTOM - score * SCORE_INTERVAL;
};

const getSundayWeeksCount = (year: number, month: number): number => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const firstSunday = 1 + ((7 - firstDay.getDay()) % 7);

  return Math.floor((lastDay.getDate() - firstSunday) / 7) + 1;
};

const getSundayWeekIndex = (year: number, month: number, weekEndOn: string) => {
  const [recordYear, recordMonth, recordDay] = weekEndOn.split('-').map(Number);
  if (recordYear !== year || recordMonth !== month) return -1;

  const firstDay = new Date(year, month - 1, 1);
  const firstSunday = 1 + ((7 - firstDay.getDay()) % 7);
  return Math.floor((recordDay - firstSunday) / 7);
};

const ConditionGraphSection = () => {
  const { selectedWeekIndex, setSelectedWeekIndex, closeModal } = useConditionStore();
  const {
    homeSummaryData,
    currentWeekStatus,
    isMonthlyRecordsFetching,
    handlePreviousMonth,
    handleNextMonth,
  } = useConditionContext();
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const totalWeeks = getSundayWeeksCount(homeSummaryData.year, homeSummaryData.month);
  const recordsByWeekIndex = new Map(
    homeSummaryData.records
      .map((record) => [
        getSundayWeekIndex(homeSummaryData.year, homeSummaryData.month, record.weekEndOn),
        record,
      ] as const)
      .filter(([weekIndex]) => weekIndex >= 0 && weekIndex < totalWeeks),
  );

  const sourceGraphData = Array.from({ length: totalWeeks }, (_, index) => {
    const weekNo = index + 1;
    const item = recordsByWeekIndex.get(index);
    if (item) {
      const score = item.conditionScore;
      return {
        weekLabel: `${weekNo}주차`,
        weekNo,
        recordId: item.recordId,
        score,
      };
    }
    return {
      weekLabel: `${weekNo}주차`,
      weekNo,
      recordId: undefined,
      score: null,
    };
  });

  const graphPointList: ConditionGraphPointType[] = sourceGraphData.map((condition, index) => {
    const x =
      totalWeeks <= 1
        ? POINT_START_X
        : POINT_START_X + (index * (POINT_END_X - POINT_START_X)) / (totalWeeks - 1);

    return {
      ...condition,
      x,
      y: condition.score !== null ? getScoreY(condition.score) : AXIS_BOTTOM,
    };
  });

  const selectedPoint = selectedWeekIndex !== null ? sourceGraphData[selectedWeekIndex] : null;

  const handlePointClick = (index: number) => {
    setSelectedWeekIndex(index);
  };

  const handleModalClose = () => {
    closeModal();
  };

  const handlePreviousMonthClick = () => {
    closeModal();
    setHoveredPointIndex(null);
    handlePreviousMonth();
  };

  const handleNextMonthClick = () => {
    closeModal();
    setHoveredPointIndex(null);
    handleNextMonth();
  };

  const currentYear = currentWeekStatus.today
    ? Number(currentWeekStatus.today.slice(0, 4))
    : new Date().getFullYear();
  const displayYearMonth =
    homeSummaryData.year !== currentYear
      ? `${homeSummaryData.year}년 ${homeSummaryData.month}월`
      : `${homeSummaryData.month}월`;
  return (
    <>
      <section className='flex w-full flex-col px-5 py-4'>
        <div className='flex w-full flex-col gap-2'>
          <div className='flex w-full flex-col items-start gap-1'>
            <h2 className='text-lg font-semibold leading-normal text-black'>
              {displayYearMonth} 컨디션 변화 그래프
            </h2>
            <p className='text-xs font-medium leading-normal text-point-900'>
              각 주차의 점을 클릭해 상세 정보를 확인해 보세요!
            </p>
          </div>

          <div className='relative h-[268px] w-full overflow-hidden rounded-2xl border border-white bg-white/70 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]'>
            <div className='absolute left-1/2 top-[11px] flex h-6 w-[283px] -translate-x-1/2 items-center justify-between'>
              <button
                type='button'
                aria-label='이전 달'
                onClick={handlePreviousMonthClick}
                disabled={isMonthlyRecordsFetching}
                className='flex size-6 items-center justify-center text-neutral-900 transition-all rounded-full hover:bg-neutral-100/70 active:bg-neutral-200/70 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <ChevronLeft aria-hidden='true' size={24} strokeWidth={1.5} />
              </button>

              <p className='typo-body-10 w-auto text-center text-black'>{displayYearMonth}</p>

              <button
                type='button'
                aria-label='다음 달'
                onClick={handleNextMonthClick}
                disabled={isMonthlyRecordsFetching}
                className='flex size-6 items-center justify-center text-neutral-900 transition-all rounded-full hover:bg-neutral-100/70 active:bg-neutral-200/70 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <ChevronRight aria-hidden='true' size={24} strokeWidth={1.5} />
              </button>
            </div>

            <ConditionGraphSvg
              currentMonth={homeSummaryData.month}
              graphPointList={graphPointList}
              hoveredPointIndex={hoveredPointIndex}
              selectedPointIndex={selectedWeekIndex}
              onHoverPoint={setHoveredPointIndex}
              onSelectPoint={handlePointClick}
            />

            <p className='absolute bottom-[10px] left-1/2 w-[284px] -translate-x-1/2 text-right text-xs font-normal leading-normal text-neutral-700'>
              컨디션 점수 (1-5점)
            </p>
          </div>
        </div>
      </section>

      {selectedPoint && selectedPoint.recordId !== undefined && (
        <ConditionWeekDetailModal
          month={homeSummaryData.month}
          weekLabel={selectedPoint.weekLabel}
          recordId={selectedPoint.recordId}
          onClose={handleModalClose}
        />
      )}

    </>
  );
};

export default ConditionGraphSection;
