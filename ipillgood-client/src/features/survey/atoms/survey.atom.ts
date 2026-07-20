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
