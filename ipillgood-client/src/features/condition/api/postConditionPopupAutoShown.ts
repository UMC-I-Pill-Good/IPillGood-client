import { type ConditionPopupAutoShownResponse } from '../types/condition';

/**
 * 컨디션 팝업 자동 노출 기록 (POST /api/v1/conditions/popup-logs/auto-shown)
 */
export const postConditionPopupAutoShown = async (): Promise<ConditionPopupAutoShownResponse> => {
  console.log('API POST /api/v1/conditions/popup-logs/auto-shown 호출');

  // 더미 데이터 반환 (API 연동 전 클라이언트 사전 테스트용)
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '컨디션 팝업 자동 노출 기록에 성공했습니다.',
    result: {
      popupLogId: 1,
      weekStartOn: '2026-07-20',
      autoShownAt: '2026-07-26T09:00:00',
    },
  };
};
