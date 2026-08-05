import { CommonResponse } from '@/shared/types';

export type SortOption = '후기 많은 순' | '평점 높은 순';

export type ProductItem = {
  memberProductId: number;
  productId: number;
  productName: string;
  thumbnailImageUrl: string;
  mfdsCertified: boolean;
  isActiveIntake: boolean;
  activeProductId: number | null;
  addedAt: string;
};

export type ResponseCabinetProducts = CommonResponse<{
  memberNickname: string;
  totalCount: number;
  products: ProductItem[];
}>;

export type SearchProductParams = {
  keyword: string | null;
  sort: 'REVIEW_COUNT_DESC' | 'RATING_DESC';
  page: number;
  size: number;
};

export type SearchProductItem = {
  productId: number;
  brand: string;
  productName: string;
  thumbnailImageUrl: string;
  averageRating: number;
  reviewCount: number;
  ingredientTags: string[];
  isOwned: boolean;
  isSelectable: boolean;
};

export type ResponseSearchProducts = CommonResponse<{
  keyword: string;
  sort: 'REVIEW_COUNT_DESC' | 'RATING_DESC';
  page: number;
  size: number;
  totalCount: number;
  hasNext: boolean;
  products: SearchProductItem[];
}>;

export type AddedProduct = {
  memberProductId: number;
  productId: number;
  brand: string;
  productName: string;
  thumbnailImageUrl: string;
  addedAt: string;
};

export type ResponseAddProducts = CommonResponse<{
  addedCount: number;
  addedProducts: AddedProduct[];
}>;

export type DeletedProduct = {
  memberProductId: number;
  productId: number;
  productName: string;
  wasActiveIntake: boolean;
  stoppedActiveProductId: number | null;
};

export type ResponseDeleteProducts = CommonResponse<{
  deletedCount: number;
  deletedProducts: DeletedProduct[];
}>;

export type ResponseCabinetProductDetail = CommonResponse<{
  memberProductId: number;
  productId: number;
  brand: string;
  productName: string;
  thumbnailImageUrl: string;
  isActiveIntake: boolean;
  hasMyReview: boolean;
  ingredients: {
    ingredientId: number;
    name: string;
    imageUrl: string;
    description: string;
    effectTags: string[];
  }[];
  activeProduct: {
    activeProductId: number;
    startedOn: string;
    intakeDayCount: number;
    notificationEnabled: boolean;
    intakeTime: string;
    frequency: string;
    frequencyLabel: string;
    frequencyIntervalDays: number;
    scheduleAnchorOn: string;
  };
}>;
