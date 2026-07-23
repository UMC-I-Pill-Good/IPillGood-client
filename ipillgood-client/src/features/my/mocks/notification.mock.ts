import { NotificationSettingsType } from '../types/notification.type';

export const MOCK_NOTIFICATION_SETTINGS: NotificationSettingsType = {
  pushEnabled: true,
  intakePushEnabled: true,
  activeProducts: [
    {
      activeProductId: 1,
      productName: '비타민D 1000IU',
      intakeTime: '08:30',
      frequency: 'EVERY_DAY',
      notificationEnabled: false,
    },
    {
      activeProductId: 2,
      productName: '비타민D 1000IU',
      intakeTime: '08:30',
      frequency: 'EVERY_DAY',
      notificationEnabled: false,
    },
    {
      activeProductId: 3,
      productName: '비타민D 1000IU',
      intakeTime: '08:30',
      frequency: 'EVERY_DAY',
      notificationEnabled: true,
    },
    {
      activeProductId: 4,
      productName: '비타민D 1000IU',
      intakeTime: '08:30',
      frequency: 'EVERY_DAY',
      notificationEnabled: true,
    },
    {
      activeProductId: 5,
      productName: '비타민D 1000IU',
      intakeTime: '08:30',
      frequency: 'EVERY_DAY',
      notificationEnabled: false,
    },
    {
      activeProductId: 6,
      productName: '비타민D 1000IU',
      intakeTime: '08:30',
      frequency: 'EVERY_DAY',
      notificationEnabled: true,
    },
    {
      activeProductId: 7,
      productName: '비타민D 1000IU',
      intakeTime: '08:30',
      frequency: 'EVERY_DAY',
      notificationEnabled: false,
    },
  ],
};
