'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface SectionItemProps {
  label: string;
  icon?: LucideIcon;
  right?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

const SectionItem = ({ label, icon: Icon, right, href, onClick }: SectionItemProps) => {
  const isInteractive = Boolean(href || onClick);
  const rowClassName = `relative flex w-full py-5 px-4 transition-colors ${
    isInteractive ? 'hover:bg-neutral-100 active:bg-neutral-200' : ''
  }`;

  const content = (
    <>
      <span className='flex items-center flex-1'>
        {Icon && <Icon size={24} className='text-neutral-800 mr-2' />}
        <span className='typo-body-6 text-black'>{label}</span>
      </span>
      <span className='absolute right-4 top-1/2 -translate-y-1/2'>
        {right ?? (isInteractive && <ChevronRight size={24} className='text-neutral-800' />)}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={rowClassName}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type='button' onClick={onClick} className={rowClassName}>
        {content}
      </button>
    );
  }

  return <div className={rowClassName}>{content}</div>;
};

export default SectionItem;
