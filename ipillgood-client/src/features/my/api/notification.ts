import { axiosInstance } from '@/app/api/api';
import {
  NotificationSettingsIntakeResponseType,
  NotificationSettingsMeResponseType,
  PushTokensRequestType,
  PushTokensResponseType,
} from '../types/notification.type';

// 앱 푸시 설정 조회
export const getNotificationSettingsMe = async () => {
  const { data } = await axiosInstance.get<NotificationSettingsMeResponseType>(
    '/notification-settings/me',
  );

  return data;
};

// 앱 푸시 설정 변경
export const patchNotificationSettingsMe = async (body: { pushEnabled: boolean }) => {
  await axiosInstance.patch('/notification-settings/me', body);
};

// 복용 알림 설정 통합 조회
export const getNotificationSettingsIntake = async () => {
  const { data } = await axiosInstance.get<NotificationSettingsIntakeResponseType>(
    '/notification-settings/intake',
  );

  return data;
};

// 복용 전체 알림 변경
export const patchNotificationSettingsIntake = async (body: { intakePushEnabled: boolean }) => {
  await axiosInstance.patch('/notification-settings/intake', body);
};

// 푸시 토큰 등록
export const postPushTokens = async (body: PushTokensRequestType) => {
  const { data } = await axiosInstance.post<PushTokensResponseType>('/push-tokens', body);

  return data;
};

// 푸시 토큰 비활성화
export const deletePushTokens = async (pushTokenId: number) => {
  await axiosInstance.delete(`/push-tokens/${pushTokenId}`);
};

// 개별 복용 알림 변경
export const patchIntakeActiveProducts = async (
  activeProductId: number,
  body: { notificationEnabled: boolean },
) => {
  await axiosInstance.patch(
    `/notification-settings/intake/active-products/${activeProductId}`,
    body,
  );
};
