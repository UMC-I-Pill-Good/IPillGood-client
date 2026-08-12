'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import EmptyCabinetCard from './EmptyCabinetCard';
import CabinetCard from './CabinetCard';
import { ProductItem } from '../types/cabinet';
import {
  ConfirmModal,
  FetchError,
  LoadingSpinner,
  SupplementDetailBottomSheet,
} from '@/shared/components';
import { useCabinetProductsQuery, useReviewPrompt } from '../hooks';
import clsx from 'clsx';

interface CabinetGridProps {
  mode: 'default' | 'add' | 'delete';
  onAddSelectionChange?: (selectedIds: number[]) => void;
  onDeleteSelectionChange?: (selectedIds: number[]) => void;
}

const MAX_COUNT = 9;

const CabinetGrid = ({ mode, onAddSelectionChange, onDeleteSelectionChange }: CabinetGridProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedMemberProductId, setSelectedMemberProductId] = useState<number | null>(null);

  const { data, isPending, isError, refetch } = useCabinetProductsQuery();

  const {
    duePrompt,
    isOpen: isReviewPromptModalOpen,
    dismiss,
    navigateToReviewAdd,
  } = useReviewPrompt(mode === 'default');

  const products = useMemo(
    () =>
      [...(data?.result.products ?? [])].sort(
        (a, b) => new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime(),
      ),
    [data?.result.products],
  );

  const takingIds = useMemo(
    () => products.filter((item) => item.isActiveIntake).map((item) => item.memberProductId),
    [products],
  );

  const [selectedIds, setSelectedIds] = useState<number[]>(
    mode === 'add'
      ? products.filter((item) => item.isActiveIntake).map((item) => item.memberProductId)
      : [],
  );

  useEffect(() => {
    if (mode === 'add') {
      onAddSelectionChange?.(selectedIds.filter((id) => !takingIds.includes(id)));
    }

    if (mode === 'delete') {
      onDeleteSelectionChange?.(selectedIds);
    }
  }, [mode, onAddSelectionChange, onDeleteSelectionChange, selectedIds, takingIds]);

  const handleAddSelect = (item: ProductItem) => {
    if (item.isActiveIntake) return;

    setSelectedIds((prev) => {
      if (prev.includes(item.memberProductId)) {
        return takingIds;
      }

      return [...takingIds, item.memberProductId];
    });
  };

  const handleDeleteSelect = (item: ProductItem) => {
    setSelectedIds((prev) =>
      prev.includes(item.memberProductId)
        ? prev.filter((id) => id !== item.memberProductId)
        : [...prev, item.memberProductId],
    );
  };

  const handleCardClick = (item: ProductItem) => {
    if (mode === 'default') {
      setSelectedMemberProductId(item.memberProductId);
      setIsBottomSheetOpen(true);
      return;
    }

    if (mode === 'add') {
      handleAddSelect(item);
    } else {
      handleDeleteSelect(item);
    }
  };

  const slots =
    products.length > MAX_COUNT
      ? products
      : Array.from({ length: MAX_COUNT }, (_, index) => products[index]);
  const hasOverflowProducts = products.length >= MAX_COUNT;

  if (isPending) return <LoadingSpinner />;

  if (isError) {
    return (
      <FetchError description='캐비닛 정보를 불러오지 못했습니다.' onRetry={() => refetch()} />
    );
  }

  return (
    <>
      <section
        className={clsx(
          'no-center-glass mx-5 grid grid-cols-3 gap-4 rounded-[20px] bg-white/20 px-5 py-4 shadow-[4px_4px_20px_rgba(155,161,255,0.3),inset_4px_4px_4px_rgba(255,255,255,0.2)]',
          hasOverflowProducts && 'max-h-120 overflow-y-auto thin-scrollbar',
        )}
      >
        {slots.map((item, index) =>
          item ? (
            <CabinetCard
              key={item.memberProductId}
              mode={mode}
              item={item}
              isSelected={selectedIds.includes(item.memberProductId)}
              onClick={handleCardClick}
            />
          ) : mode === 'default' && index === products.length ? (
            <EmptyCabinetCard key={`empty-${index}`} mode={mode} showAddButton />
          ) : (
            <EmptyCabinetCard key={`empty-${index}`} mode={mode} />
          ),
        )}
        {mode === 'default' && hasOverflowProducts && (
          <EmptyCabinetCard key='overflow-add' mode={mode} showAddButton />
        )}
      </section>

      <SupplementDetailBottomSheet
        open={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
        memberProductId={selectedMemberProductId}
      />

      {isReviewPromptModalOpen && (
        <ConfirmModal
          title={
            <p className='break-keep typo-body-9'>
              <span className='text-primary-700'>
                [{duePrompt?.productName} 영양제]를 추가한 지 30일이 지났어요!
              </span>
            </p>
          }
          content='해당 영양제의 후기를 남겨보세요.'
          cancelLabel='닫기'
          confirmLabel='후기 작성'
          onCancel={dismiss}
          onConfirm={navigateToReviewAdd}
        />
      )}
    </>
  );
};

export default memo(CabinetGrid);
