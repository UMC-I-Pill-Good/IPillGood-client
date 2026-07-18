import { type ConditionWeekDetailResponse } from '../types/condition';

/**
 * 특정 주차 컨디션 상세 조회 (GET /conditions/{weekStartDate})
 * @param weekStartDate 조회할 주의 시작일 (예: "2026-05-25")
 */
export const getConditionWeekDetail = async (
  weekStartDate: string,
): Promise<ConditionWeekDetailResponse> => {
  console.log('API GET /conditions/' + weekStartDate + ' 호출');

  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '요청이 성공적으로 처리되었습니다.',
    result: {
      weekStartDate,
      weekEndDate: '2026-05-31',
      conditionScore: 4,
      avgSleepHours: 4.5,
      intakeCompletedDays: 3,
      intakeTotalDays: 7,
    },
  };
};
