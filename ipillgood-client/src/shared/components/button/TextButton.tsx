import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const textButtonVariants = cva(
  'shrink-0 inline-flex items-center justify-center w-fit shadow-[0_4px_4px_rgba(126,131,135,0.1)] transition-all disabled:bg-neutral-500 disabled:cursor-not-allowed disabled:text-white rounded-[8px] break-keep',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 backdrop-blur-xl',
        secondary:
          'bg-secondary-600 text-white hover:bg-secondary-600/80 active:bg-secondary-700 backdrop-blur-xl',
        assistive:
          'bg-white text-neutral-800 hover:bg-secondary-500/50 active:bg-secondary-600 active:text-white backdrop-blur-xl ring ring-white hover:ring-0 active:ring-0',
        outline:
          'ring ring-secondary-600 text-secondary-600 rounded-[10px] hover:bg-secondary-300 hover:text-white hover:ring-0 active:ring-0 active:bg-secondary-600 active:text-white backdrop-blur-xl',
      },
      size: {
        xl: 'typo-body-2 h-13',
        lg: 'typo-body-6 h-10',
        md: 'typo-body-10 h-9',
        sm: 'typo-caption-2 h-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface TextButtonProps extends VariantProps<typeof textButtonVariants> {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  className?: string;
}

const TextButton = ({
  type,
  onClick,
  text,
  disabled = false,
  className,
  variant,
  size,
}: TextButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(textButtonVariants({ size, variant }), className)}
    >
      {text}
    </button>
  );
};

export default TextButton;
