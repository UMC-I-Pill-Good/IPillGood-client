import { createMockRankingProductCompatibility } from '../mocks/rankingMock';
import type { RankingProductCompatibilityApiResponse } from '../types/ranking';

export const getRankingProductCompatibility = async (
  productId: number,
): Promise<RankingProductCompatibilityApiResponse> => {
  // TODO: 보유 영양제 조합 API 연결 후 서버 응답으로 교체
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '보유 영양제 궁합 조회에 성공했습니다.',
    result: createMockRankingProductCompatibility(productId),
  };
};
