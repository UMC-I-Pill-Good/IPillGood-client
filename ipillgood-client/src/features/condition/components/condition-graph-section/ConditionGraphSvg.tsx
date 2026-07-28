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
  graphLinePoints: string;
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
  const validPoints = graphPointList.filter((p) => p.score !== null);
  const pathD = [
    `M ${AXIS_LEFT} ${AXIS_BOTTOM}`,
    ...validPoints.map(({ x, y }) => `L ${x} ${y}`),
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
            floodColor='#7E8387'
            floodOpacity='0.61'
          />
        </filter>
      </defs>

      {/* 가이드라인 및 점수 라벨 */}
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

      {/* Y축 & X축 라인 */}
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

      {/* 꺾은선 패스 */}
      <path
        d={pathD}
        fill='none'
        stroke='var(--color-neutral-800)'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{ transition: 'd 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
      />

      {/* 주차별 데이터 포인트 점 및 호버 효과 */}
      {graphPointList.map((condition, index) => {
        if (condition.score === null) return null; // 데이터가 없는 주차는 점/선을 그리지 않음

        const isHighlighted = hoveredPointIndex === index || selectedPointIndex === index;

        return (
          <g key={condition.weekLabel}>
            {/* 데이터 포인트 점 */}
            <circle
              cx={condition.x}
              cy={condition.y}
              r={isHighlighted ? 6 : 4.5}
              fill={isHighlighted ? '#6580EE' : 'var(--primary, #7F99FF)'}
              filter={isHighlighted ? 'url(#shadow-highlight)' : undefined}
              style={{
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              pointerEvents='none'
            />

            {/* 클릭 상호작용 히트박스 버튼 */}
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

      {/* X축 주차 라벨 */}
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
