'use client';
import { SearchBar } from '@/shared/components';
import { useFaqFilter } from '../../hooks/useFaqFilter';
import FaqAccordion from './FaqAccordion';
import FaqCategoryOptions from './FaqCategoryOptions';
import ContactSection from './ContactSection';

const FaqSection = () => {
  const { keyword, setKeyword, selectedCategory, filteredFaqList, handleSelectCategory } =
    useFaqFilter();

  return (
    <section className='px-5 pt-4 pb-20'>
      <h2 className='text-black typo-body-5'>자주 묻는 질문 (FAQ)</h2>
      <SearchBar
        isFilterButton={false}
        value={keyword}
        onChange={setKeyword}
        placeholder='키워드로 검색해 주세요.'
        className='mt-2 h-12'
      />

      <FaqCategoryOptions
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <FaqAccordion faqList={filteredFaqList} />

      <ContactSection
        showTitle={false}
        showHours={false}
        caption='원하는 질문이 없으신가요? 상단 메일로 문의해 주세요!'
        className='mt-21.75 flex flex-col gap-2'
      />
    </section>
  );
};

export default FaqSection;
