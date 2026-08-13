import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const textButtonVariants = cva(
  'shrink-0 inline-flex items-center justify-center w-fit shadow-[0_4px_4px_rgba(126,131,135,0.1)] transition-all disabled:bg-neutral-500 disabled:cursor-not-allowed disabled:text-white rounded-[8px] break-keep',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 backdrop-blur-xl',
        secondary:
          'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 backdrop-blur-xl border border-transparent',
        assistive:
          'bg-white text-neutral-800 hover:bg-secondary/70 hover:text-white active:bg-secondary-600 active:text-white backdrop-blur-xl border border-white hover:border-transparent',
        outline:
          'border border-secondary-600 text-secondary rounded-[10px] hover:bg-secondary/70 hover:text-white hover:border-transparent active:bg-secondary-600 backdrop-blur-xl',
        semantic:
          'bg-semantic-500 text-white hover:bg-semantic-600 active:bg-semantic-700 backdrop-blur-xl',
        semanticOutline:
          'border border-semantic-500 text-semantic-500 hover:bg-semantic-200 hover:text-white hover:border-transparent active:bg-semantic-300 active backdrop-blur-xl',
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
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  className?: string;
  href?: string;
  target?: '_blank' | '_self';
  rel?: string;
}

const TextButton = ({
  type = 'button',
  onClick,
  text,
  disabled = false,
  className,
  variant,
  size,
  href,
  target,
  rel,
}: TextButtonProps) => {
  const buttonClassName = cn(textButtonVariants({ size, variant }), className);

  if (href && !disabled) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={buttonClassName}>
        {text}
      </a>
    );
  }

  return (
    <button
      type={type}
      aria-label={text}
      onClick={onClick}
      disabled={disabled}
      className={buttonClassName}
    >
      {text}
    </button>
  );
};

export default TextButton;
