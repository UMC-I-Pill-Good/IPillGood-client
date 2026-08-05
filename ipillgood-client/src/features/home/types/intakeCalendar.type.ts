import { CommonResponse } from '@/shared/types';
import { StreakStatusType } from './growthStage.type';

export type DayType = {
  date: string;
  dayOfMonth: number;
  hasTakenRecords: boolean;
  allCompleted: boolean;
  streakStatus: StreakStatusType;
  streakIncluded: boolean;
  selectable: boolean;
  takenCount: number;
  completedAt: string | null;
};

export type IntakeCalendarType = {
  year: number;
  month: number;
  days: DayType[];
};

export type IntakeCalendarResponseType = CommonResponse<IntakeCalendarType>;

export type IntakeCalendarParamsType = {
  year: number;
  month: number;
};
