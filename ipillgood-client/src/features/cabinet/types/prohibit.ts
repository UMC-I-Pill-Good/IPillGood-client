import { CommonResponse } from '@/shared/types';

export type ProductConflict = {
  type: string;
  currentIngredientId: number;
  currentIngredientName: string;
  purchaseProductIngredientId: number;
  purchaseIngredientName: string;
  reason: string;
};

export type ResponseProductConflicts = CommonResponse<{
  productId: number;
  purchaseUrl: string;
  hasConflict: boolean;
  conflicts: ProductConflict[];
}>;
