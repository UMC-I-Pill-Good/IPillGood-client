export type ConditionGraphDataType = {
  weekLabel: string;
  weekNo?: number;
  weekStartDate?: string;
  score: number;
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

// 1. POST /conditions (이번 주 컨디션 체크 제출)
export type ConditionCheckRequest = {
  conditionScore: number;
  sleepHours: number;
  sleepMinutes: number;
};

export type ConditionCheckResult = {
  conditionCheckId: number;
  weekStartDate: string;
  sleepScore: number;
  intakeDays: number;
  intakeScore: number;
  conditionScore: number;
  completedAt: string;
};

export type ConditionCheckResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ConditionCheckResult;
};

// 2. GET /conditions/summary (컨디션 홈 화면 조회)
export type MonthlyGraphItem = {
  weekNo: number;
  weekStartDate: string;
  conditionScore: number | null;
};

export type MonthlySummary = {
  avgVitalityScore: number | null;
  avgSleepHours: number | null;
  intakeDays: number;
  intakeTotalDays: number;
};

export type ConditionHomeSummaryResult = {
  currentWeekCompleted: boolean;
  monthlyGraph: MonthlyGraphItem[];
  monthlySummary: MonthlySummary;
};

export type ConditionHomeSummaryResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ConditionHomeSummaryResult;
};

// 3. GET /conditions/{weekStartDate} (특정 주차 컨디션 상세 조회)
export type ConditionWeekDetailResult = {
  weekStartDate: string;
  weekEndDate: string;
  conditionScore: number | null;
  avgSleepHours: number | null;
  intakeCompletedDays: number;
  intakeTotalDays: number;
};

export type ConditionWeekDetailResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ConditionWeekDetailResult;
};
