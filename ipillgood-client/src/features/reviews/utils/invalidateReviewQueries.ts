import type { QueryClient } from '@tanstack/react-query';

import { rankingQueryKeys } from '@/features/ranking/constants/rankingQueryKeys';

import { reviewQueryKeys } from '../constants/reviewQueryKeys';

export const invalidateReviewQueries = async (queryClient: QueryClient, productId: number) => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: reviewQueryKeys.productReviews(productId) }),
    queryClient.invalidateQueries({ queryKey: reviewQueryKeys.product(productId) }),
    queryClient.invalidateQueries({ queryKey: rankingQueryKeys.productDetail(productId) }),
    queryClient.invalidateQueries({ queryKey: rankingQueryKeys.products() }),
  ]);
};
