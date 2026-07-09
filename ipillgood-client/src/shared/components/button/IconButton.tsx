import { cn } from '@/shared/utils/cn';

interface IconButtonProps {
  onClick?: () => void;
  className?: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

const IconButton = ({ onClick, className, icon, disabled = false }: IconButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'h-9 w-9 shrink-0 rounded-full inline-flex items-center justify-center text-neutral-800 shadow-[0_4px_4px_rgba(126,131,135,0.1)] backdrop-blur-xl transition-all',
        'bg-white/60 hover:bg-white active:bg-primary-300/30',
        'ring ring-white active:ring-primary-100 disabled:ring-neutral-100/30',
        'disabled:cursor-not-allowed disabled:bg-neutral-300/50',
        className,
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
