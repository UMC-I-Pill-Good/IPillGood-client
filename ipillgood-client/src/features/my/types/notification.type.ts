import { CommonResponse } from '@/shared/types';

// ----- 앱 푸시 설정 조회(GET /notification-settings/me) -----
export type NotificationSettingsMeType = {
  pushEnabled: boolean;
};

export type NotificationSettingsMeResponseType = CommonResponse<NotificationSettingsMeType>;

// ----- 복용 알림 설정 통합 조회(GET /notification-settings/intake) -----
export type NotificationSettingsIntakeType = {
  pushEnabled: boolean;
  intakePushEnabled: boolean;
  activeProductCount: number;
  activeProducts: ActiveProductType[];
};

export type ActiveProductType = {
  activeProductId: number;
  memberProductId: number;
  productId: number;
  productName: string;
  notificationEnabled: boolean;
  intakeTime: string;
};

export type NotificationSettingsIntakeResponseType = CommonResponse<NotificationSettingsIntakeType>;

// ------ 푸시 토큰 등록(POST /push-tokens) ------
export type PlatformType = 'WEB';

export type PushTokensRequestType = {
  platform: PlatformType;
  token: string;
};

export type PushTokensType = {
  pushTokenId: number;
  platform: PlatformType;
  active: boolean;
  lastSeenAt: string;
};

export type PushTokensResponseType = CommonResponse<PushTokensType>;
