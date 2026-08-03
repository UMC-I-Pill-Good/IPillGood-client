import { CommonResponse } from '@/shared/types';

type Ingredient = {
  ingredientId: number;
  name: string;
  imageUrl: string;
};

export type ResponseIngredients = CommonResponse<{
  ingredients: Ingredient[];
}>;

export type ContraindicationItem = {
  contraindicationId: number;
  conditionName: string;
};

export type ContraindicationGroup = {
  type: 'UNDERLYING_DISEASE' | 'MEDICATION' | 'ALLERGY';
  label: string;
  items: ContraindicationItem[];
};

export type ResponseContraindications = CommonResponse<{
  groups: ContraindicationGroup[];
}>;
