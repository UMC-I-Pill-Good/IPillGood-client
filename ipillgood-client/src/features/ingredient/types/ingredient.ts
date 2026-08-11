import { CommonResponse } from '@/shared/types';

export type ContraindicatedCombinationType = {
  targetIngredientId: number;
  targetIngredientName: string;
  type: 'CAUTION';
  reason: string | null;
};

export type AlternativeFoodType = {
  name: string;
  contentPer100g: string;
};

export type IngredientDetailType = {
  ingredientId: number;
  name: string;
  description: string;
  imageUrl: string;
  effects: string[];
  cautions: string[];
  contraindicatedCombinations: ContraindicatedCombinationType[];
  recommendedIntake: string | null;
  recommendedIntakeTime: string | null;
  hasCabinetProduct: boolean;
  hasIntakeProduct: boolean;
  alternativeFoods: AlternativeFoodType[];
};

export type IngredientDetailResponseType = CommonResponse<IngredientDetailType>;
