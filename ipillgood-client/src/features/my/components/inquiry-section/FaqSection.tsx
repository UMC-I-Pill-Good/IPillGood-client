'use client';
import { FetchError, LoadingSpinner, SearchBar } from '@/shared/components';
import { useFaqFilter } from '../../hooks/useFaqFilter';
import FaqAccordion from './FaqAccordion';
import FaqCategoryOptions from './FaqCategoryOptions';
import ContactSection from './ContactSection';
import { useSupport } from '../../hooks/useSupport';
import { MascotSadIcon } from '@/assets';

const FaqSection = () => {
  const {
    keyword,
    setKeyword,
    selectedCategory,
    filteredFaqList,
    handleSearch,
    isLoading,
    isError,
    refetch,
    handleSelectCategory,
  } = useFaqFilter();

  const { data } = useSupport();

  const renderFaqList = () => {
    if (isLoading) {
      return <LoadingSpinner className='min-h-0 py-15' />;
    }

    if (isError) {
      return (
        <FetchError
          className='min-h-0 py-15'
          description='FAQ를 불러오지 못했습니다.'
          onRetry={() => refetch()}
        />
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
