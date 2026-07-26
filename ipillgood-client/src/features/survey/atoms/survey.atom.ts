import { atom } from 'jotai';

export const genderAtom = atom<'woman' | 'man' | null>(null);

export const birthYearAtom = atom(2026);

export const selectedJobAtom = atom('');

export const periodAtom = atom(30);

export const selectedDateAtom = atom({
  year: 2026,
  month: 7,
  day: 17,
});

export const lifestyleAtom = atom<Record<string, string>>({
  smoking: '비흡연',
  drinking: '비음주',
  eating: '혼합',
  workout: '거의 안 함',
});
