import { cn } from '@/shared/utils/cn';

interface IconButtonProps {
  onClick?: () => void;
  className?: string;
  icon: React.ReactNode;
  ariaLabel: string;
  disabled?: boolean;
}

const IconButton = ({ onClick, className, icon, ariaLabel, disabled = false }: IconButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        'h-9 w-9 shrink-0 rounded-full inline-flex items-center justify-center text-neutral-800 shadow-[0_4px_4px_rgba(126,131,135,0.1)] backdrop-blur-xl transition-all',
        'bg-white/60 enabled:hover:bg-white enabled:active:bg-primary-300/30',
        'ring ring-white enabled:active:ring-primary-100 disabled:ring-neutral-100/30 ',
        'disabled:cursor-not-allowed disabled:bg-neutral-300/50',
        className,
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
