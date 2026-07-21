'use client';

import { cn } from '@/shared/utils/cn';
import TextButton from '../button/TextButton';
import BottomSheet from './BottomSheet';

export interface FilterBottomSheetOption {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export interface FilterBottomSheetGroup {
  title: string;
  options?: FilterBottomSheetOption[];
  optionRows?: FilterBottomSheetOption[][];
}

interface FilterBottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  groups: FilterBottomSheetGroup[];
  onReset: () => void;
  onApply: () => void;
  resetText?: string;
  applyText?: string;
}

const FilterBottomSheet = ({
  open,
  onClose,
  title = '필터',
  groups,
  onReset,
  onApply,
  resetText = '초기화',
  applyText = '적용하기',
}: FilterBottomSheetProps) => {
  return (
    <BottomSheet
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <div className='flex h-[32.25rem] max-h-[calc(100dvh-4.5rem)] min-h-0 flex-col justify-between overflow-visible bg-background'>
        <div className='thin-scrollbar flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto pb-8'>
          <h2 className='typo-body-5 text-black'>{title}</h2>

          <div className='flex flex-col gap-6'>
            {groups.map((group) => (
              <fieldset key={group.title} className='flex flex-col gap-1'>
                <legend className='text-base font-medium leading-normal text-black'>
                  {group.title}
                </legend>
                <div className='flex flex-col gap-2'>
                  {(group.optionRows ?? [group.options ?? []]).map((row) => (
                    <div
                      key={row.map((option) => option.label).join('-')}
                      className='flex flex-wrap gap-2'
                    >
                      {row.map((option) => (
                        <TextButton
                          key={option.label}
                          type='button'
                          text={option.label}
                          size='sm'
                          variant={
                            option.isSelected ? 'secondary' : 'assistive'
                          }
                          className={cn(
                            'h-8 px-4 py-1',
                            option.isSelected
                              ? 'text-white shadow-none backdrop-blur-none'
                              : 'bg-white/70 text-neutral-800 shadow-[4px_4px_4px_rgba(155,161,255,0.1)] saturate-150',
                          )}
                          onClick={option.onClick}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <div className='grid shrink-0 grid-cols-2 gap-3 pb-2 pt-4'>
          <TextButton
            type='button'
            text={resetText}
            variant='outline'
            size='sm'
            className='h-10 w-full shadow-none'
            onClick={onReset}
          />
          <TextButton
            type='button'
            text={applyText}
            variant='primary'
            size='sm'
            className='h-10 w-full shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
            onClick={onApply}
          />
        </div>
      </div>
    </BottomSheet>
  );
};

export default FilterBottomSheet;
