import RankingSearchBar from '../default/RankingSearchBar';

interface RankingResultSearchSectionProps {
  value: string;
  submittedValue: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onFilterClick: () => void;
  onCancel: () => void;
}

const RankingResultSearchSection = ({
  value,
  submittedValue,
  onChange,
  onSearch,
  onFilterClick,
  onCancel,
}: RankingResultSearchSectionProps) => (
  <section className='flex w-full items-center gap-1'>
    <RankingSearchBar
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      onFilterClick={onFilterClick}
      className='flex-1'
      searchBarClassName='h-11'
      showFilterButton={value.trim() === submittedValue.trim()}
    />
    <button
      type='button'
      className='glass rounded-full px-3 typo-caption-2 text-primary-600'
      onClick={onCancel}
    >
      취소
    </button>
  </section>
);

export default RankingResultSearchSection;
