// 2026 ~ 1900
export const yearOptions = Array.from({ length: 2026 - 1900 + 1 }, (_, i) => 2026 - i);

// 1 ~ 12
export const monthOptions = Array.from({ length: 12 }, (_, i) => 12 - i);

// 1 ~ 50
export const periodOptions = Array.from({ length: 50 - 1 + 1 }, (_, i) => 1 + i);

export const jobOptions = [
  '사무직',
  '전문직',
  '서비스직',
  '생산/기술직',
  '자영업',
  '학생',
  '주부',
  '운동선수/트레이너',
] as const;

export const JOB_TYPE_MAP = {
  사무직: 'OFFICE',
  전문직: 'PROFESSIONAL',
  서비스직: 'SERVICE',
  '생산/기술직': 'PRODUCTION_TECH',
  자영업: 'SELF_EMPLOYED',
  학생: 'STUDENT',
  주부: 'HOUSEWIFE',
  '운동선수/트레이너': 'ATHLETE_TRAINER',
} as const;

export type JobLabel = (typeof jobOptions)[number];
