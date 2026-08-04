import { CommonResponse } from '@/shared/types';

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
