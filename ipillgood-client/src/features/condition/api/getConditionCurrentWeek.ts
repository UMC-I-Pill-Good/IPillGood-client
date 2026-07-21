import { type ConditionCurrentWeekResponse } from '../types/condition';

/**
 * 이번 주 컨디션 체크 상태 조회 (GET /api/v1/conditions/current-week)
 */
export const getConditionCurrentWeek = async (): Promise<ConditionCurrentWeekResponse> => {
  console.log('API GET /api/v1/conditions/current-week 호출');

  // 더미 데이터 반환 (API 연동 전 클라이언트 사전 테스트용)
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '이번 주 컨디션 체크 상태 조회에 성공했습니다.',
    result: {
      today: '2026-07-26',
      weekStartOn: '2026-07-20',
      weekEndOn: '2026-07-26',
      isSunday: true,
      checkAvailable: true,
      checked: false,
      recordId: null,
      autoPopupAvailable: true,
      autoShownAt: null,
      dismissedAt: null,
      sundayIntakeWarningRequired: true,
    },
  };
};
