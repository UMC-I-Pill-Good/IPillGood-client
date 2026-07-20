import { clsx } from 'clsx';

interface HealthMinorConcernChipProps {
  id: string;
  label: string;
  isSelected: boolean;
  onClick: (id: string) => void;
  className?: string;
}

const HealthMinorConcernChip = ({
  id,
  label,
  isSelected,
  onClick,
  className,
}: HealthMinorConcernChipProps) => {
  return (
    <button
      type='button'
      aria-pressed={isSelected}
      onClick={() => onClick(id)}
      className={clsx(
        'inline-flex h-9 min-h-[36px] w-fit shrink-0 items-center justify-center rounded-lg px-5 py-2 text-center text-sm font-medium whitespace-nowrap transition-all duration-200',
        'shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]',
        isSelected
          ? 'bg-[#7F99FF] text-white'
          : 'bg-[#DCE4FF] text-[#111111] hover:bg-[#D4DFFF]',
        className,
      )}
    >
      {label}
    </button>
  );
};

export default HealthMinorConcernChip;
