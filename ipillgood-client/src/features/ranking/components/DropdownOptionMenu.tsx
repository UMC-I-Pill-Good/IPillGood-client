import { cn } from '@/shared/utils/cn';

interface DropdownOptionMenuProps<T extends string> {
  options: readonly T[];
  selectedOption: T | null;
  onSelect: (option: T) => void;
  getOptionLabel?: (option: T) => string;
  className?: string;
}

const DropdownOptionMenu = <T extends string>({
  options,
  selectedOption,
  onSelect,
  getOptionLabel = (option) => option,
  className,
}: DropdownOptionMenuProps<T>) => {
  return (
    <div
      role='listbox'
      className={cn(
        'ranking-dropdown-glass absolute right-0 top-full z-20 mt-1 h-auto overflow-hidden rounded-lg p-0',
        className,
      )}
    >
      {options.map((option, index) => {
        const isSelected = selectedOption === option;
        const isLast = index === options.length - 1;

        return (
          <button
            key={option}
            type='button'
            role='option'
            aria-selected={isSelected}
            className={cn(
              'flex h-8 w-full items-center justify-center gap-1 px-2 typo-caption-2',
              isSelected ? 'text-black' : 'text-neutral-800',
              !isLast && 'border-b border-neutral-200',
            )}
            onClick={() => onSelect(option)}
          >
            {getOptionLabel(option)}
          </button>
        );
      })}
    </div>
  );
};

export default DropdownOptionMenu;
