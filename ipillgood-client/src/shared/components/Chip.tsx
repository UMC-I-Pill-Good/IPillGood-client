import { BadgeIcon } from '@/assets';
import { cn } from '@/shared/utils';
import { cva, VariantProps } from 'class-variance-authority';

const chipVariant = cva(
  'shrink-0 inline-flex w-fit items-center justify-center rounded-full break-keep shadow-[0_4px_4px_rgba(126,131,135,0.1)] cursor-default',
  {
    variants: {
      variant: {
        secondary: 'bg-secondary text-white typo-caption-2 h-8',
        point: 'bg-point-700 text-white typo-caption-6 h-6',
      },
      icon: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'secondary',
        className: 'px-3',
      },
      {
        variant: 'point',
        icon: true,
        className: 'px-2',
      },
      {
        variant: 'point',
        icon: false,
        className: 'px-3',
      },
    ],
    defaultVariants: {
      variant: 'secondary',
      icon: false,
    },
  },
);

interface ChipProps extends VariantProps<typeof chipVariant> {
  text: string;
  className?: string;
}

const Chip = ({ text, className, variant, icon = false }: ChipProps) => {
  return (
    <div className={cn(chipVariant({ variant, icon }), className)}>
      {icon && (
        <span className='mr-1 inline-flex h-2.75 w-2.25 items-center justify-center'>
          <BadgeIcon className='size-full' />
        </span>
      )}
      {text}
    </div>
  );
};

export default Chip;
