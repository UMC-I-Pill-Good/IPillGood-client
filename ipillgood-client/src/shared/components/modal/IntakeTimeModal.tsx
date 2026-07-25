'use client';

import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import TextButton from '../button/TextButton';
import IconButton from '../button/IconButton';
import { X } from 'lucide-react';
import { ClockIcon } from '@/assets';
import { WheelSelectTime } from '@/features/cabinet/components/modal/WeelSelectTime';

interface IntakeTimeModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const IntakeTimeModal = ({ onConfirm, onCancel }: IntakeTimeModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollLock();
  useEscapeKey(onCancel);
  useOutsideClick(contentRef, onCancel);

  const meridiemOptions = ['오전', '오후'] as const;
  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

  const [meridiem, setMeridiem] = useState<'오전' | '오후'>('오전');
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(0);

  return createPortal(
    <div
      className='fixed inset-0 z-60 flex items-center justify-center bg-neutral-800/20 pointer-events-auto'
      role='dialog'
      aria-modal='true'
    >
      <div
        ref={contentRef}
        className='relative w-full max-w-88 rounded-[20px] bg-white px-7.5 py-6'
      >
        <div className='absolute right-6 top-6'>
          <IconButton icon={<X size={22} />} ariaLabel='모달 닫기' onClick={onCancel} />
        </div>

        <section className='flex flex-col items-center gap-8 mt-12'>
          <div className='flex h-25 w-25 items-center justify-center rounded-full bg-[#C0D4FF]'>
            <ClockIcon />
          </div>

          <h2 className='typo-body-5 text-black'>복용 시간을 선택해 주세요</h2>
        </section>

        <section className='mt-8'>
          <section className='flex items-center justify-center gap-4 mt-8'>
            <WheelSelectTime options={meridiemOptions} value={meridiem} onChange={setMeridiem} />

            <WheelSelectTime options={hourOptions} value={hour} onChange={setHour} />

            <WheelSelectTime options={minuteOptions} value={minute} onChange={setMinute} />
          </section>
        </section>

        <TextButton type='button' text='확인' className='w-full mt-8' onClick={onConfirm} />
      </div>
    </div>,
    document.body,
  );
};

export default IntakeTimeModal;
