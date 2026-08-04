'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useConditionStore } from '../../store/useConditionStore';
import { useConditionFlow } from '../../hooks/useConditionFlow';

import { getConditionSummary } from '../../api/getConditionSummary';
import { type ConditionGraphPointType } from '../../types/condition';
import ConditionWeekDetailModal from '../condition-week-detail-modal/ConditionWeekDetailModal';
import ConditionGraphSvg from './ConditionGraphSvg';

import {
  AXIS_LEFT,
  AXIS_BOTTOM,
  SCORE_INTERVAL,
} from '../../constants/conditionGraph';

const getScoreY = (score: number) => {
  return AXIS_BOTTOM - score * SCORE_INTERVAL;
};

const getCalendarWeeksCount = (year: number, month: number): number => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const firstDayOfWeek = firstDay.getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const totalDays = lastDay.getDate();
  return Math.ceil((totalDays + startOffset) / 7);
};

const ConditionGraphSection = () => {
  const { selectedWeekIndex, setSelectedWeekIndex, closeModal, setHomeSummaryData } =
    useConditionStore();
  const { homeSummaryData } = useConditionFlow();
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(
    null,
  );

  const handlePrevMonth = async () => {
    let prevYear = homeSummaryData.year;
    let prevMonth = homeSummaryData.month - 1;
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear -= 1;
    }
    try {
      const res = await getConditionSummary(prevYear, prevMonth);
      if (res.isSuccess && res.result) {
        setHomeSummaryData(res.result);
      }
    } catch (err) {
      console.error('이전 달 조회 실패:', err);
    }
  };

  const handleNextMonth = async () => {
    let nextYear = homeSummaryData.year;
    let nextMonth = homeSummaryData.month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear += 1;
    }
    try {
      const res = await getConditionSummary(nextYear, nextMonth);
      if (res.isSuccess && res.result) {
        setHomeSummaryData(res.result);
      }
    } catch (err) {
      console.error('다음 달 조회 실패:', err);
    }
  };

  const monthlyGraphData = homeSummaryData.records;

  const totalWeeks = Math.min(
    5,
    getCalendarWeeksCount(homeSummaryData.year, homeSummaryData.month),
  );

  const sourceGraphData = Array.from({ length: totalWeeks }, (_, index) => {
    const weekNo = index + 1;
    const item = monthlyGraphData && monthlyGraphData[index];
    if (item) {
      const score = item.conditionScore;
      return {
        weekLabel: `${weekNo}주차`,
        weekNo,
        weekStartDate: item.weekStartOn,
        recordId: item.recordId,
        score,
        vitality: score ?? 0,
        sleepHours: 0,
        intakeDays: 0,
        totalDays: 7,
      };
    }
    return {
      weekLabel: `${weekNo}주차`,
      weekNo,
      weekStartDate: undefined,
      recordId: undefined,
      score: null,
      vitality: 0,
      sleepHours: 0,
      intakeDays: 0,
      totalDays: 7,
    };
  });

  const graphPointList: ConditionGraphPointType[] = sourceGraphData.map(
    (condition, index) => {
      const startX = 48.38;
      const endX = 251.05;
      const x =
        totalWeeks <= 1
          ? startX
          : startX + (index * (endX - startX)) / (totalWeeks - 1);

      return {
        ...condition,
        x,
        y: condition.score !== null ? getScoreY(condition.score) : AXIS_BOTTOM,
      };
    },
  );

  const graphLinePoints = [
    `${AXIS_LEFT},${AXIS_BOTTOM}`,
    ...graphPointList.filter(({ score }) => score !== null).map(({ x, y }) => `${x},${y}`),
  ].join(' ');

  const selectedPoint =
    selectedWeekIndex !== null ? sourceGraphData[selectedWeekIndex] : null;

  const handlePointClick = (index: number) => {
    setSelectedWeekIndex(index);
  };

  const handleModalClose = () => {
    closeModal();
  };

  const currentYear = new Date().getFullYear();
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
            {/* 상단 월 이동 헤더 */}
            <div className='absolute left-1/2 top-[11px] flex h-6 w-[283px] -translate-x-1/2 items-center justify-between'>
              <button
                type='button'
                aria-label='이전 달'
                onClick={handlePrevMonth}
                className='flex size-6 items-center justify-center text-neutral-900 transition-all rounded-full hover:bg-neutral-100/70 active:bg-neutral-200/70'
              >
                <ChevronLeft aria-hidden='true' size={24} strokeWidth={1.5} />
              </button>

              <p className='typo-body-10 w-auto text-center text-black'>
                {displayYearMonth}
              </p>

              <button
                type='button'
                aria-label='다음 달'
                onClick={handleNextMonth}
                className='flex size-6 items-center justify-center text-neutral-900 transition-all rounded-full hover:bg-neutral-100/70 active:bg-neutral-200/70'
              >
                <ChevronRight aria-hidden='true' size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* 분리된 꺾은선 SVG 그래프 컴포넌트 */}
            <ConditionGraphSvg
              currentMonth={homeSummaryData.month}
              graphPointList={graphPointList}
              graphLinePoints={graphLinePoints}
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
          weekStartDate={selectedPoint.weekStartDate}
          vitality={selectedPoint.vitality}
          sleepHours={selectedPoint.sleepHours}
          intakeDays={selectedPoint.intakeDays}
          totalDays={selectedPoint.totalDays}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default ConditionGraphSection;
