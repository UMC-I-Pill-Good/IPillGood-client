'use client';

import { ToggleButton } from '@/shared/components';
import { cn } from '@/shared/utils';

interface NotificationItemProps {
  label: string;
  isChecked: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onClick?: () => void;
}

const NotificationItem = ({
  label,
  isChecked,
  onToggle,
  disabled,
  onClick,
}: NotificationItemProps) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={cn(
        'flex justify-between items-center px-5 py-[16.5px] relative rounded-[20px] bg-linear-[135deg] from-white/80 to-white/50 shadow-[0px_4px_4px_0px_rgba(126,131,135,0.1)] border border-white transition-colors',
        disabled && 'opacity-65',
        onClick && !disabled && 'cursor-pointer hover:bg-white/90 active:bg-white',
      )}
    >
      <span className='typo-body-10 text-black truncate w-[80%]'>{label}</span>
      <span
        className='absolute right-4 top-1/2 -translate-y-1/2'
        onClick={(e) => e.stopPropagation()}
      >
        <ToggleButton isChecked={isChecked} onClick={onToggle} disabled={disabled} />
      </span>
    </div>
  );
};

export default NotificationItem;
