import type { RankingItemDto } from '../../types/ranking';
import SupplementProductCard from './SupplementProductCard';

interface RankingSupplementListProps {
  items: RankingItemDto[];
}

const RankingSupplementList = ({ items }: RankingSupplementListProps) => {
  if (items.length === 0) {
    return (
      <section className='flex min-h-32 w-full items-center justify-center rounded-2xl bg-white/50 px-5 py-8 typo-caption-2 text-neutral-800'>
        검색 결과가 없습니다.
      </section>
    );
  }

  return (
    <section className='flex w-full flex-col gap-2'>
      {items.map((item, index) => (
        <SupplementProductCard
          key={item.productId}
          item={item}
          displayRank={index + 1}
        />
      ))}
    </section>
  );
};

export default RankingSupplementList;
