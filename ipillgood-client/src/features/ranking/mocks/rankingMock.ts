import type { RankingApiResponse } from '../types/ranking';

// TODO: 랭킹 조회 API 구현 후 실제 API 호출 결과로 교체
export const MOCK_RANKING_RESPONSE: RankingApiResponse = {
  isSuccess: true,
  code: 'SUCCESS201_1',
  message: '요청이 성공적으로 처리되었습니다.',
  result: {
    hasNext: false,
    items: [
      {
        rank: 1,
        productId: 9001,
        brand: '종근당건강',
        productName: '알티지 오메가 3',
        imageUrl: null,
        rating: 4.8,
        reviewCount: 234,
        price: 22000,
        ingredientTags: ['오메가 3'],
        isCertified: true,
      },
      {
        rank: 2,
        productId: 9002,
        brand: '종근당건강',
        productName: '프로메가 오메가 3',
        imageUrl: null,
        rating: 4.7,
        reviewCount: 198,
        price: 19800,
        ingredientTags: ['오메가 3'],
      },
      {
        rank: 3,
        productId: 9003,
        brand: '뉴트리코어',
        productName: '식물성 알티지 오메가 3',
        imageUrl: null,
        rating: 4.9,
        reviewCount: 156,
        price: 27800,
        ingredientTags: ['오메가 3'],
      },
      {
        rank: 4,
        productId: 9004,
        brand: '뉴트리코어',
        productName: '데일리 오메가 3',
        imageUrl: null,
        rating: 4.5,
        reviewCount: 91,
        price: 16900,
        ingredientTags: ['오메가 3'],
      },
    ],
  },
};
