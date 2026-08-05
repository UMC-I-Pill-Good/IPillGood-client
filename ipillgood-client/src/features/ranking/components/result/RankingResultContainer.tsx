'use client';

import { useRankingResult } from '../../hooks/useRankingResult';
import RankingResultContent from './RankingResultContent';
import RankingResultFilterSheet from './RankingResultFilterSheet';
import RankingResultSearchSection from './RankingResultSearchSection';

const RankingResultContainer = () => {
  const controller = useRankingResult();
  const { ranking } = controller;

  return (
    <main className='flex min-h-dvh w-full flex-col overflow-x-hidden px-5 pb-24 pt-4'>
      <RankingResultSearchSection
        value={controller.searchValue}
        submittedValue={controller.submittedSearchTerm}
        onChange={controller.setSearchValue}
        onSearch={() => void controller.handleSubmitSearch()}
        onFilterClick={controller.handleOpenFilter}
        onCancel={controller.handleCancel}
      />

      <RankingResultContent
        data={{
          viewState: controller.viewState,
          activeFilterCount: controller.activeFilterCount,
          items: ranking.items,
          totalElements: ranking.totalElements,
          message: ranking.message,
          selectedSort: controller.selectedSort,
          skeletonCardCount: controller.skeletonCardCount,
          hasNext: ranking.hasNext,
          isLoadingMore: ranking.isLoadingMore,
        }}
        handlers={{
          onOpenFilter: controller.handleOpenFilter,
          onSortChange: controller.handleSortChange,
          onLoadMore: ranking.loadMore,
          onRetry: controller.handleRetry,
          setSkeletonCardCount: controller.setSkeletonCardCount,
        }}
      />

      <RankingResultFilterSheet
        open={controller.isFilterOpen}
        filters={controller.draftFilters}
        onChange={controller.setDraftFilters}
        onClose={controller.handleCloseFilter}
        onReset={controller.handleResetFilter}
        onApply={controller.handleApplyFilter}
      />
    </main>
  );
};

export default RankingResultContainer;
