import { CommonResponse } from '@/shared/types';
import type { StaticImageData } from 'next/image';

export type SortOption = '후기 많은 순' | '평점 높은 순';

export type CabinetItem = {
  id: number;
  image: string | StaticImageData;
  name: string;
  isTaking: boolean;
  activeProductId: number | null;
};

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
