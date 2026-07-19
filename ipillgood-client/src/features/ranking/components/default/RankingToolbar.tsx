import SortDropdown from './SortDropdown';
import type { RankingUiSort } from '../../types/ranking';

interface RankingToolbarProps {
  selectedSort: RankingUiSort;
  onSortChange: (sort: RankingUiSort) => void;
}

const RankingToolbar = ({
  selectedSort,
  onSortChange,
}: RankingToolbarProps) => {
  return (
    <section className='flex w-full items-end justify-between gap-3'>
      <div className='flex min-w-0 items-center gap-1'>
        <h1 className='typo-body-5 text-black'>랭킹</h1>
        <p className='typo-caption-7 truncate text-neutral-800'>
          *실시간 구매 데이터 기반
        </p>
      </div>
      <SortDropdown selectedSort={selectedSort} onSortChange={onSortChange} />
    </section>
  );
};

export default RankingToolbar;
