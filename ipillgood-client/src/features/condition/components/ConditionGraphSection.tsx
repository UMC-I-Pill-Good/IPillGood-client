'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

import {
    type ConditionGraphDataType,
    type ConditionGraphPointType,
} from '../types/condition';
import ConditionWeekDetailModal from './ConditionWeekDetailModal';

const conditionGraphDataList: ConditionGraphDataType[] = [
    {
        weekLabel: '1주차',
        score: 2,
        vitality: 2,
        sleepHours: 5,
        intakeDays: 2,
        totalDays: 5,
    },
    {
        weekLabel: '2주차',
        score: 3.2,
        vitality: 3,
        sleepHours: 6,
        intakeDays: 3,
        totalDays: 5,
    },
    {
        weekLabel: '3주차',
        score: 4,
        vitality: 4,
        sleepHours: 7,
        intakeDays: 4,
        totalDays: 5,
    },
    {
        weekLabel: '4주차',
        score: 2.8,
        vitality: 2,
        sleepHours: 5,
        intakeDays: 2,
        totalDays: 5,
    },
    {
        weekLabel: '5주차',
        score: 5,
        vitality: 3,
        sleepHours: 4.5,
        intakeDays: 3,
        totalDays: 5,
    },
];

const CURRENT_MONTH = 5;

const GRAPH_WIDTH = 284;
const GRAPH_HEIGHT = 166;

const AXIS_LEFT = 12.6;
const AXIS_BOTTOM = 148.67;
const SCORE_INTERVAL = 25.108;

const WEEK_X_POSITION_LIST = [
    48.38,
    99.88,
    149.72,
    200.38,
    251.05,
];

const guideLineList = [
    {
        score: 5,
        y: 23.13,
    },
    {
        score: 4,
        y: 48.238,
    },
    {
        score: 3,
        y: 73.346,
    },
    {
        score: 2,
        y: 98.454,
    },
    {
        score: 1,
        y: 123.562,
    },
];

const getScoreY = (score: number) => {
    return AXIS_BOTTOM - score * SCORE_INTERVAL;
};

const graphPointList: ConditionGraphPointType[] =
    conditionGraphDataList.map((condition, index) => ({
        ...condition,
        x: WEEK_X_POSITION_LIST[index] ?? AXIS_LEFT,
        y: getScoreY(condition.score),
    }));

const graphLinePoints = [
    `${AXIS_LEFT},${AXIS_BOTTOM}`,
    ...graphPointList.map(({ x, y }) => `${x},${y}`),
].join(' ');

const ConditionGraphSection = () => {
    const [graphCardElement, setGraphCardElement] = useState<HTMLDivElement | null>(null);

    const [selectedPointIndex, setSelectedPointIndex] =
        useState<number | null>(null);

    const selectedPoint =
        selectedPointIndex !== null
            ? conditionGraphDataList[selectedPointIndex]
            : null;

    const handlePointClick = (index: number) => {
        setSelectedPointIndex(index);
    };

    const handleModalClose = () => {
        setSelectedPointIndex(null);
    };

    return (
        <>
            <section className='flex h-[319px] w-full flex-col px-5 py-4'>
                <div className='flex w-full flex-col gap-2'>
                    <h2 className='typo-body-5 h-[21px] text-[#111111]'>
                        {CURRENT_MONTH}월 컨디션 변화 그래프
                    </h2>

                    <div
                        ref={setGraphCardElement}
                        className='relative h-[258px] w-full overflow-hidden rounded-[20px] border border-white bg-white/70 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] backdrop-blur-xl'
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
                            {guideLineList.map(({ score, y }) => (
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
                                        <circle
                                            cx={condition.x}
                                            cy={condition.y}
                                            r='3'
                                            fill='var(--color-neutral-800)'
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

                        <p className='absolute bottom-[9px] left-1/2 h-3 w-[284px] -translate-x-1/2 text-right text-[10px] font-normal leading-none text-neutral-700'>
                            컨디션 점수 (1-5점)
                        </p>
                    </div>
                </div>
            </section>

            {selectedPoint && (
                <ConditionWeekDetailModal
                    anchorElement={graphCardElement}
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