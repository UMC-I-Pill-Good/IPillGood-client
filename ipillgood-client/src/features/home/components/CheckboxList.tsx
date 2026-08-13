'use client';

import { CheckboxButton } from '@/shared/components';

interface CheckboxListProps {
  list: { id: number; label: string }[];
  checkedIdList: number[];
  onToggle: (id: number) => void;
  readOnly?: boolean;
}
const CheckboxList = ({ list, checkedIdList, onToggle, readOnly = false }: CheckboxListProps) => {
  return (
    <div className='flex flex-col gap-2 pb-1 pt-1.25'>
      {list.map((item) => {
        const checked = checkedIdList.includes(item.id);
        return (
          <div
            key={item.id}
            onClick={() => {
              if (!readOnly) onToggle(item.id);
            }}
            className={`rounded-lg border border-point-700 py-2.5 px-5 flex justify-start items-center gap-2 ${
              readOnly ? '' : 'cursor-pointer'
            }`}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <CheckboxButton
                checked={checked}
                onClick={readOnly ? undefined : () => onToggle(item.id)}
                ariaLabel={item.label}
              />
            </div>
            <span
              title={item.label}
              className='min-w-0 flex-1 text-point-700 wrap-anywhere leading-[1.3]'
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxList;
