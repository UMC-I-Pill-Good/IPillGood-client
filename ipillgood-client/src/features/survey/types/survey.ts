import { CommonResponse } from '@/shared/types';

export type DateValue = {
  year: number;
  month: number;
  day: number;
};

export type RequestSurveyInfo = {
  submissionType: 'INITIAL' | 'REVISION';
  birthYear: number;
  gender: 'MALE' | 'FEMALE';
  jobType: string;
  menstrualCycleDays: number;
  lastPeriodStartedOn: string;
  smokingStatus: string;
  drinkingStatus: string;
  dietType: string;
  exerciseFrequency: string;
  pregnant: boolean;
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
