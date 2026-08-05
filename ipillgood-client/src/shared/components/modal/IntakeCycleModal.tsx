'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { ChevronDown, X } from 'lucide-react';
import { ModalCalendarIcon } from '@/assets';
import { DropdownMenu, IconButton, ModalShell, TextButton } from '@/shared/components';

interface IntakeCycleModalProps {
  initialCycle?: string;
  onConfirm: (cycle: string) => void;
  onCancel: () => void;
}

const cycleOptions = [
  '2일에 한 번',
  '3일에 한 번',
  '일주일에 한 번',
  '2주일에 한 번',
  '매일',
] as const;

const IntakeCycleModal = ({
  initialCycle = '매일',
  onConfirm,
  onCancel,
}: IntakeCycleModalProps) => {
  const [cycle, setCycle] = useState<(typeof cycleOptions)[number]>(
    cycleOptions.includes(initialCycle as (typeof cycleOptions)[number])
      ? (initialCycle as (typeof cycleOptions)[number])
      : '매일',
  );

  const [openDropdown, setOpenDropdown] = useState(false);

  return createPortal(
    <ModalShell
      onClose={onCancel}
      ariaLabel='복용 주기 선택'
      className='relative w-full max-w-88 pointer-events-auto'
    >
      <div className='absolute right-6 top-6'>
        <IconButton icon={<X size={22} />} ariaLabel='모달 닫기' onClick={onCancel} />
      </div>

      <section className='mt-12 flex flex-col items-center gap-8'>
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
            className='flex h-9.5 w-full items-center justify-between rounded-lg border border-point-700 px-2 typo-caption-2'
          >
            {cycle}

            <ChevronDown
              size={24}
              className={clsx('text-neutral transition-transform', openDropdown && 'rotate-180')}
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
              className='max-h-60'
              buttonClassName='typo-caption-2 py-3'
            />
          )}
        </div>

        <p className='typo-caption-7 text-neutral'>선택하신 요일을 기반으로 자동 확정됩니다.</p>
      </section>

      <TextButton
        type='button'
        text='확인'
        className='mt-4 w-full'
        onClick={() => onConfirm(cycle)}
      />
    </ModalShell>,
    document.body,
  );
};

export default IntakeCycleModal;
