'use client';

import { useState } from 'react';

import { AdminPagination, TextButton } from '@/shared/components';

import FaqFormModal from './FaqFormModal';

const FAQ_TOTAL_PAGES = 5;

const FaqListControls = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleAddButtonClick = () => {
    setIsFormModalOpen(true);
  };

  const handleFormModalClose = () => {
    setIsFormModalOpen(false);
  };

  return (
    <section aria-label='FAQ 목록 제어' className='flex min-h-0 flex-1 flex-col px-10 pb-2'>
      <div className='flex justify-end'>
        <TextButton
          text='+ FAQ 추가'
          variant='primary'
          size='sm'
          onClick={handleAddButtonClick}
          className='px-3'
        />
      </div>
      <div className='flex-1'>
        {/* FAQ 테이블 관리 열에서 src/assets/icons/admin의 수정 및 삭제 아이콘 사용 */}
      </div>
      <AdminPagination
        currentPage={currentPage}
        totalPages={FAQ_TOTAL_PAGES}
        onPageChange={setCurrentPage}
        className='mt-auto'
      />
      {isFormModalOpen && <FaqFormModal onClose={handleFormModalClose} />}
    </section>
  );
};

export default FaqListControls;
