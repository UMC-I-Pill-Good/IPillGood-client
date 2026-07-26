import magnesium from '@/assets/images/magnesium.png';
import { CabinetItem } from '../types/cabinet';

export const cabinetItems: CabinetItem[] = [
  { id: 1, image: magnesium, name: '마그네슘', isTaking: true, isCertified: false },
  { id: 2, image: magnesium, name: '루테인', isTaking: true, isCertified: true },
  { id: 3, image: magnesium, name: '비타민D', isTaking: false, isCertified: false },
  { id: 4, image: magnesium, name: '오메가3', isTaking: false, isCertified: false },
  { id: 5, image: magnesium, name: '아연', isTaking: false, isCertified: false },
  { id: 6, image: magnesium, name: '엽산', isTaking: true, isCertified: true },
  { id: 7, image: magnesium, name: '프로바이오틱스', isTaking: false, isCertified: true },
];
