import { type ConditionWeekDetailResponse } from '../types/condition';

/**
 * 주차 상세 조회 (GET /api/v1/conditions/weekly-records/{recordId})
 * @param recordId 조회할 주간 컨디션 기록 ID
 */
export const getConditionWeekDetail = async (
  recordId: number,
): Promise<ConditionWeekDetailResponse> => {
  console.log('API GET /api/v1/conditions/weekly-records/' + recordId + ' 호출');

  // 더미 데이터 반환 (API 연동 전 클라이언트 사전 테스트용)
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '주차 상세 조회에 성공했습니다.',
    result: {
      recordId,
      weekStartOn: '2026-07-20',
      weekEndOn: '2026-07-26',
      checkedOn: '2026-07-26',
      vitalityScore: 4,
      sleepHours: 7,
      sleepMinutes: 30,
      sleepScore: 5,
      intakeDaysCount: 6,
      intakeScore: 5,
      conditionScore: 4.67,
    },
  };
};
