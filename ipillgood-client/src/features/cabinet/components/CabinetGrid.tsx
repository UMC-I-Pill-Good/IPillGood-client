import { cabinetItems } from '../mocks/cabinet.mocks';
import EmptyCabinetCard from './EmptyCabinetCard';
import CabinetCard from './CabinetCard';

interface CabinetGridProps {
  mode: 'default' | 'add' | 'delete';
}

const MAX_COUNT = 9;

const CabinetGrid = ({ mode }: CabinetGridProps) => {
  const slots = Array.from({ length: MAX_COUNT }, (_, index) => cabinetItems[index]);

  return (
    <section className='no-center-glass grid grid-cols-3 gap-4 rounded-[20px] bg-white/20 mx-5 px-5 py-4 shadow-[4px_4px_20px_rgba(155,161,255,0.3),inset_4px_4px_4px_rgba(255,255,255,0.2)]'>
      {slots.map((item, index) =>
        item ? (
          <CabinetCard key={index} item={item} />
        ) : (
          <EmptyCabinetCard mode={mode} key={`empty-${index}`} />
        ),
      )}
    </section>
  );
};

export default CabinetGrid;
