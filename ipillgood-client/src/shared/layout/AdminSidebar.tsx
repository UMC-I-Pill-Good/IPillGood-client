'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { AdminChevronIcon, AdminDashboardIcon, AdminLogoIcon, AdminLogoutIcon } from '@/assets';
import { ADMIN_MENU_LIST } from '@/shared/constants/AdminSidebar';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { cn } from '@/shared/utils/cn';

const AdminLogo = () => {
  return (
    <div className='flex h-[54px] w-[58px] shrink-0 items-center justify-center overflow-visible'>
      <AdminLogoIcon
        width={98}
        height={95}
        className='max-w-none shrink-0 overflow-visible'
        aria-hidden='true'
      />
    </div>
  );
};

const AdminSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { clearTokens } = useLocalStorage();
  const [openMenuList, setOpenMenuList] = useState(ADMIN_MENU_LIST.map((menu) => menu.href));

  const handleMenuToggleClick = (href: string) => {
    setOpenMenuList((previousOpenMenuList) => {
      const isOpen = previousOpenMenuList.includes(href);

      if (isOpen) {
        return previousOpenMenuList.filter((openMenu) => openMenu !== href);
      }

      return [...previousOpenMenuList, href];
    });
  };

  const handleLogoutClick = () => {
    clearTokens();
    queryClient.clear();
    router.replace('/login');
  };

  return (
    <aside className='flex min-h-dvh w-[169px] shrink-0 flex-col justify-between bg-white'>
      <div className='flex flex-col gap-8'>
        <div className='flex items-end gap-1 bg-primary-200 px-5 py-4'>
          <AdminLogo />
          <span className='pb-px text-center text-sm font-medium leading-none text-primary'>
            ADMIN
          </span>
        </div>

        <nav aria-label='관리자 메뉴' className='px-5 py-2.5'>
          <div className='flex w-full flex-col gap-8'>
            <Link href='/admin' className='flex items-center gap-1'>
              <AdminDashboardIcon className='h-[24px] w-6 shrink-0' aria-hidden='true' />
              <span className='text-base font-medium leading-6 tracking-[-0.176px] text-black'>
                대시보드
              </span>
            </Link>

            <ul className='flex flex-col gap-8'>
              {ADMIN_MENU_LIST.map((menu) => (
                <li key={menu.href} className='flex flex-col gap-4'>
                  <button
                    type='button'
                    aria-expanded={openMenuList.includes(menu.href)}
                    aria-controls={`admin-submenu-${menu.href.split('/').at(-1)}`}
                    onClick={() => handleMenuToggleClick(menu.href)}
                    className='flex w-full items-center justify-between text-left'
                  >
                    <span className='text-lg font-semibold leading-none text-black'>
                      {menu.label}
                    </span>
                    <AdminChevronIcon
                      className={`h-4 w-[9px] transition-transform ${
                        openMenuList.includes(menu.href) ? 'rotate-90' : '-rotate-90'
                      }`}
                      aria-hidden='true'
                    />
                  </button>
                  {openMenuList.includes(menu.href) && (
                    <Link
                      id={`admin-submenu-${menu.href.split('/').at(-1)}`}
                      href={menu.href}
                      aria-current={
                        pathname === menu.href || pathname.startsWith(`${menu.href}/`)
                          ? 'page'
                          : undefined
                      }
                      className={cn(
                        'px-2 py-1 text-base font-medium leading-none text-neutral transition-colors',
                        (pathname === menu.href || pathname.startsWith(`${menu.href}/`)) &&
                          'bg-secondary-200 text-secondary-900',
                      )}
                    >
                      {menu.childLabel}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className='flex h-[54px] items-center bg-secondary-200 px-5 py-4'>
        <button
          type='button'
          onClick={handleLogoutClick}
          className='flex w-full items-center gap-1 text-neutral'
        >
          <AdminLogoutIcon className='h-[17px] w-[19px] shrink-0' aria-hidden='true' />
          <span className='text-base font-medium leading-none'>로그아웃</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
