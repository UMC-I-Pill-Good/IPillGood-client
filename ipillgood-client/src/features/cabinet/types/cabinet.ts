import type { StaticImageData } from 'next/image';

export interface CabinetItem {
  id: number;
  image: StaticImageData;
  name: string;
}
