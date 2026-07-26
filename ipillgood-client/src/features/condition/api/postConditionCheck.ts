import {
  type ConditionCheckRequest,
  type ConditionCheckResponse,
} from '../types/condition';

/**
 * 주간 컨디션 체크 저장 (POST /api/v1/conditions/weekly-records)
 */
export const postConditionCheck = async (
  data: ConditionCheckRequest,
): Promise<ConditionCheckResponse> => {
  console.log('API POST /api/v1/conditions/weekly-records 전송 데이터:', data);

  // 더미 데이터 반환 (API 연동 전 클라이언트 사전 테스트용)
  return {
    isSuccess: true,
    code: 'SUCCESS201_1',
    message: '주간 컨디션 체크 저장에 성공했습니다.',
    result: {
      recordId: 1,
      weekStartOn: '2026-07-20',
      weekEndOn: '2026-07-26',
      checkedOn: '2026-07-26',
      vitalityScore: data.vitalityScore,
      sleepHours: data.sleepHours,
      sleepMinutes: data.sleepMinutes,
      sleepScore: 5,
      intakeDaysCount: 6,
      intakeScore: 5,
      conditionScore: 4.67,
    },
  };
};
