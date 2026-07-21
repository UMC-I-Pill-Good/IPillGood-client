import { type ConditionMonthlyRecordsResponse } from '../types/condition';

/**
 * 월 컨디션 그래프 조회 (GET /api/v1/conditions/monthly-records)
 * @param year 조회 연도 (예: 2026)
 * @param month 조회 월 (예: 7)
 */
export const getConditionSummary = async (
  year: number,
  month: number,
): Promise<ConditionMonthlyRecordsResponse> => {
  console.log(`API GET /api/v1/conditions/monthly-records 호출 - year: ${year}, month: ${month}`);

  // 더미 데이터 반환 (API 연동 전 클라이언트 사전 테스트용)
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '월별 컨디션 그래프 조회에 성공했습니다.',
    result: {
      year,
      month,
      averageConditionScore: 4.2,
      averageVitalityScore: 4.1,
      averageSleepHours: 7.3,
      averageIntakeDaysCount: 6.5,
      records: [
        {
          recordId: 1,
          weekStartOn: '2026-05-04',
          weekEndOn: '2026-05-10',
          conditionScore: 2.4,
        },
        {
          recordId: 2,
          weekStartOn: '2026-05-11',
          weekEndOn: '2026-05-17',
          conditionScore: 3.1,
        },
        {
          recordId: 3,
          weekStartOn: '2026-05-18',
          weekEndOn: '2026-05-24',
          conditionScore: 4.0,
        },
        {
          recordId: 4,
          weekStartOn: '2026-05-25',
          weekEndOn: '2026-05-31',
          conditionScore: 3.8,
        },
        {
          recordId: 5,
          weekStartOn: '2026-06-01',
          weekEndOn: '2026-06-07',
          conditionScore: 5.0,
        },
      ],
    },
  };
};
