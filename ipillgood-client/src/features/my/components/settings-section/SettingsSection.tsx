import { TextButton } from '@/shared/components';
import AlarmSettingSection from './AlarmSettingSection';
import EtcSection from './EtcSection';

const SettingsSection = () => {
  return (
    <section className='flex flex-col pb-28.5 px-5 pt-6.5 gap-24 flex-1'>
      {/* 알림 설정 */}
      <AlarmSettingSection />

      {/* 기타 */}
      <EtcSection />

      <TextButton
        type='button'
        variant='semantic'
        size='xl'
        text='탈퇴하기'
        href='/my/settings/withdraw'
        className='w-full mt-auto'
      />
    </section>
  );
};

export default SettingsSection;
