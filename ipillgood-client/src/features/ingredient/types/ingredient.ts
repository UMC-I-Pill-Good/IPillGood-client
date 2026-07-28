export type CombinationSafetyType = 'CAUTION' | 'GOOD';

export type ContraindicatedCombinationType = {
  targetIngredientId: number;
  targetIngredientName: string;
  type: CombinationSafetyType;
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
  alternativeFoods: AlternativeFoodType[];
};
