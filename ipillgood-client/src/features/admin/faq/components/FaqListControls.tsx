'use client';

import { useState } from 'react';

import { TextButton } from '@/shared/components';

import type { FaqItemType } from '../types/Faq';
import FaqDeleteModal from './FaqDeleteModal';
import FaqFormModal from './FaqFormModal';
import FaqTable from './FaqTable';

const FAQ_TOTAL_PAGES = 5;

const FaqListControls = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItemType>();
  const [deletingFaq, setDeletingFaq] = useState<FaqItemType>();

  const handleAddButtonClick = () => {
    setEditingFaq(undefined);
    setIsFormModalOpen(true);
  };

  const handleFormModalClose = () => {
    setIsFormModalOpen(false);
    setEditingFaq(undefined);
  };

  const handleEditButtonClick = (faq: FaqItemType) => {
    setEditingFaq(faq);
    setIsFormModalOpen(true);
  };

  const handleDeleteButtonClick = (faq: FaqItemType) => {
    setDeletingFaq(faq);
  };

  const handleDeleteModalClose = () => {
    setDeletingFaq(undefined);
  };

  return (
    <section aria-label='FAQ 목록 제어' className='flex min-h-0 flex-1 flex-col gap-2 px-10 pb-2'>
      <div className='flex justify-end'>
        <TextButton
          text='+ FAQ 추가'
          variant='primary'
          size='sm'
          onClick={handleAddButtonClick}
          className='px-3'
        />
      </div>
      <FaqTable
        currentPage={currentPage}
        totalPages={FAQ_TOTAL_PAGES}
        onPageChange={setCurrentPage}
        onEdit={handleEditButtonClick}
        onDelete={handleDeleteButtonClick}
      />
      {isFormModalOpen && <FaqFormModal faq={editingFaq} onClose={handleFormModalClose} />}
      {deletingFaq && <FaqDeleteModal onClose={handleDeleteModalClose} />}
    </section>
  );
};

export default FaqListControls;
