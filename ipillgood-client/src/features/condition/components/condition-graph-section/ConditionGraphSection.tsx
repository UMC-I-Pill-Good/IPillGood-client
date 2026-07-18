'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useConditionStore } from '../../store/useConditionStore';

import { type ConditionGraphPointType } from '../../types/condition';
import ConditionWeekDetailModal from '../condition-week-detail-modal/ConditionWeekDetailModal';
import ConditionGraphSvg from './ConditionGraphSvg';

import {
  DUMMY_CONDITION_GRAPH_DATA,
  CURRENT_MONTH,
  AXIS_LEFT,
  AXIS_BOTTOM,
  SCORE_INTERVAL,
  WEEK_X_POSITION_LIST,
} from '../../constants/conditionGraph';

const getScoreY = (score: number) => {
  return AXIS_BOTTOM - score * SCORE_INTERVAL;
};

const graphPointList: ConditionGraphPointType[] =
  DUMMY_CONDITION_GRAPH_DATA.map((condition, index) => ({
    ...condition,
    x: WEEK_X_POSITION_LIST[index] ?? AXIS_LEFT,
    y: getScoreY(condition.score),
  }));

const graphLinePoints = [
  `${AXIS_LEFT},${AXIS_BOTTOM}`,
  ...graphPointList.map(({ x, y }) => `${x},${y}`),
].join(' ');

const ConditionGraphSection = () => {
  const { selectedWeekIndex, setSelectedWeekIndex, closeModal } =
    useConditionStore();
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(
    null,
  );

  const selectedPoint =
    selectedWeekIndex !== null
      ? DUMMY_CONDITION_GRAPH_DATA[selectedWeekIndex]
      : null;

  const handlePointClick = (index: number) => {
    setSelectedWeekIndex(index);
  };

  const handleModalClose = () => {
    closeModal();
  };

  return (
    <>
      <section className='flex w-full flex-col px-5 py-4'>
        <div className='flex w-full flex-col gap-2.5'>
          <h2 className='typo-body-5 text-[#111111]'>
            {CURRENT_MONTH}월 컨디션 변화 그래프
          </h2>

          <div className='relative h-[258px] w-full overflow-hidden rounded-[20px] border border-white bg-white/70 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]'>
            {/* 상단 월 이동 헤더 */}
            <div className='absolute left-1/2 top-[11px] flex h-6 w-[283px] -translate-x-1/2 items-center justify-between'>
              <button
                type='button'
                aria-label='이전 달 보기'
                className='flex size-6 items-center justify-center text-neutral-900'
              >
                <ChevronLeft aria-hidden='true' size={24} strokeWidth={1.5} />
              </button>

              <p className='typo-body-10 w-6 text-center text-[#111111]'>
                {CURRENT_MONTH}월
              </p>

              <button
                type='button'
                aria-label='다음 달 보기'
                className='flex size-6 items-center justify-center text-neutral-900'
              >
                <ChevronRight aria-hidden='true' size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* 분리된 꺾은선 SVG 그래프 컴포넌트 */}
            <ConditionGraphSvg
              currentMonth={CURRENT_MONTH}
              graphPointList={graphPointList}
              graphLinePoints={graphLinePoints}
              hoveredPointIndex={hoveredPointIndex}
              onHoverPoint={setHoveredPointIndex}
              onSelectPoint={handlePointClick}
            />

            <p className='absolute bottom-[5px] left-1/2 w-[284px] -translate-x-1/2 text-right text-[10px] font-normal leading-none text-neutral-700'>
              컨디션 점수 (1-5점)
            </p>
          </div>
        </div>
      </section>

      {/* 특정 주차 상세 모달 */}
      {selectedPoint && (
        <ConditionWeekDetailModal
          month={CURRENT_MONTH}
          weekLabel={selectedPoint.weekLabel}
          weekStartDate={selectedPoint.weekStartDate ?? '2026-05-25'}
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
