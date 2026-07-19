import { type ConditionHomeSummaryResponse } from '../types/condition';

/**
 * 컨디션 홈 화면 조회 (GET /conditions/summary)
 * @param month 조회할 월 (예: "2026-05")
 */
export const getConditionSummary = async (
  month?: string,
): Promise<ConditionHomeSummaryResponse> => {
  console.log('API GET /conditions/summary 호출 - month:', month);

  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '요청이 성공적으로 처리되었습니다.',
    result: {
      currentWeekCompleted: false,
      monthlyGraph: [
        { weekNo: 1, weekStartDate: '2026-05-04', conditionScore: 2.4 },
        { weekNo: 2, weekStartDate: '2026-05-11', conditionScore: 3.1 },
        { weekNo: 3, weekStartDate: '2026-05-18', conditionScore: 4.0 },
        { weekNo: 4, weekStartDate: '2026-05-25', conditionScore: 3.8 },
        { weekNo: 5, weekStartDate: '2026-06-01', conditionScore: 5.0 },
      ],
      monthlySummary: {
        avgVitalityScore: 3.0,
        avgSleepHours: 4.5,
        intakeDays: 3,
        intakeTotalDays: 7,
      },
    },
  };
};
