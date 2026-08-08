import { AdminSearchBar } from '@/shared/components';

import type { FaqCategoryType } from '../constants/FaqCategory';
import FaqCategoryFilter from './FaqCategoryFilter';

interface FaqSearchFilterSectionProps {
  searchValue: string;
  selectedCategory: FaqCategoryType;
  onSearchValueChange: (value: string) => void;
  onSearch: (value: string) => void;
  onCategoryChange: (category: FaqCategoryType) => void;
}

const FaqSearchFilterSection = ({
  searchValue,
  selectedCategory,
  onSearchValueChange,
  onSearch,
  onCategoryChange,
}: FaqSearchFilterSectionProps) => {

  return (
    <section aria-label='FAQ 검색 및 필터' className='flex items-center gap-4 px-10 pb-4 pt-8'>
      <div className='min-w-0 basis-[551px]'>
        <AdminSearchBar
          value={searchValue}
          onChange={onSearchValueChange}
          onSearch={onSearch}
          placeholder='제목으로 검색'
        />
      </div>
      <FaqCategoryFilter value={selectedCategory} onChange={onCategoryChange} />
    </section>
  );
};

export default FaqSearchFilterSection;
