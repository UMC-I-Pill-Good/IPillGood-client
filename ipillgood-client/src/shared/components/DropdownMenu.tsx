import clsx from 'clsx';

interface DropdownMenuProps<T extends string | number> {
  options: T[];
  value: T;
  onSelect: (value: T) => void;
  className?: string;
}

const DropdownMenu = <T extends string | number>({
  options,
  value,
  onSelect,
  className,
}: DropdownMenuProps<T>) => {
  return (
    <ul
      role='listbox'
      className={clsx(
        'absolute top-full left-0 z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-neutral-300 bg-white p-1 shadow-lg',
        className,
      )}
    >
      {options.map((option) => (
        <li key={option}>
          <button
            type='button'
            role='option'
            aria-selected={value === option}
            onClick={() => onSelect(option)}
            className={clsx(
              'flex w-full items-center rounded-lg px-3 py-2 text-left transition-colors',
              value === option ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-neutral-100',
            )}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DropdownMenu;
