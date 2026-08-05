import { CommonResponse } from '@/shared/types';

export type MascotStageType = 'SEED' | 'SPROUT' | 'FLOWER' | 'FRUIT' | 'TREE';

export type StreakStatusType = 'COMPLETED' | 'MAINTAINED' | 'PENDING' | 'EXCLUDED';

export type GrowthStageStatusType = 'PREVIOUS' | 'CURRENT' | 'LOCKED';

export type GrowthStageOptionType = {
  label: string;
  value: MascotStageType;
  dayRangeText: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  lockedIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type IntakeStreakType = {
  currentDate: string;
  currentDateStreakStatus: StreakStatusType;
  streakDays: number;
  mascotStage: MascotStageType;
  mascotStageLabel: string;
  activeProductCount: number;
  lastRoutineDate: string | null;
  nextStageThresholdDays: number | null;
};

export type IntakeStreakResponseType = CommonResponse<IntakeStreakType>;
