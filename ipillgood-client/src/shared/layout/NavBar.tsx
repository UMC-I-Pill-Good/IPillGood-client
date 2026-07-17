'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, House, Search, User } from 'lucide-react';
import { CabinetIcon } from '@/assets';
import { cn } from '@/shared/utils/cn';

const menuList = [
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
    <nav className='bottom-nav-glass fixed bottom-0 left-1/2 z-50 w-full max-w-110 -translate-x-1/2'>
      <ul className='flex h-[66px] items-center justify-between px-5'>
        {menuList.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <li key={href} className='flex-1'>
              <Link
                href={href}
                className={cn(
                  'flex h-full flex-col items-center justify-center gap-1 text-[10px] font-medium leading-normal tracking-[-0.11px] transition-colors',
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
