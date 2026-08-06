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
    <div className='flex flex-col gap-2 max-h-40 overflow-y-auto mask-t-from-99% mask-b-from-99% hide-scrollbar pb-1 pt-1.25'>
      {list.map((item) => {
        const checked = checkedIdList.includes(item.id);
        return (
          <div
            key={item.id}
            onClick={() => {
              if (!readOnly) onToggle(item.id);
            }}
            className={`relative rounded-lg border border-point-700 py-3 px-5 flex justify-start gap-2 ${
              readOnly ? '' : 'cursor-pointer'
            }`}
          >
            <CheckboxButton
              checked={checked}
              onClick={readOnly ? undefined : () => onToggle(item.id)}
            />
            <span title={item.label} className='text-point-700 truncate'>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxList;
