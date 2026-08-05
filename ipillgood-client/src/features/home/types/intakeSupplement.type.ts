import { CommonResponse } from '@/shared/types';

export type ActiveProductType = {
  activeProductId: number;
  memberProductId: number;
  productId: number;
  productName: string;
  thumbnailImageUrl: string;
};

export type ActiveProductsType = {
  totalCount: number;
  activeProducts: ActiveProductType[];
};

export type ActiveProductsResponseType = CommonResponse<ActiveProductsType>;
