'use client';

import { TextButton } from '@/shared/components';
import { FAQ_CATEGORY_OPTION_LIST } from '../../constants/faqCategory';
import type { FaqCategoryType } from '../../types/faq.type';

interface FaqCategoryOptionsProps {
  selectedCategory: FaqCategoryType | 'ALL';
  onSelectCategory: (category: FaqCategoryType | 'ALL') => void;
}

const FaqCategoryOptions = ({ selectedCategory, onSelectCategory }: FaqCategoryOptionsProps) => {
  return (
    <div className='flex gap-2 mt-3 mb-5 pb-1 overflow-x-auto hide-scrollbar'>
      {FAQ_CATEGORY_OPTION_LIST.map((option) => (
        <TextButton
          key={option.value}
          type='button'
          text={option.label}
          size='sm'
          variant={selectedCategory === option.value ? 'secondary' : 'assistive'}
          onClick={() => onSelectCategory(option.value)}
          className='px-4'
        />
      ))}
    </div>
  );
};

export default FaqCategoryOptions;
