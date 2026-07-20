import { useEscapeKey } from '@/shared/hooks';
import { cn } from '@/shared/utils/cn';

interface DropdownMenuProps<T extends string | number> {
  id?: string;
  options: T[];
  value: T;
  onSelect: (value: T) => void;
  className?: string;
  onClose: () => void;
}

const DropdownMenu = <T extends string | number>({
  id,
  options,
  value,
  onSelect,
  className,
  onClose,
}: DropdownMenuProps<T>) => {
  useEscapeKey(onClose); // ESC 키 입력 시 드롭다운 닫기

  return (
    <div
      id={id}
      role='listbox'
      className={cn(
        'absolute top-full z-50 mt-1 max-h-50 no-center-glass rounded-lg border border-white bg-white/80 shadow-lg backdrop-blur-2xl divide-y divide-neutral-200 overflow-y-auto thin-scrollbar',
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option}
          type='button'
          role='option'
          aria-selected={option === value}
          onClick={() => onSelect(option)}
          className={cn(
            'w-full text-center text-neutral py-1.5 transition hover:bg-primary-100 hover:text-black typo-body-10 rounded-t-lg z-50',
            option === value && 'text-black',
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default DropdownMenu;
