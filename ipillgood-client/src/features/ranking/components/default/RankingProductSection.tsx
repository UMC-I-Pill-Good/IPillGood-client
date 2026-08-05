import { FetchError } from '@/shared/components';
import type { ProductSearchItemDto, RankingUiSort } from '../../types/ranking';
import RankingResultSkeletonCard from '../result/RankingResultSkeletonCard';
import RankingSupplementList from './RankingSupplementList';
import RankingToolbar from './RankingToolbar';

const RANKING_SKELETON_CARD_COUNT = 4;
const RANKING_LOAD_MORE_SKELETON_CARD_COUNT = 2;

interface RankingProductSectionProps {
  selectedSort: RankingUiSort;
  items: ProductSearchItemDto[];
  message: string | null;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  onSortChange: (sort: RankingUiSort) => void;
  onRetry: () => void;
}

const RankingProductSection = ({
  selectedSort,
  items,
  message,
  isInitialLoading,
  isLoadingMore,
  loadMoreRef,
  onSortChange,
  onRetry,
}: RankingProductSectionProps) => (
  <section className='w-full px-5 py-4'>
    <div className='flex w-full flex-col gap-3'>
      <RankingToolbar selectedSort={selectedSort} onSortChange={onSortChange} />
      {isInitialLoading ? (
        <section
          className='flex w-full flex-col gap-3'
          aria-label='랭킹 데이터를 불러오는 중'
          aria-busy='true'
        >
          {Array.from({ length: RANKING_SKELETON_CARD_COUNT }, (_, index) => (
            <RankingResultSkeletonCard key={index} />
          ))}
        </section>
      ) : message ? (
        <FetchError description={message} onRetry={onRetry} />
      ) : (
        <>
          <RankingSupplementList items={items} />
          {isLoadingMore && (
            <section
              className='flex w-full flex-col gap-3'
              aria-label='랭킹 데이터를 추가로 불러오는 중'
              aria-busy='true'
            >
              {Array.from({ length: RANKING_LOAD_MORE_SKELETON_CARD_COUNT }, (_, index) => (
                <RankingResultSkeletonCard key={index} />
              ))}
            </section>
          )}
          <div ref={loadMoreRef} className='h-px w-full' />
        </>
      )}
    </div>
  </section>
);

export default RankingProductSection;
