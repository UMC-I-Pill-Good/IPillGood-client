import { type ConditionWeekDetailResponse } from '../types/condition';

/**
 * 전달받은 YYYY-MM-DD 주 시작일로부터 6일 후의 주 종료일을 계산합니다.
 */
const calculateWeekEndDate = (startDateStr: string): string => {
  try {
    const date = new Date(startDateStr);
    if (isNaN(date.getTime())) {
      return '2026-05-31';
    }
    date.setDate(date.getDate() + 6);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return '2026-05-31';
  }
};

/**
 * 특정 주차 컨디션 상세 조회 (GET /conditions/{weekStartDate})
 * @param weekStartDate 조회할 주의 시작일 (예: "2026-05-25")
 */
export const getConditionWeekDetail = async (
  weekStartDate: string,
): Promise<ConditionWeekDetailResponse> => {
  console.log('API GET /conditions/' + weekStartDate + ' 호출');

  const weekEndDate = calculateWeekEndDate(weekStartDate);

  // 더미 데이터 반환 (API 연동 전 클라이언트 사전 테스트용)
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '요청이 성공적으로 처리되었습니다.',
    result: {
      weekStartDate,
      weekEndDate,
      conditionScore: 4,
      avgSleepHours: 4.5,
      intakeCompletedDays: 3,
      intakeTotalDays: 7,
    },
  };
};
