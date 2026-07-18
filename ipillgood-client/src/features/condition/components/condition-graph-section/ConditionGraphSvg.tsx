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
  onHoverPoint: (index: number | null) => void;
  onSelectPoint: (index: number) => void;
}

const ConditionGraphSvg = ({
  currentMonth,
  graphPointList,
  graphLinePoints,
  hoveredPointIndex,
  onHoverPoint,
  onSelectPoint,
}: ConditionGraphSvgProps) => {
  return (
    <svg
      role='group'
      aria-label={`${currentMonth}월 주차별 컨디션 점수 그래프`}
      viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
      className='absolute left-1/2 top-[67px] h-[166px] w-[284px] -translate-x-1/2 overflow-visible'
    >
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

      {/* 꺾은선 다각형 타일 */}
      <polyline
        points={graphLinePoints}
        fill='none'
        stroke='var(--color-neutral-800)'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {/* 주차별 데이터 포인트 점 및 호버 효과 */}
      {graphPointList.map((condition, index) => (
        <g key={condition.weekLabel}>
          {/* 호버 시 세로 가이드라인 */}
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

          {/* 데이터 포인트 점 */}
          <circle
            cx={condition.x}
            cy={condition.y}
            r={hoveredPointIndex === index ? 4.87 : 3}
            fill={
              hoveredPointIndex === index
                ? '#6580EE'
                : 'var(--primary, #7F99FF)'
            }
            style={
              hoveredPointIndex === index
                ? {
                    filter:
                      'drop-shadow(0px 0px 5px rgba(126, 131, 135, 0.61))',
                  }
                : undefined
            }
            pointerEvents='none'
          />

          {/* 클릭 상호작용 히트박스 버튼 */}
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
              onMouseEnter={() => onHoverPoint(index)}
              onMouseLeave={() => onHoverPoint(null)}
              onClick={() => onSelectPoint(index)}
            />
          </foreignObject>
        </g>
      ))}

      {/* X축 주차 라벨 */}
      {graphPointList.map(({ weekLabel, x }) => (
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
      ))}
    </svg>
  );
};

export default ConditionGraphSvg;
