'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, House, Search, User } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { CabinetIcon } from '@/assets';

const menus = [
  {
    label: '검색/랭킹',
    href: '/ranking',
    icon: <Search />,
  },
  {
    label: '컨디션',
    href: '/condition',
    icon: <HeartPulse />,
  },
  {
    label: '홈',
    href: '/',
    icon: <House />,
  },
  {
    label: '캐비닛',
    href: '/cabinet',
    icon: <CabinetIcon />,
  },
  {
    label: '마이',
    href: '/my',
    icon: <User />,
  },
];

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className='fixed bottom-0 left-1/2 z-50 w-full max-w-110 -translate-x-1/2 bg-background shadow-[0_-4px_4px_0_rgba(126,131,135,0.1)]'>
      <ul className='flex h-18'>
        {menus.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href} className='flex-1'>
              <Link
                href={href}
                className={cn(
                  'flex h-full flex-col items-center justify-center gap-1 text-xs transition-colors font-medium leading-normal',
                  isActive ? 'text-primary-600' : 'text-neutral-800',
                )}
              >
                {Icon}
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
