export type AgeGroup = 'TEENS' | 'TWENTIES' | 'THIRTIES' | 'FORTIES' | 'FIFTIES_AND_ABOVE';

export type Gender = 'MALE' | 'FEMALE';

export const AGE_GROUP_LABEL = {
  TEENS: '10대',
  TWENTIES: '20대',
  THIRTIES: '30대',
  FORTIES: '40대',
  FIFTIES_AND_ABOVE: '50대 이상',
} as const satisfies Record<AgeGroup, string>;

export const GENDER_LABEL = {
  MALE: '남성',
  FEMALE: '여성',
} as const satisfies Record<Gender, string>;
