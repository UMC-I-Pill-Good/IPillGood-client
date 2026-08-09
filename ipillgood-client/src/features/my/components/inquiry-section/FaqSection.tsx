'use client';
import { SearchBar } from '@/shared/components';
import { useFaqFilter } from '../../hooks/useFaqFilter';
import FaqAccordion from './FaqAccordion';
import FaqCategoryOptions from './FaqCategoryOptions';
import ContactSection from './ContactSection';
import { useSupport } from '../../hooks/useSupport';
import { MascotSadIcon } from '@/assets';
import { Loader2 } from 'lucide-react';

const FaqSection = () => {
  const {
    keyword,
    setKeyword,
    selectedCategory,
    filteredFaqList,
    handleSearch,
    isLoading,
    isError,
    handleSelectCategory,
  } = useFaqFilter();

  const { data } = useSupport();

  const renderFaqList = () => {
    if (isLoading) {
      return (
        <div className='flex flex-col items-center py-15 gap-4'>
          <Loader2 className='text-primary size-10 animate-spin' />
          <p className='typo-body-10 text-neutral'>데이터를 불러오고 있습니다...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className='flex flex-col items-center py-5'>
          <MascotSadIcon />
          <p className='typo-body-6 text-primary-700'>FAQ를 불러오지 못했습니다.</p>
        </div>
      );
    }

    if (filteredFaqList.length === 0) {
      return (
        <div className='flex flex-col items-center py-5 '>
          <MascotSadIcon />
          <p className='typo-body-6 text-primary-700'>검색 결과가 존재하지 않아요...</p>
        </div>
      );
    }

    return <FaqAccordion faqList={filteredFaqList} />;
  };

  return (
    <section className='px-5 pt-4 pb-28.5 flex-1 flex flex-col'>
      <h2 className='text-black typo-body-5'>자주 묻는 질문 (FAQ)</h2>
      <SearchBar
        isFilterButton={false}
        value={keyword}
        onChange={setKeyword}
        placeholder='키워드로 검색해 주세요.'
        onSearch={handleSearch}
        className='mt-2 h-12'
      />

      <FaqCategoryOptions
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <div className='flex flex-col gap-22 flex-1'>
        {renderFaqList()}
        <ContactSection
          contactEmail={data?.contactEmail ?? ''}
          showTitle={false}
          showHours={false}
          caption='원하는 질문이 없으신가요? 상단 메일로 문의해 주세요!'
          className='mt-auto flex flex-col gap-2'
        />
      </div>
    </section>
  );
};

export default FaqSection;
