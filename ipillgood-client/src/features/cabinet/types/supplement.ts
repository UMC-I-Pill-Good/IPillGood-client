import { StaticImageData } from 'next/image';

export type SupplementItem = {
  id: number;
  name: string;
  company: string;
  image: StaticImageData | string;
  rating: number;
  reviewCount: number;
  ingredient: string;
  isOwned: boolean;
};

export type DraftFilters = {
  ageGroup: string;
  gender: string | undefined;
  certification: string;
  healthConcern: string | null;
};
