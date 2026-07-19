export type RankingGender = 'M' | 'F';

export type RankingApiSort = 'POPULAR' | 'PRICE_HIGH' | 'PRICE_LOW';

export type RankingUiSort = 'REVIEW_COUNT' | 'RATING';

export interface RankingQueryParams {
  ageGroup?: string;
  gender?: RankingGender;
  intakeType?: string;
  ingredientId?: number;
  healthConcern?: string;
  sort?: RankingApiSort;
  page?: number;
  size?: number;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T | null;
}

export interface RankingItemDto {
  rank: number;
  productId: number;
  brand: string | null;
  productName: string;
  imageUrl: string | null;
  rating: number;
  reviewCount: number;
  price: number;
  ingredientTags: string[] | null;
}

export interface RankingResultDto {
  hasNext: boolean;
  items: RankingItemDto[];
}

export type RankingApiResponse = ApiResponse<RankingResultDto>;

export interface RankingErrorResponse {
  isSuccess: false;
  code: string;
  message: string;
  result: null;
}
