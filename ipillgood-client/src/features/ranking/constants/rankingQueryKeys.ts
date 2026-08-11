export const rankingQueryKeys = {
  products: () => ['rankingProducts'] as const,
  productDetail: (productId: number) => ['ranking-product-detail', productId] as const,
};
