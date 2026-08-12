'use client';

import { type ConditionGraphPointType } from '../../types/condition';
import {
  GRAPH_WIDTH,
  GRAPH_HEIGHT,
  AXIS_LEFT,
  AXIS_BOTTOM,
  GUIDE_LINE_LIST,
} from '../../constants/conditionGraph';

interface ConditionGraphSvgProps {
  currentMonth: number;
  graphPointList: ConditionGraphPointType[];
  hoveredPointIndex: number | null;
  selectedPointIndex: number | null;
  onHoverPoint: (index: number | null) => void;
  onSelectPoint: (index: number) => void;
}

const ConditionGraphSvg = ({
  currentMonth,
  graphPointList,
  hoveredPointIndex,
  selectedPointIndex,
  onHoverPoint,
  onSelectPoint,
}: ConditionGraphSvgProps) => {
  const hoverCardWidth = 48;
  const hoverCardHeight = 29;
  const hoverCardPointGap = 16;
  const validPoints = graphPointList.filter((p) => p.score !== null);
  const firstValidPointIndex = graphPointList.findIndex((point) => point.score !== null);
  const leadingUncheckedPoints =
    firstValidPointIndex === -1
      ? graphPointList
      : graphPointList.slice(0, firstValidPointIndex);
  // 첫 기록 전 미체크 주차만 X축 위 시작점으로 사용하고, 기록 사이의 빈 주차는 건너뛴다.
  const linePointList = [...leadingUncheckedPoints, ...validPoints];
  const pathD = [
    `M ${AXIS_LEFT} ${AXIS_BOTTOM}`,
    ...linePointList.map(({ x, y }) => `L ${x} ${y}`),
  ].join(' ');

  return (
    <svg
      role='group'
      aria-label={`${currentMonth}월 주차별 컨디션 점수 그래프`}
      viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
      className='absolute left-1/2 top-[67px] h-[166px] w-[284px] -translate-x-1/2 overflow-visible'
    >
      <defs>
        <filter id='shadow-highlight' x='-100%' y='-100%' width='300%' height='300%'>
          <feDropShadow
            dx='0'
            dy='0'
            stdDeviation='5'
            floodColor='var(--color-neutral-800)'
            floodOpacity='0.61'
          />
        </filter>
      </defs>

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
            x='9'
            y={y}
            fill='var(--color-neutral-800)'
            fontFamily='Pretendard, sans-serif'
            fontSize='12'
            fontWeight='500'
            letterSpacing='-0.011em'
            textAnchor='end'
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

      <path
        d={pathD}
        fill='none'
        stroke='var(--color-neutral-800)'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{ transition: 'd 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
      />

      {graphPointList.map((condition, index) => {
        if (condition.score === null) return null;

        const isHighlighted = hoveredPointIndex === index || selectedPointIndex === index;
        const isHovered = hoveredPointIndex === index;
        const hoverCardX = condition.x - hoverCardWidth / 2;
        const hoverCardY = condition.y - hoverCardHeight - hoverCardPointGap;
        const hoverCardScore = Number(condition.score.toFixed(1));

        return (
          <g key={condition.weekLabel}>
            {isHovered && (
              <>
                <line
                  x1={condition.x}
                  y1={hoverCardY + hoverCardHeight}
                  x2={condition.x}
                  y2={AXIS_BOTTOM}
                  stroke='var(--color-neutral-400)'
                  strokeWidth='1.5'
                  pointerEvents='none'
                />

                <g pointerEvents='none'>
                  <rect
                    x={hoverCardX}
                    y={hoverCardY}
                    width={hoverCardWidth}
                    height={hoverCardHeight}
                    rx='8'
                    fill='var(--color-primary-600)'
                  />
                  <text
                    x={condition.x}
                    y={hoverCardY + hoverCardHeight / 2}
                    fill='var(--color-white)'
                    fontFamily='Pretendard, sans-serif'
                    fontSize='10'
                    textAnchor='middle'
                    dominantBaseline='middle'
                  >
                    <tspan x={condition.x} dy='-5' fontWeight='600'>
                      {condition.weekLabel}
                    </tspan>
                    <tspan x={condition.x} dy='11' fontWeight='400'>
                      {hoverCardScore}점
                    </tspan>
                  </text>
                </g>
              </>
            )}

            <circle
              cx={condition.x}
              cy={condition.y}
              r={isHighlighted ? 7 : 5}
              fill={
                isHighlighted ? 'var(--color-primary-700)' : 'var(--color-primary-600)'
              }
              filter={isHighlighted ? 'url(#shadow-highlight)' : undefined}
              style={{
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              pointerEvents='none'
            />

            <foreignObject
              x={condition.x - 12}
              y={condition.y - 12}
              width='24'
              height='24'
              className='overflow-visible'
              style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <button
                type='button'
                aria-label={`${condition.weekLabel} 컨디션 점수 ${condition.score}점 상세 보기`}
                className='size-6 rounded-full bg-transparent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600'
                onMouseEnter={() => onHoverPoint(index)}
                onMouseLeave={() => onHoverPoint(null)}
                onClick={() => onSelectPoint(index)}
              />
            </foreignObject>
          </g>
        );
      })}

      {graphPointList.map(({ weekLabel, x }) => (
        <text
          key={`${weekLabel}-label`}
          x={x}
          y='165'
          fill='var(--color-neutral-800)'
          fontFamily='Pretendard, sans-serif'
          fontSize='12'
          fontWeight='400'
          textAnchor='middle'
        >
          {weekLabel}
        </text>
      ))}
    </svg>
  );
};

export default ConditionGraphSvg;
