import type { RankingFilterState } from '../../types/rankingFilter';
import RankingFilterBottomSheet from '../default/RankingFilterBottomSheet';

interface RankingResultFilterSheetProps {
  open: boolean;
  filters: RankingFilterState;
  onChange: (filters: RankingFilterState) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
}

const RankingResultFilterSheet = ({
  open,
  filters,
  onChange,
  onClose,
  onReset,
  onApply,
}: RankingResultFilterSheetProps) => (
  <RankingFilterBottomSheet
    open={open}
    onClose={onClose}
    draftFilters={filters}
    onDraftFiltersChange={onChange}
    onReset={onReset}
    onApply={onApply}
  />
);

export default RankingResultFilterSheet;
