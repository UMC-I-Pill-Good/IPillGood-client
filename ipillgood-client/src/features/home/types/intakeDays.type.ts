import { CommonResponse } from '@/shared/types';

export type ProductType = {
  activeProductId: number;
  productId: number;
  productName: string;
  takenAt: string;
};

export type IntakeDaysType = {
  date: string;
  takenCount: number;
  products: ProductType[];
};

export type IntakeDaysResponseType = CommonResponse<IntakeDaysType>;
