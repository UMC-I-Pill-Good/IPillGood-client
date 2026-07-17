import { atom } from 'jotai';

export const genderAtom = atom<'woman' | 'man' | null>(null);
