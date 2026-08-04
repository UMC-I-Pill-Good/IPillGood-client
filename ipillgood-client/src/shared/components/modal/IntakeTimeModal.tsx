'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalClockIcon } from '@/assets';
import { WheelSelectTime } from '@/features/cabinet/components/modal/WheelSelectTime';
import { IconButton, ModalShell, TextButton } from '@/shared/components';
import { X } from 'lucide-react';

interface IntakeTimeModalProps {
  initialTime?: string;
  onConfirm: (intakeTime: string) => void;
  onCancel: () => void;
}

const IntakeTimeModal = ({ initialTime = '00:00', onConfirm, onCancel }: IntakeTimeModalProps) => {
  const meridiemOptions = ['오전', '오후'] as const;
  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

  const [initialHour, initialMinute] = initialTime.split(':').map(Number);

  const [meridiem, setMeridiem] = useState<'오전' | '오후'>(initialHour >= 12 ? '오후' : '오전');

  const [hour, setHour] = useState(initialHour % 12 || 12);
  const [minute, setMinute] = useState(initialMinute);

  return createPortal(
    <ModalShell
      onClose={onCancel}
      ariaLabel='복용 시간 선택'
      className='relative w-full max-w-88 pointer-events-auto'
    >
      <div className='absolute right-6 top-6'>
        <IconButton icon={<X size={22} />} ariaLabel='모달 닫기' onClick={onCancel} />
      </div>

      <section className='mt-12 flex flex-col items-center gap-8'>
        <div className='flex h-25 w-25 items-center justify-center rounded-full bg-[#C0D4FF]'>
          <ModalClockIcon />
        </div>

        <h2 className='typo-body-5 text-black'>복용 시간을 선택해 주세요</h2>
      </section>

      <section className='mt-8 flex items-center justify-center gap-4'>
        <WheelSelectTime options={meridiemOptions} value={meridiem} onChange={setMeridiem} />

        <WheelSelectTime options={hourOptions} value={hour} onChange={setHour} />

        <WheelSelectTime options={minuteOptions} value={minute} onChange={setMinute} />
      </section>

      <TextButton
        type='button'
        text='확인'
        className='mt-8 w-full'
        onClick={() => {
          const hour24 = (hour % 12) + (meridiem === '오후' ? 12 : 0);
          onConfirm(`${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
        }}
      />
    </ModalShell>,
    document.body,
  );
};

export default IntakeTimeModal;
