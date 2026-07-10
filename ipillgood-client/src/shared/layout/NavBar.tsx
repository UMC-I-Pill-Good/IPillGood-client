'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, House, Search, User } from 'lucide-react';
import { CabinetIcon } from '@/assets';
import { cn } from '@/shared/utils/cn';

const menus = [
  {
    label: '검색/랭킹',
    href: '/ranking',
    icon: Search,
  },
  {
    label: '컨디션',
    href: '/condition',
    icon: HeartPulse,
  },
  {
    label: '홈',
    href: '/',
    icon: House,
  },
  {
    label: '캐비닛',
    href: '/cabinet',
    icon: CabinetIcon,
  },
  {
    label: '마이',
    href: '/my',
    icon: User,
  },
];

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className='fixed bottom-0 left-1/2 z-50 w-full max-w-110 -translate-x-1/2 shadow-[0_-4px_4px_0_rgba(126,131,135,0.1)] bg-linear-to-b from-white/40 to-white/0 backdrop-blur-xl'>
      <ul className='flex h-18 items-center justify-between'>
        {menus.map(({ label, href, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

          return (
            <li key={href} className='flex-1'>
              <Link
                href={href}
                className={cn(
                  'flex h-full flex-col items-center justify-center gap-1 text-xs font-medium leading-normal transition-colors',
                  isActive ? 'text-primary-600' : 'text-neutral-800 hover:text-primary-400',
                )}
              >
                <Icon className='size-6' />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
