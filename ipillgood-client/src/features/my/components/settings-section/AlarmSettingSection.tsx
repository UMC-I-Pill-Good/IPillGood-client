'use client';

import { ToggleButton } from '@/shared/components';
import SectionCard from '../SectionCard';
import SectionItem from '../SectionItem';
import { usePushAlarmSettings } from '../../hooks/usePushAlarmSettings';

const AlarmSettingSection = () => {
  const { isPushAlarmOn, handleTogglePushAlarm } = usePushAlarmSettings();

  const AlertRight = <ToggleButton isChecked={isPushAlarmOn} onClick={handleTogglePushAlarm} />;

  return (
    <SectionCard title='알림 설정'>
      <SectionItem label='푸시 알림' right={AlertRight} />
      <SectionItem label='복용 시간 알림' href='/my/settings/notifications' />
    </SectionCard>
  );
};

export default AlarmSettingSection;
