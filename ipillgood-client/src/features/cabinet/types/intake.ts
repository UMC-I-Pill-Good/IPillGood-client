import { CommonResponse } from '@/shared/types';

export type IntakeConflict = {
  combinationType: string;
  currentIngredientId: number;
  currentIngredientName: string;
  targetIngredientId: number;
  targetIngredientName: string;
  reason: string;
};

export type ResponseIntakeConflicts = CommonResponse<{
  hasConflicts: boolean;
  conflicts: IntakeConflict[];
}>;
