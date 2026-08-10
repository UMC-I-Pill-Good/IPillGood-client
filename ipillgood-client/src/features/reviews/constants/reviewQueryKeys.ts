export const reviewQueryKeys = {
  product: (productId: number) => ['review-product', productId] as const,
  productReviews: (productId: number) => ['product-reviews', productId] as const,
};
