import { CommonResponse } from '@/shared/types';
import type { StaticImageData } from 'next/image';

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
