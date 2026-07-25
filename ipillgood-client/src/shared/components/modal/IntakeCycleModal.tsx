'use client';

import { ModalCalendarIcon } from '@/assets';
import { IconButton, TextButton } from '@/shared/components';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { ChevronDown, X } from 'lucide-react';
import { useRef, useState } from 'react';
import DropdownMenu from '../DropdownMenu';
import clsx from 'clsx';

interface IntakeCycleModalProps {
  onConfirm: (cycle: string) => void;
  onCancel: () => void;
}

const cycleOptions = ['매일', '2일에 한 번', '3일에 한 번', '주 1회', '주 2회', '주 3회'] as const;

const IntakeCycleModal = ({ onConfirm, onCancel }: IntakeCycleModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [cycle, setCycle] = useState<(typeof cycleOptions)[number]>('2일에 한 번');
  const [openDropdown, setOpenDropdown] = useState(false);

  useScrollLock();
  useEscapeKey(onCancel);
  useOutsideClick(contentRef, onCancel);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4'
      role='dialog'
      aria-modal='true'
    >
      <div ref={contentRef} className='relative w-full max-w-88 rounded-[20px] bg-white px-8 py-8'>
        <div className='absolute right-6 top-6'>
          <IconButton icon={<X size={22} />} ariaLabel='모달 닫기' onClick={onCancel} />
        </div>

        <section className='flex flex-col items-center gap-8 mt-12'>
          <div className='flex h-25 w-25 items-center justify-center rounded-full bg-[#C0D4FF]'>
            <ModalCalendarIcon />
          </div>

          <h2 className='typo-body-5 text-black'>복용 주기를 선택해 주세요</h2>
        </section>

        <section className='mt-8'>
          <label className='mb-1 block typo-body-9 text-black'>복용 주기</label>

          <div className='relative'>
            <button
              type='button'
              onClick={() => setOpenDropdown((prev) => !prev)}
              className='flex h-9.5 w-full items-center justify-between rounded-lg border border-point px-2 typo-caption-2'
            >
              {cycle}
              <ChevronDown
                className={clsx(
                  'transition-transform text-neutral',
                  openDropdown ? 'rotate-180' : '',
                )}
                size={24}
              />
            </button>

            {openDropdown && (
              <DropdownMenu
                options={[...cycleOptions]}
                value={cycle}
                onSelect={(value) => {
                  setCycle(value);
                  setOpenDropdown(false);
                }}
                onClose={() => setOpenDropdown(false)}
                className='w-full'
              />
            )}
          </div>

          <p className='typo-caption-7 text-neutral'>선택하신 요일을 기반으로 자동 확정됩니다.</p>
        </section>

        <TextButton type='button' text='확인' className='w-full mt-4' />
      </div>
    </div>
  );
};

export default IntakeCycleModal;
