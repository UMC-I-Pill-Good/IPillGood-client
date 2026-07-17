import { ConceiveIcon, DrinkingIcon, EatingHabitIcon, SmokingIcon, WorkOutIcon } from '@/assets';

// 2026 ~ 1970
export const birthYearOptions = Array.from({ length: 2026 - 1970 + 1 }, (_, i) => 2026 - i);

// 10 ~ 50
export const periodOptions = Array.from({ length: 50 - 10 + 1 }, (_, i) => 10 + i);

export const jobOptions = ['사무직', '전문직', '서비스직', '생산/기술직', '자영업', '학생', '주부'];

export const yearOptions = Array.from({ length: 2026 - 1970 + 1 }, (_, i) => 2026 - i).reverse();
export const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
