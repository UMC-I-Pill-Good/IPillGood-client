import {
  MOCK_RANKING_AD_CLAIM_RISK_INGREDIENT_LIST,
  MOCK_RANKING_RESPONSE,
} from '../mocks/rankingMock';
import type { RankingProductDetailApiResponse } from '../types/ranking';

export const getRankingProductDetail = async (
  productId: number,
): Promise<RankingProductDetailApiResponse> => {
  const productList = MOCK_RANKING_RESPONSE.result?.products ?? [];
  const product =
    productList.find((rankingProduct) => rankingProduct.productId === productId) ?? productList[0];

  if (!product) {
    return {
      isSuccess: false,
      code: 'RANKING_PRODUCT_NOT_FOUND',
      message: '영양제 정보를 찾을 수 없습니다.',
      result: null,
    };
  }

  const ingredientNameList =
    product.ingredientName.length >= 2
      ? product.ingredientName
      : [...product.ingredientName, '상세 확인용 부원료'];

  // TODO: 영양제 상세 API 연결 시 서버 응답으로 교체
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '영양제 상세 조회에 성공했습니다.',
    result: {
      productId,
      productName: product.productName,
      brand: product.brand,
      imageUrl: product.imageUrl,
      description: '텍스트',
      purchaseUrl: 'https://example.com/products/' + productId,
      mfdsCertified: product.mfdsCertified,
      ratingAverage: product.ratingAverage,
      reviewCount: product.reviewCount,
      inCabinet: false,
      ingredients: ingredientNameList.map((ingredientName, index) => ({
        ingredientId: productId * 100 + index,
        name: ingredientName,
        description: '건강 유지에 도움을 줄 수 있습니다.',
        imageKey: product.imageUrl ?? '',
        effectKeywords: product.ingredientTags,
        adClaimRisk: false,
      })),
      adClaimRiskIngredients: MOCK_RANKING_AD_CLAIM_RISK_INGREDIENT_LIST,
    },
  };
};
