import { atomWithReset } from 'jotai/utils';
import { JobLabel } from '../constants/basicInfo.constants';
import { LifestyleState } from '../types/survey';

const getToday = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // getMonth()는 0부터 시작하니 +1
    day: now.getDate(),
  };
};

export const genderAtom = atomWithReset<'FEMALE' | 'MALE' | null>(null);
export const birthYearAtom = atomWithReset(2026);
export const selectedJobAtom = atomWithReset<JobLabel | ''>('');
export const periodAtom = atomWithReset(30);
export const selectedDateAtom = atomWithReset(getToday());

export const lifestyleAtom = atomWithReset<LifestyleState>({
  smoking: '비흡연',
  drinking: '비음주',
  eating: '혼합',
  workout: '거의 안 함',
});
