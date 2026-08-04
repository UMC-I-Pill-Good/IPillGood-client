import { type CommonResponse } from '@/shared/types/api';

export type ConditionGraphDataType = {
  weekLabel: string;
  weekNo?: number;
  weekStartDate?: string;
  score: number | null;
  vitality: number;
  sleepHours: number;
  intakeDays: number;
  totalDays: number;
};

export type ConditionGraphPointType = ConditionGraphDataType & {
  x: number;
  y: number;
};

export type ConditionSummaryType = 'vitality' | 'sleep' | 'intake';

// 1. POST /api/v1/conditions/weekly-records (주간 컨디션 체크 저장)
export type ConditionCheckRequest = {
  vitalityScore: number;
  sleepHours: number;
  sleepMinutes: number;
};

export type ConditionCheckResult = {
  recordId: number;
  weekStartOn: string;
  weekEndOn: string;
  checkedOn: string;
  vitalityScore: number;
  sleepHours: number;
  sleepMinutes: number;
  sleepScore: number;
  intakeDaysCount: number;
  intakeScore: number;
  conditionScore: number;
};

export type ConditionCheckResponse = CommonResponse<ConditionCheckResult>;

// 2. GET /api/v1/conditions/monthly-records (월 컨디션 그래프 조회)
export type ConditionWeeklySummary = {
  recordId: number;
  weekStartOn: string;
  weekEndOn: string;
  conditionScore: number | null;
};

export type ConditionMonthlyRecordsResult = {
  year: number;
  month: number;
  averageConditionScore: number | null;
  averageVitalityScore: number | null;
  averageSleepHours: number | null;
  averageIntakeDaysCount: number | null;
  records: ConditionWeeklySummary[];
};

export type ConditionMonthlyRecordsResponse = CommonResponse<ConditionMonthlyRecordsResult>;

// 3. GET /api/v1/conditions/weekly-records/{recordId} (주차 상세 조회)
export type ConditionWeekDetailResult = {
  recordId: number;
  weekStartOn: string;
  weekEndOn: string;
  checkedOn: string;
  vitalityScore: number;
  sleepHours: number;
  sleepMinutes: number;
  sleepScore: number;
  intakeDaysCount: number;
  intakeScore: number;
  conditionScore: number;
};

export type ConditionWeekDetailResponse = CommonResponse<ConditionWeekDetailResult>;

// 4. GET /api/v1/conditions/current-week (이번 주 컨디션 체크 상태 조회)
export type ConditionCurrentWeekResult = {
  today: string;
  weekStartOn: string;
  weekEndOn: string;
  isSunday: boolean;
  checkAvailable: boolean;
  checked: boolean;
  recordId: number | null;
  autoPopupAvailable: boolean;
  autoShownAt: string | null;
  dismissedAt: string | null;
  sundayIntakeWarningRequired: boolean;
};

export type ConditionCurrentWeekResponse = CommonResponse<ConditionCurrentWeekResult>;

// 5. PATCH /api/v1/conditions/popup-logs/auto-shown (컨디션 팝업 자동 노출 기록)
export type ConditionPopupAutoShownResult = {
  popupLogId: number;
  weekStartOn: string;
  autoShownAt: string;
};

export type ConditionPopupAutoShownResponse = CommonResponse<ConditionPopupAutoShownResult>;

// 6. PATCH /api/v1/conditions/popup-logs/current-week/dismissed (컨디션 팝업 닫힘 기록)
export type ConditionPopupDismissedResult = {
  popupLogId: number;
  weekStartOn: string;
  dismissedAt: string;
};

export type ConditionPopupDismissedResponse = CommonResponse<ConditionPopupDismissedResult>;


