import { FaqDeleteIcon, FaqDeleteVectorIcon, FaqEditIcon, FaqEditVectorIcon } from '@/assets';

import type { FaqItemType } from '../types/Faq';

interface FaqTableActionsProps {
  faq: FaqItemType;
  onEdit: (faq: FaqItemType) => void;
  onDelete: (faq: FaqItemType) => void;
}

const FaqTableActions = ({ faq, onEdit, onDelete }: FaqTableActionsProps) => {
  const handleEditButtonClick = () => {
    onEdit(faq);
  };

  const handleDeleteButtonClick = () => {
    onDelete(faq);
  };

  return (
    <div className='flex items-center gap-1'>
      <button
        type='button'
        aria-label={`${faq.question} FAQ 수정`}
        onClick={handleEditButtonClick}
        className='relative size-6 shrink-0 overflow-hidden'
      >
        <FaqEditIcon aria-hidden='true' className='absolute inset-0 size-full' />
        <FaqEditVectorIcon aria-hidden='true' className='absolute inset-0 size-full' />
      </button>
      <button
        type='button'
        aria-label={`${faq.question} FAQ 삭제`}
        onClick={handleDeleteButtonClick}
        className='relative size-6 shrink-0 overflow-hidden'
      >
        <FaqDeleteIcon aria-hidden='true' className='absolute inset-0 size-full' />
        <FaqDeleteVectorIcon aria-hidden='true' className='absolute inset-0 size-full' />
      </button>
    </div>
  );
};

export default FaqTableActions;
