import { Dispatch, SetStateAction, useState } from 'react';

interface UseSelectableOptions<T extends string> {
  max?: number;
  exclusiveId?: T;
  selectedItems?: T[];
  setSelectedItems?: Dispatch<SetStateAction<T[]>>;
}

const useSelectable = <T extends string>({
  max,
  exclusiveId,
  selectedItems: externalSelectedItems,
  setSelectedItems: externalSetSelectedItems,
}: UseSelectableOptions<T> = {}) => {
  const [internalSelectedItems, setInternalSelectedItems] = useState<T[]>([]);

  const selectedItems = externalSelectedItems ?? internalSelectedItems;
  const setSelectedItems = externalSetSelectedItems ?? setInternalSelectedItems;

  const handleSelect = (id: T) => {
    setSelectedItems((prev) => {
      // 단독 선택
      if (exclusiveId && id === exclusiveId) {
        return prev.includes(id) ? [] : [id];
      }

      // 단독 선택 제거
      const next = exclusiveId ? prev.filter((item) => item !== exclusiveId) : prev;

      // 선택 해제
      if (next.includes(id)) {
        return next.filter((item) => item !== id);
      }

      // 최대 개수 제한
      if (max !== undefined && next.length >= max) {
        return next;
      }

      return [...next, id];
    });
  };

  return {
    selectedItems,
    handleSelect,
    setSelectedItems,
  };
};

export default useSelectable;
