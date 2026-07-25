export type RankingGender = 'MALE' | 'FEMALE';

export type RankingAgeGroup = 'TEENS' | 'TWENTIES' | 'THIRTIES' | 'FORTIES' | 'FIFTIES_AND_ABOVE';

export type HealthConcernMajorCategory =
  | 'NERVOUS_SYSTEM'
  | 'SENSORY_SYSTEM'
  | 'DIGESTIVE_METABOLISM'
  | 'ENDOCRINE_SYSTEM'
  | 'CARDIOVASCULAR_SYSTEM'
  | 'IMMUNE_SYSTEM'
  | 'MUSCULAR_SYSTEM'
  | 'REPRODUCTIVE_URINARY_SYSTEM';

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

export type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T | null;
};

export type ProductSearchItemDto = {
  productId: number;
  productName: string;
  brand: string;
  imageUrl: string | null;
  mfdsCertified: boolean;
  ingredientName: string[];
  ratingAverage: number | null;
  reviewCount: number;
  ingredientTags: string[];
};

export type RankingResultDto = {
  keyword: string | null;
  products: ProductSearchItemDto[];
  size: number;
  totalElements: number;
  hasNext: boolean;
  nextCursor: string | null;
};

export type RankingApiResponse = ApiResponse<RankingResultDto>;

export type IngredientSummary = {
  ingredientId: number;
  name: string;
  description: string;
  imageKey: string;
  effectKeywords: string[];
};

export type ProductIngredient = IngredientSummary & {
  adClaimRisk: boolean;
};

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
  inCabinet: boolean;
  ingredients: ProductIngredient[];
  adClaimRiskIngredients: IngredientSummary[];
};

export type RankingProductDetailApiResponse = ApiResponse<RankingProductDetailDto>;

export type RankingProductIngredientsDto = {
  productId: number;
  ingredientCount: number;
  ingredients: IngredientSummary[];
};

export type RankingProductIngredientsApiResponse = ApiResponse<RankingProductIngredientsDto>;

export type CombinationType = 'GOOD' | 'CAUTION';
export type CompatibilityItem = {
  targetIngredientId: number;
  targetIngredientName: string;
  type: CombinationType;
};
export type RankingProductCompatibilityDto = {
  productId: number;
  ownedProductCount: number;
  goodCombinations: CompatibilityItem[];
  cautionCombinations: CompatibilityItem[];
};
export type RankingProductCompatibilityApiResponse = ApiResponse<RankingProductCompatibilityDto>;
