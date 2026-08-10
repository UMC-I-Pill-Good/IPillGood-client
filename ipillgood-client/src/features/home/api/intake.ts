import { axiosInstance } from '@/app/api/api';
import { IntakeStreakResponseType } from '../types/growthStage.type';
import { ActiveProductsResponseType } from '../types/intakeSupplement.type';
import {
  IntakeTodayRecordsRequestType,
  IntakeTodayRecordsResponseType,
  IntakeTodayResponseType,
} from '../types/intakeToday.type';
import { IntakeCalendarParamsType, IntakeCalendarResponseType } from '../types/intakeCalendar.type';
import { IntakeDaysResponseType } from '../types/intakeDays.type';

// 섭취 중 영양제 목록 조회
export const getActiveProducts = async () => {
  const { data } = await axiosInstance.get<ActiveProductsResponseType>('/intake/active-products');

  return data;
};

// 섭취 중 영양제 제거
export const deleteActiveProduct = async (activeProductId: number) => {
  await axiosInstance.delete(`/intake/active-products/${activeProductId}`);
};

// 연속 섭취일 조회
export const getIntakeStreak = async () => {
  const { data } = await axiosInstance.get<IntakeStreakResponseType>('/intake/streak');

  return data;
};

// 오늘 복용 상태 조회
export const getIntakeToday = async () => {
  const { data } = await axiosInstance.get<IntakeTodayResponseType>('/intake/today');

  return data;
};

// 오늘 복용 체크 저장
export const putIntakeTodayRecords = async (body: IntakeTodayRecordsRequestType) => {
  const { data } = await axiosInstance.put<IntakeTodayRecordsResponseType>(
    '/intake/today/records',
    body,
  );

  return data;
};

// 오늘 복용 팝업 노출 기록
export const patchPopUpShown = async () => {
  await axiosInstance.patch('/intake/today/popup-shown');
};

// 복용 캘린더 조회
export const getIntakeCalendar = async (params: IntakeCalendarParamsType) => {
  const { data } = await axiosInstance.get<IntakeCalendarResponseType>('/intake/calendar', {
    params,
  });

  return data;
};

// 날짜별 섭취 완료 목록 조회
export const getIntakeDays = async (date: string) => {
  const { data } = await axiosInstance.get<IntakeDaysResponseType>(`/intake/days/${date}`);

  return data;
};
