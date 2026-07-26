import type { StaticImageData } from 'next/image';

export type CabinetItem = {
  id: number;
  image: StaticImageData;
  name: string;
  isTaking: boolean;
  isCertified: boolean;
};
