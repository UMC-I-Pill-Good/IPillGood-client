'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SUPPLEMENT_ADD_RETURN_STATE_KEY } from '@/shared/constants/supplementAddReturnState';
import { isSupplementAddReturnPath } from '@/shared/utils';

const SupplementAddReturnStateGuard = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!isSupplementAddReturnPath(pathname)) {
      sessionStorage.removeItem(SUPPLEMENT_ADD_RETURN_STATE_KEY);
    }
  }, [pathname]);

  return null;
};

export default SupplementAddReturnStateGuard;
