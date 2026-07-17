export type RecommendedSupplementItemType = {
  rankNo: number;
  ingredientId: number;
  ingredientName: string;
  reason: string;
  imageUrl: string;
  tags: string[];
  recommendedDosageText: string;
  recommendedTimeText: string;
  warningText: string | null;
};

export type RecommendationResultType = {
  recommendationBatchId: number;
  status: string;
  healthSummary: string;
  recommendations: RecommendedSupplementItemType[];
};
