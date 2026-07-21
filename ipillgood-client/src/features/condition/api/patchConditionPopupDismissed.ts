import { type ConditionPopupDismissedResponse } from '../types/condition';

/**
 * 컨디션 팝업 닫힘 기록 (PATCH /api/v1/conditions/popup-logs/current-week/dismissed)
 */
export const patchConditionPopupDismissed = async (): Promise<ConditionPopupDismissedResponse> => {
  console.log('API PATCH /api/v1/conditions/popup-logs/current-week/dismissed 호출');

  // 더미 데이터 반환 (API 연동 전 클라이언트 사전 테스트용)
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '컨디션 팝업 닫힘 기록에 성공했습니다.',
    result: {
      popupLogId: 1,
      weekStartOn: '2026-07-20',
      dismissedAt: '2026-07-26T09:05:00',
    },
  };
};
