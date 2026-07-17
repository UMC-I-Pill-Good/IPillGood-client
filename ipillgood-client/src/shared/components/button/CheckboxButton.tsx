import { Check } from 'lucide-react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils';

const checkboxButtonVariants = cva(
  'inline-flex items-center justify-center rounded-[4px] border transition-all',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
      checked: {
        true: 'border-primary-500 bg-primary-600 text-white',
        false: 'border-neutral-800 bg-white text-transparent hover:bg-neutral-300',
      },
    },
    defaultVariants: {
      size: 'sm',
      checked: false,
    },
  },
);

interface CheckboxButtonProps extends VariantProps<typeof checkboxButtonVariants> {
  onClick?: () => void;
}

const CheckboxButton = ({ size = 'sm', checked, onClick }: CheckboxButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      role='checkbox'
      aria-checked={!!checked}
      className={cn(checkboxButtonVariants({ size, checked }))}
    >
      <Check size={size === 'sm' ? 12 : 14} strokeWidth={3} />
    </button>
  );
};

export default CheckboxButton;
