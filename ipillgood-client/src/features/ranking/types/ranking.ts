import type { ApiResponse, Gender } from '@/shared/types';

export type RankingGender = Gender;

export type RankingAgeGroup = 'TEENS' | 'TWENTIES' | 'THIRTIES' | 'FORTIES' | 'FIFTIES_PLUS';

export type HealthConcernMajorCategory =
  | 'NERVOUS_SYSTEM'
  | 'SENSORY_SYSTEM'
  | 'DIGESTIVE_METABOLIC'
  | 'ENDOCRINE'
  | 'CARDIOVASCULAR'
  | 'IMMUNE_SYSTEM'
  | 'MUSCULOSKELETAL'
  | 'REPRODUCTIVE_URINARY';

export type RankingApiSort = 'REVIEW_COUNT' | 'RATING';

export type RankingUiSort = RankingApiSort;

export type RankingQueryParams = {
  keyword?: string;
  sort?: RankingApiSort;
  ageGroups?: RankingAgeGroup[];
  gender?: RankingGender;
  mfdsCertified?: boolean;
  healthConcernMajorCategories?: HealthConcernMajorCategory[];
  ingredientIds?: number[];
  size?: number;
  cursor?: string;
};

export type ProductSearchItemDto = {
  productId: number;
  productName: string;
  brand: string;
  imageUrl: string | null;
  mfdsCertified: boolean;
  ingredientNames: string[];
  averageRating: number | null;
  reviewCount: number;
};

export type RankingResultDto = {
  keyword: string | null;
  products: ProductSearchItemDto[];
  size: number;
  totalCount: number;
  hasNext: boolean;
  nextCursor: string | null;
};

export type RankingApiResponse = ApiResponse<RankingResultDto>;

export type IngredientSummary = {
  ingredientId: number;
  name: string;
  description: string;
  imageUrl: string;
  effectKeywords: string[];
};

export type ProductIngredient = IngredientSummary;

export type RankingProductDetailDto = {
  productId: number;
  productName: string;
  brand: string;
  imageUrl: string | null;
  description: string;
  purchaseUrl: string;
  mfdsCertified: boolean;
  ratingAverage: number | null;
  reviewCount: number;
  adClaimRisk: boolean;
  adClaimRiskIngredients: string[];
};

export type RankingProductDetailApiResponse = ApiResponse<RankingProductDetailDto>;

export type RankingProductIngredientsDto = {
  productId: number;
  ingredientCount: number;
  ingredientInfos: ProductIngredient[];
};

export type RankingProductIngredientsApiResponse = ApiResponse<RankingProductIngredientsDto>;

export type CompatibilityItem = {
  targetIngredientId: number;
  targetIngredientName: string;
};
export type RankingProductCompatibilityDto = {
  productId: number;
  ownedProductCount: number;
  goodCombinations: CompatibilityItem[];
  cautionCombinations: CompatibilityItem[];
};
export type RankingProductCompatibilityApiResponse = ApiResponse<RankingProductCompatibilityDto>;

export type ProductPurchaseConflict = {
  type: 'CAUTION';
  currentIngredientId: number;
  currentIngredientName: string;
  purchaseProductIngredientId: number;
  purchaseIngredientName: string;
  reason: string;
};

export type ProductPurchaseCheckDto = {
  productId: number;
  purchaseUrl: string;
  hasConflict: boolean;
  conflicts: ProductPurchaseConflict[];
};

export type ProductPurchaseCheckApiResponse = ApiResponse<ProductPurchaseCheckDto>;
