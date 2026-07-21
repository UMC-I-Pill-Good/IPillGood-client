'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useConditionStore } from '../../store/useConditionStore';
import { useConditionFlow } from '../../hooks/useConditionFlow';

import { type ConditionGraphPointType } from '../../types/condition';
import ConditionWeekDetailModal from '../condition-week-detail-modal/ConditionWeekDetailModal';
import ConditionGraphSvg from './ConditionGraphSvg';

import {
  CURRENT_MONTH,
  AXIS_LEFT,
  AXIS_BOTTOM,
  SCORE_INTERVAL,
  WEEK_X_POSITION_LIST,
} from '../../constants/conditionGraph';

const getScoreY = (score: number) => {
  return AXIS_BOTTOM - score * SCORE_INTERVAL;
};

const ConditionGraphSection = () => {
  const { selectedWeekIndex, setSelectedWeekIndex, closeModal } =
    useConditionStore();
  const { homeSummaryData } = useConditionFlow();
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(
    null,
  );

  const monthlyGraphData = homeSummaryData.records;

  // 초기 0일 때/로드 전 일관된 0점 기본 데이터 렌더링 (항상 5주차 라벨 및 좌표 보장)
  const sourceGraphData = Array.from({ length: 5 }, (_, index) => {
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
      score: null, // 데이터가 없는 주차는 null로 처리하여 점/선을 그리지 않음
      vitality: 0,
      sleepHours: 0,
      intakeDays: 0,
      totalDays: 7,
    };
  });

  const graphPointList: ConditionGraphPointType[] = sourceGraphData.map(
    (condition, index) => ({
      ...condition,
      x: WEEK_X_POSITION_LIST[index] ?? AXIS_LEFT,
      y: condition.score !== null ? getScoreY(condition.score) : AXIS_BOTTOM,
    }),
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

  return (
    <>
      <section className='flex w-full flex-col px-5 py-4'>
        <div className='flex w-full flex-col gap-2'>
          <div className='flex w-full flex-col items-start gap-1'>
            <h2 className='text-lg font-semibold leading-normal text-black'>
              {CURRENT_MONTH}월 컨디션 변화 그래프
            </h2>
            <p className='text-xs font-medium leading-normal text-point-900'>
              각 주차의 점을 클릭해 상세 정보를 확인해 보세요!
            </p>
          </div>

          <div className='relative h-[258px] w-full overflow-hidden rounded-2xl border border-white bg-white/70 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]'>
            {/* 상단 월 이동 헤더 */}
            <div className='absolute left-1/2 top-[11px] flex h-6 w-[283px] -translate-x-1/2 items-center justify-between'>
              <button
                type='button'
                aria-label='이전 달 보기'
                className='flex size-6 items-center justify-center text-neutral-900'
              >
                <ChevronLeft aria-hidden='true' size={24} strokeWidth={1.5} />
              </button>

              <p className='typo-body-10 w-6 text-center text-black'>
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

      {/* 선택된 주차의 recordId가 존재할 때만 상세 모달 렌더링 */}
      {selectedPoint && selectedPoint.recordId !== undefined && (
        <ConditionWeekDetailModal
          month={CURRENT_MONTH}
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
