import { atomWithReset } from 'jotai/utils';
import { JobLabel } from '../constants/basicInfo.constants';
import { LifestyleState } from '../types/survey';
import { HealthConcernCode } from '../constants/healthConcern.constants';

const getToday = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // getMonth()는 0부터 시작하니 +1
    day: now.getDate(),
  };
};

// 기본 정보
export const genderAtom = atomWithReset<'FEMALE' | 'MALE' | null>(null);
export const birthYearAtom = atomWithReset(2026);
export const selectedJobAtom = atomWithReset<JobLabel | ''>('');
export const periodAtom = atomWithReset(30);
export const selectedDateAtom = atomWithReset(getToday());

// 생활 습관
export const lifestyleAtom = atomWithReset<LifestyleState>({
  smoking: '비흡연',
  drinking: '비음주',
  eating: '혼합',
  workout: '거의 안 함',
  conceive: '아니요',
});

// 건강 상태
export const healthStateAtom = atomWithReset<Record<string, number[]>>({
  UNDERLYING_DISEASE: [],
  MEDICATION: [],
  ALLERGY: [],
});

// 건강 고민
export const healthConcernAtom = atomWithReset<HealthConcernCode[]>([]);

// 섭취 중인 영양제
export const selectedIngredientItemsAtom = atomWithReset<string[]>([]); // 선택된 영양제 ID별 항목 이름
export const currentIngredientIdsAtom = atomWithReset<number[]>([]); // 선택된 영양제 ID
