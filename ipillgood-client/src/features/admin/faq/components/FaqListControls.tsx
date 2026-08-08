'use client';

import { useState } from 'react';

import { TextButton } from '@/shared/components';

import type { FaqFormValueType, FaqItemType } from '../types/Faq';
import FaqDeleteModal from './FaqDeleteModal';
import FaqFormModal from './FaqFormModal';
import FaqTable from './FaqTable';

interface FaqListControlsProps {
  faqList: FaqItemType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onCreate: (value: FaqFormValueType) => Promise<void>;
  onUpdate: (faqId: number, value: FaqFormValueType) => Promise<void>;
  onDelete: (faqId: number) => Promise<void>;
  isSubmitting?: boolean;
}

const FaqListControls = ({
  faqList,
  currentPage,
  totalPages,
  onPageChange,
  onCreate,
  onUpdate,
  onDelete,
  isSubmitting = false,
}: FaqListControlsProps) => {
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

  const handleFormSubmit = async (value: FaqFormValueType) => {
    if (editingFaq) {
      await onUpdate(editingFaq.id, value);
      return;
    }

    await onCreate(value);
  };

  const handleDelete = async () => {
    if (!deletingFaq) {
      return;
    }

    await onDelete(deletingFaq.id);
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
        faqList={faqList}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onEdit={handleEditButtonClick}
        onDelete={handleDeleteButtonClick}
      />
      {isFormModalOpen && (
        <FaqFormModal
          faq={editingFaq}
          onClose={handleFormModalClose}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      {deletingFaq && (
        <FaqDeleteModal onClose={handleDeleteModalClose} onDelete={handleDelete} />
      )}
    </section>
  );
};

export default FaqListControls;
