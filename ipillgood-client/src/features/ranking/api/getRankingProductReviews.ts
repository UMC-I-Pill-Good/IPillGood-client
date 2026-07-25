import {
  MOCK_EMPTY_RANKING_REVIEW_PRODUCT_ID,
  MOCK_RANKING_REVIEWS,
} from '../mocks/rankingReviewMock';
import type {
  RankingReviewApiResponse,
  RankingReviewQuery,
} from '../types/rankingReview';

export const getRankingProductReviews = async ({
  productId,
  sort = 'LATEST',
  size = 20,
}: RankingReviewQuery): Promise<RankingReviewApiResponse> => {
  const sourceReviews = productId === MOCK_EMPTY_RANKING_REVIEW_PRODUCT_ID ? [] : MOCK_RANKING_REVIEWS;
  const reviews = [...sourceReviews]
    .sort((a, b) => (sort === 'LATEST' ? b.reviewId - a.reviewId : b.helpfulCount - a.helpfulCount))
    .slice(0, size);

  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '상품 후기 목록 조회에 성공했습니다.',
    result: {
      productId,
      reviewCount: reviews.length,
      ratingAverage: 5,
      reviews,
      size,
      nextCursor: '',
      sort,
      hasNext: false,
    },
  };
};
