import { type RecommendationItem } from '@/features/survey/types/recommendation';
import RecommendationCard from './RecommendationCard';

interface RecommendationListProps {
  items: RecommendationItem[];
}

const RecommendationList = ({ items }: RecommendationListProps) => {
  return (
    <section className='w-full min-w-0 space-y-2 overflow-x-hidden py-4'>
      {items.map((item, index) => (
        <RecommendationCard key={item.recommendationItemId} item={item} index={index} />
      ))}
    </section>
  );
};

export default RecommendationList;
