import { CommonResponse } from '@/shared/types';

export type RequestIntakeProduct = {
  memberProductId: number;
  intakeTime: string;
  frequency: string;
};

export type ResponseIntakeProduct = CommonResponse<{
  activeProductId: number;
  memberProductId: number;
  productId: number;
  productName: string;
  thumbnailImageUrl: string;
  notificationEnabled: boolean;
  intakeTime: string;
  frequency: string;
  frequencyLabel: string;
}>;

export type RequestIntakeUpdate = {
  intakeTime: string;
  frequency: string;
  notificationEnabled: boolean;
};

export type ResponseIntakeUpdate = CommonResponse<{
  activeProductId: number;
  memberProductId: number;
  productId: number;
  brand: string;
  productName: string;
  thumbnailImageUrl: string;
  startedOn: string;
  intakeDayCount: number;
  notificationEnabled: boolean;
  intakeTime: string;
  frequency: string;
  frequencyLabel: string;
  frequencyIntervalDays: number;
  scheduleAnchorOn: string;
}>;

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
