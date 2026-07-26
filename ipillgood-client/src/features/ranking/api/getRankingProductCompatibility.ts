import type { RankingProductCompatibilityApiResponse } from '../types/ranking';

export const getRankingProductCompatibility = async (
  productId: number,
): Promise<RankingProductCompatibilityApiResponse> => {
  // TODO: 보유 영양제 조합 API 연결 후 실제 궁합 응답으로 교체
  return {
    isSuccess: false,
    code: 'COMPATIBILITY_API_NOT_CONNECTED',
    message: `상품 ${productId}의 보유 영양제 궁합 API가 연결되지 않았습니다.`,
    result: null,
  };
};
