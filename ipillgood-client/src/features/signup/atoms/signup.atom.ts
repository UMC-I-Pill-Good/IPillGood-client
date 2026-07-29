import { atom } from 'jotai';

export const isIdDuplicatedAtom = atom(false);

export const emailDuplicatedAtom = atom<string | null>(null);
