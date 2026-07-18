'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useConditionStore } from '../store/useConditionStore';

import {
    type ConditionGraphPointType,
} from '../types/condition';
import ConditionWeekDetailModal from './condition-week-detail-modal/ConditionWeekDetailModal';

import {
    DUMMY_CONDITION_GRAPH_DATA,
    CURRENT_MONTH,
    GRAPH_WIDTH,
    GRAPH_HEIGHT,
    AXIS_LEFT,
    AXIS_BOTTOM,
    SCORE_INTERVAL,
    WEEK_X_POSITION_LIST,
    GUIDE_LINE_LIST,
} from '../constants/conditionGraph';

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
    const { selectedWeekIndex, setSelectedWeekIndex, closeModal } = useConditionStore();
    const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

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

                    <div
                        className='relative h-[258px] w-full overflow-hidden rounded-[20px] border border-white bg-white/70 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]'
                    >
                        <div className='absolute left-1/2 top-[11px] flex h-6 w-[283px] -translate-x-1/2 items-center justify-between'>
                            <button
                                type='button'
                                aria-label='이전 달 보기'
                                className='flex size-6 items-center justify-center text-neutral-900'
                            >
                                <ChevronLeft
                                    aria-hidden='true'
                                    size={24}
                                    strokeWidth={1.5}
                                />
                            </button>

                            <p className='typo-body-10 w-6 text-center text-[#111111]'>
                                {CURRENT_MONTH}월
                            </p>

                            <button
                                type='button'
                                aria-label='다음 달 보기'
                                className='flex size-6 items-center justify-center text-neutral-900'
                            >
                                <ChevronRight
                                    aria-hidden='true'
                                    size={24}
                                    strokeWidth={1.5}
                                />
                            </button>
                        </div>

                        <svg
                            role='group'
                            aria-label={`${CURRENT_MONTH}월 주차별 컨디션 점수 그래프`}
                            viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
                            className='absolute left-1/2 top-[67px] h-[166px] w-[284px] -translate-x-1/2 overflow-visible'
                        >
                            {GUIDE_LINE_LIST.map(({ score, y }) => (
                                <g key={score}>
                                    <line
                                        x1={AXIS_LEFT}
                                        y1={y}
                                        x2={GRAPH_WIDTH}
                                        y2={y}
                                        stroke='var(--color-neutral-600)'
                                        strokeWidth='0.5'
                                    />

                                    <text
                                        x='3.4'
                                        y={y}
                                        fill='var(--color-neutral-800)'
                                        fontFamily='Inter, sans-serif'
                                        fontSize='8'
                                        fontWeight='500'
                                        letterSpacing='-0.011em'
                                        textAnchor='middle'
                                        dominantBaseline='middle'
                                    >
                                        {score}
                                    </text>
                                </g>
                            ))}

                            <line
                                x1={AXIS_LEFT}
                                y1='0'
                                x2={AXIS_LEFT}
                                y2={AXIS_BOTTOM}
                                stroke='var(--color-neutral-800)'
                                strokeWidth='1'
                            />

                            <line
                                x1={AXIS_LEFT}
                                y1={AXIS_BOTTOM}
                                x2={GRAPH_WIDTH}
                                y2={AXIS_BOTTOM}
                                stroke='var(--color-neutral-800)'
                                strokeWidth='1'
                            />

                            <polyline
                                points={graphLinePoints}
                                fill='none'
                                stroke='var(--color-neutral-800)'
                                strokeWidth='1'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />

                            {graphPointList.map(
                                (condition, index) => (
                                    <g key={condition.weekLabel}>
                                        {/* 호버 시 세로 평행 가이드라인 렌더링 */}
                                        {hoveredPointIndex === index && (
                                            <line
                                                x1={condition.x}
                                                y1={AXIS_BOTTOM}
                                                x2={condition.x}
                                                y2={condition.y}
                                                stroke='#B1B8BE'
                                                strokeWidth='1.5'
                                                pointerEvents='none'
                                            />
                                        )}

                                        {/* 호버 시 커지고 색상 변하는 데이터 점 */}
                                        <circle
                                            cx={condition.x}
                                            cy={condition.y}
                                            r={hoveredPointIndex === index ? 4.87 : 3}
                                            fill={hoveredPointIndex === index ? '#6580EE' : 'var(--primary, #7F99FF)'}
                                            style={
                                                hoveredPointIndex === index
                                                    ? { filter: 'drop-shadow(0px 0px 5px rgba(126, 131, 135, 0.61))' }
                                                    : undefined
                                            }
                                            pointerEvents='none'
                                        />

                                        <foreignObject
                                            x={condition.x - 12}
                                            y={condition.y - 12}
                                            width='24'
                                            height='24'
                                            className='overflow-visible'
                                        >
                                            <button
                                                type='button'
                                                aria-label={`${condition.weekLabel} 컨디션 점수 ${condition.score}점 상세 보기`}
                                                className='size-6 rounded-full bg-transparent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600'
                                                onMouseEnter={() => setHoveredPointIndex(index)}
                                                onMouseLeave={() => setHoveredPointIndex(null)}
                                                onClick={() =>
                                                    handlePointClick(
                                                        index,
                                                    )
                                                }
                                            />
                                        </foreignObject>
                                    </g>
                                ),
                            )}

                            {graphPointList.map(
                                ({ weekLabel, x }) => (
                                    <text
                                        key={`${weekLabel}-label`}
                                        x={x}
                                        y='163'
                                        fill='var(--color-neutral-800)'
                                        fontFamily='Pretendard, sans-serif'
                                        fontSize='10'
                                        fontWeight='400'
                                        textAnchor='middle'
                                    >
                                        {weekLabel}
                                    </text>
                                ),
                            )}
                        </svg>

                        <p className='absolute bottom-[5px] left-1/2 w-[284px] -translate-x-1/2 text-right text-[10px] font-normal leading-none text-neutral-700'>
                            컨디션 점수 (1-5점)
                        </p>
                    </div>
                </div>
            </section>

            {selectedPoint && (
                <ConditionWeekDetailModal
                    month={CURRENT_MONTH}
                    weekLabel={selectedPoint.weekLabel}
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