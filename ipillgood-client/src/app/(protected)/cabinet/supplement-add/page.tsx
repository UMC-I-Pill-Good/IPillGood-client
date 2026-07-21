'use client';

import { SearchBar } from '@/shared/components';
import { Header } from '@/shared/layout';
import { useState } from 'react';

const SupplementAddPage = () => {
  const [value, setValue] = useState('');
  return (
    <main>
      <Header title='영양제 이름' />
      <p className='typo-body-10 px-5 py-4'>캐비닛에 추가하고 싶은 영양제를 선택해 주세요.</p>
      <div className='px-5 pb-4'>
        <SearchBar value={value} onChange={setValue} placeholder='영양제를 검색해주세요.' />
      </div>
    </main>
  );
};

export default SupplementAddPage;
