import { getProductReviews } from './getProductReviews';
import type { RankingReviewItem } from '../types/review';

const REVIEW_PAGE_SIZE = 20;

export const getReviewById = async (
  productId: number,
  reviewId: number,
): Promise<RankingReviewItem | null> => {
  let cursor: string | undefined;
  const visitedCursorSet = new Set<string>();

  while (true) {
    const response = await getProductReviews({
      productId,
      size: REVIEW_PAGE_SIZE,
      cursor,
    });
    const result = response.result;

    if (!response.isSuccess || !result) return null;

    const review = result.reviews.find((item) => item.reviewId === reviewId);
    if (review) {
      if (review.imageKeys.length !== review.imageUrls.length) {
        throw new Error('후기 이미지 표시 정보를 불러올 수 없습니다.');
      }

      return review;
    }

    const nextCursor = result.nextCursor || undefined;
    if (!result.hasNext || !nextCursor || visitedCursorSet.has(nextCursor)) return null;

    visitedCursorSet.add(nextCursor);
    cursor = nextCursor;
  }
};
