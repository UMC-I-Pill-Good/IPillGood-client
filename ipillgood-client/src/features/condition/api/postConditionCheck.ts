import {
  type ConditionCheckRequest,
  type ConditionCheckResponse,
} from '../types/condition';

/**
 * 이번 주 컨디션 체크 제출 (POST /conditions)
 */
export const postConditionCheck = async (
  data: ConditionCheckRequest,
): Promise<ConditionCheckResponse> => {
  console.log('API POST /conditions 전송 데이터:', data);

  return {
    isSuccess: true,
    code: 'SUCCESS201_1',
    message: '컨디션 체크가 성공적으로 저장되었습니다.',
    result: {
      conditionCheckId: Date.now(),
      weekStartDate: new Date().toISOString().split('T')[0] ?? '2026-07-18',
      sleepScore: 4,
      intakeDays: 5,
      intakeScore: 4,
      conditionScore: data.conditionScore,
      completedAt: new Date().toISOString(),
    },
  };
};
