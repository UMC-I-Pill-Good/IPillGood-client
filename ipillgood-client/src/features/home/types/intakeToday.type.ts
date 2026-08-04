import { CommonResponse } from '@/shared/types';

export type ScheduledProductType = {
  activeProductId: number;
  memberProductId: number;
  productId: number;
  productName: string;
  taken: boolean;
  takenAt: string | null;
};

export type IntakeTodayType = {
  currentDate: string;
  scheduledCount: number;
  takenCount: number;
  allCompleted: boolean;
  missedNoticeVisible: boolean;
  autoPopupShown: boolean;
  autoPopupRequired: boolean;
  scheduledProducts: ScheduledProductType[];
};

export type IntakeTodayResponseType = CommonResponse<IntakeTodayType>;

export type IntakeTodayRecordsRequestType = {
  takenActiveProductIds: number[];
};

export type RecordType = {
  activeProductId: number;
  productId: number;
  productName: string;
  scheduled: boolean;
  taken: boolean;
  takenAt: string | null;
};

export type IntakeTodayRecordsType = {
  currentDate: string;
  scheduledCount: number;
  takenCount: number;
  allCompleted: boolean;
  completedAt: string | null;
  missedNoticeVisible: boolean;
  records: RecordType[];
};

export type IntakeTodayRecordsResponseType = CommonResponse<IntakeTodayRecordsType>;
