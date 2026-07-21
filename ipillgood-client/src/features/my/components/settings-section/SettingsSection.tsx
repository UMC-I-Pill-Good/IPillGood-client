'use client';

import { TextButton } from '@/shared/components';
import { useRouter } from 'next/navigation';
import AlarmSettingSection from './AlarmSettingSection';
import EtcSection from './EtcSection';

const SettingsSection = () => {
  const router = useRouter();

  return (
    <section className='flex flex-col pb-22 px-5 pt-6.5 gap-24 flex-1'>
      {/* 알림 설정 */}
      <AlarmSettingSection />

      {/* 기타 */}
      <EtcSection />

      <TextButton
        type='button'
        variant='semantic'
        size='xl'
        text='탈퇴하기'
        onClick={() => router.push('/my/settings/withdraw')}
        className='w-full mt-auto'
      />
    </section>
  );
};

export default SettingsSection;
