import {
  MOCK_EMPTY_REVIEW_PRODUCT_ID,
  MOCK_REVIEWS,
} from '../mocks/reviewMock';
import type { RankingReviewApiResponse, RankingReviewQuery } from '../types/review';

export const getProductReviews = async ({
  productId,
  sort = 'LATEST',
  size = 20,
  cursor,
}: RankingReviewQuery): Promise<RankingReviewApiResponse> => {
  const sourceReviews =
    productId === MOCK_EMPTY_REVIEW_PRODUCT_ID ? [] : MOCK_REVIEWS;
  const sortedReviews = [...sourceReviews].sort((a, b) =>
    sort === 'LATEST' ? b.reviewId - a.reviewId : b.helpfulCount - a.helpfulCount,
  );
  const startIndex = cursor ? Number(cursor) : 0;
  const safeStartIndex = Number.isSafeInteger(startIndex) && startIndex >= 0 ? startIndex : 0;
  const reviews = sortedReviews.slice(safeStartIndex, safeStartIndex + size);
  const nextIndex = safeStartIndex + reviews.length;
  const hasNext = nextIndex < sortedReviews.length;

  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '상품 후기 목록 조회에 성공했습니다.',
    result: {
      productId,
      reviewCount: sortedReviews.length,
      ratingAverage: 5,
      reviews,
      size,
      nextCursor: hasNext ? String(nextIndex) : '',
      sort,
      hasNext,
    },
  };
};
