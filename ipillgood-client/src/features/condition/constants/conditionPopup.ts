import { type VitalityOption } from '../types/condition';

export const VITALITY_OPTION_LIST: VitalityOption[] = [
  { score: 1, label: '매우 불만족', type: 'down' },
  { score: 2, label: '불만족', type: 'down' },
  { score: 3, label: '보통', type: 'neutral' },
  { score: 4, label: '만족', type: 'up' },
  { score: 5, label: '매우 만족', type: 'up' },
];

export const HOURS_LIST = Array.from({ length: 24 }, (_, i) => i);

export const MINUTES_LIST = Array.from({ length: 12 }, (_, i) => i * 5);
