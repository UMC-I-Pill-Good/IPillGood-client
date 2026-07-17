import { ConceiveIcon, DrinkingIcon, EatingHabitIcon, SmokingIcon, WorkOutIcon } from '@/assets';

// 2026 ~ 1970
export const birthYearOptions = Array.from({ length: 2026 - 1970 + 1 }, (_, i) => 2026 - i);

// 10 ~ 50
export const periodOptions = Array.from({ length: 50 - 10 + 1 }, (_, i) => 10 + i);

export const jobOptions = ['사무직', '전문직', '서비스직', '생산/기술직', '자영업', '학생', '주부'];

export const yearOptions = Array.from({ length: 2026 - 1970 + 1 }, (_, i) => 2026 - i).reverse();
export const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

export const lifestyleOptions = [
  {
    id: 'smoking',
    title: '흡연 여부',
    icon: SmokingIcon,
    options: ['비흡연', '과거 흡연', '현재 흡연'],
    required: true,
  },
  {
    id: 'drinking',
    title: '음주 여부',
    icon: DrinkingIcon,
    options: ['비음주', '가끔 마심', '자주 마심'],
    required: true,
  },
  {
    id: 'eating',
    title: '식습관',
    icon: EatingHabitIcon,
    options: ['혼합', '채식 위주', '육식 위주'],
    required: true,
  },
  {
    id: 'workout',
    title: '운동 빈도',
    icon: WorkOutIcon,
    options: ['거의 안 함', '주 1-2회', '주 3회 이상'],
    required: true,
  },
  {
    id: 'conceive',
    title: '임신 여부',
    icon: ConceiveIcon,
    options: ['아니요', '예'],
    required: false,
  },
];
