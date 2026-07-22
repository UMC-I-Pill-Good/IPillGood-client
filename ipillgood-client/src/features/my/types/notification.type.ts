export type IntakeFrequencyType = 'EVERY_DAY'; // TODO: 다른 주기 값 확인되면 유니온에 추가

export type IntakeNotificationSettingType = {
  activeProductId: number;
  productName: string;
  intakeTime: string; // "HH:mm" (LocalTime)
  frequency: IntakeFrequencyType;
  notificationEnabled: boolean;
};

export type NotificationSettingsType = {
  pushEnabled: boolean;
  intakePushEnabled: boolean;
  activeProducts: IntakeNotificationSettingType[];
};
