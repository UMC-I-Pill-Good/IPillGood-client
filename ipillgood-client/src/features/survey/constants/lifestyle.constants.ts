import { ConceiveIcon, DrinkingIcon, EatingHabitIcon, SmokingIcon, WorkOutIcon } from '@/assets';

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
] as const;

export const LIFESTYLE_VALUE_MAP = {
  smoking: {
    비흡연: 'NONE',
    '과거 흡연': 'PAST',
    '현재 흡연': 'CURRENT',
  },
  drinking: {
    비음주: 'NONE',
    '가끔 마심': 'OCCASIONAL',
    '자주 마심': 'FREQUENT',
  },
  eating: {
    혼합: 'MIXED',
    '채식 위주': 'VEGETARIAN',
    '육식 위주': 'MEAT_BASED',
  },
  workout: {
    '거의 안 함': 'RARELY',
    '주 1-2회': 'WEEK_1_2',
    '주 3회 이상': 'WEEK_3_PLUS',
  },
} as const;
