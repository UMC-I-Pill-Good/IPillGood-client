import { CommonResponse } from '@/shared/types';
import { LIFESTYLE_VALUE_MAP } from '../constants/lifestyle.constants';

export type DateValue = {
  year: number;
  month: number;
  day: number;
};

export type LifestyleState = {
  smoking: keyof typeof LIFESTYLE_VALUE_MAP.smoking;
  drinking: keyof typeof LIFESTYLE_VALUE_MAP.drinking;
  eating: keyof typeof LIFESTYLE_VALUE_MAP.eating;
  workout: keyof typeof LIFESTYLE_VALUE_MAP.workout;
  conceive?: '아니요' | '예';
};

export type RequestSurveyInfo = {
  submissionType: 'INITIAL' | 'REVISION';
  birthYear: number;
  gender: 'MALE' | 'FEMALE';
  jobType: string;
  menstrualCycleDays?: number;
  lastPeriodStartedOn?: string;
  smokingStatus: string;
  drinkingStatus: string;
  dietType: string;
  exerciseFrequency: string;
  pregnant?: boolean;
  underlyingDiseaseNone: boolean;
  medicationNone: boolean;
  allergyNone: boolean;
  currentIngredientNone: boolean;
  contraindicationIds: number[];
  onboardingConcernCodes: string[];
  currentIngredientIds: number[];
};

export type ResponseSurveyResult = CommonResponse<{
  surveyResponseId: number;
  recommendationId: number;
  recommendationStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  completedAt: string;
}>;
