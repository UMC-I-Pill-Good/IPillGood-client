'use client';

import { useState } from 'react';

import { AdminSearchBar } from '@/shared/components';

const FaqManagementPage = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <main className='p-5'>
      <AdminSearchBar value={searchValue} onChange={setSearchValue} placeholder='제목으로 검색' />
    </main>
  );
};

export default FaqManagementPage;
