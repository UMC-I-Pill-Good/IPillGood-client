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
    href: '/home',
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
    <nav className=' bg-white/60 backdrop-blur-lg fixed bottom-5 left-1/2 z-30 w-[calc(100%-32px)] max-w-100 rounded-full -translate-x-1/2 shadow-[4px_4px_15px_0px_rgba(0,0,0,0.15)]'>
      <ul className='flex h-16.5 items-center justify-between'>
        {menuList.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <li key={href} className='flex-1'>
              <Link
                href={href}
                className={cn(
                  'flex h-full flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors',
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
