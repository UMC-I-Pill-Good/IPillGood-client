import { MOCK_RANKING_RESPONSE } from '../mocks/rankingMock';
import type { RankingProductDetailApiResponse } from '../types/ranking';

export const getRankingProductDetail = async (
  productId: number,
): Promise<RankingProductDetailApiResponse> => {
  const product = MOCK_RANKING_RESPONSE.result?.products.find(
    (rankingProduct) => rankingProduct.productId === productId,
  );

  if (!product) {
    return {
      isSuccess: false,
      code: 'RANKING_PRODUCT_NOT_FOUND',
      message: '영양제 정보를 찾을 수 없습니다.',
      result: null,
    };
  }

  // TODO: 영양제 상세 API 연결 시 서버 응답으로 교체
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '영양제 상세 조회에 성공했습니다.',
    result: {
      productId: product.productId,
      productName: product.productName,
      brand: product.brand,
      thumbnailIngredientImageKey: product.imageUrl,
      description: '텍스트',
      purchaseUrl: 'https://example.com/products/' + product.productId,
      mfdsCertified: product.mfdsCertified,
      ratingAverage: product.ratingAverage,
      reviewCount: product.reviewCount,
      inCabinet: false,
      ingredients: product.ingredientName.map((ingredientName, index) => ({
        ingredientId: product.productId * 100 + index,
        name: ingredientName,
        description: '건강 유지에 도움을 줄 수 있습니다.',
        imageKey: product.imageUrl ?? '',
        effectKeywords: product.ingredientTags,
        adClaimRisk: false,
      })),
      adClaimRiskIngredients: [],
    },
  };
};
