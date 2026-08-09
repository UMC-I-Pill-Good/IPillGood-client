'use client';

import { BellGreyIcon } from '@/assets';
import { useState } from 'react';
import AlarmSettingModal from './AlarmSettingModal';
import { usePushAlarmSettings } from '@/features/my/hooks/usePushAlarmSettings';
import { useRouter } from 'next/navigation';

const AlarmSettingButton = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isPushAlarmOn, isPushAlarmLoading } = usePushAlarmSettings();

  const handleClick = () => {
    if (isPushAlarmLoading) return;
    if (isPushAlarmOn) {
      router.push('/my/settings/notifications');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isPushAlarmLoading}
        className='flex items-center text-neutral-800 h-8 typo-caption-6 px-3 rounded-full bg-linear-[145deg] from-white via-white/40 to-white/10 shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10),inset_-2px_-3px_3px_-1px_rgba(0,0,0,0.03)] border-white border transition hover:from-white/10 hover:via-white/40 hover:to-white disabled:opacity-50'
      >
        <BellGreyIcon />
        <span>알림 설정</span>
      </button>
      {isModalOpen && <AlarmSettingModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default AlarmSettingButton;
