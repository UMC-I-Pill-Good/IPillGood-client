import { useState } from 'react';

interface UseSelectableOptions {
  max?: number;
  exclusiveId?: string;
}

const useSelectable = ({ max, exclusiveId }: UseSelectableOptions = {}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedItems((prev) => {
      // 단독 선택 아이템(ex. 'none')
      if (exclusiveId && id === exclusiveId) {
        return prev.includes(id) ? [] : [id];
      }

      // 단독 선택 아이템이 선택되어 있었다면 제거
      const next = exclusiveId ? prev.filter((item) => item !== exclusiveId) : prev;

      // 이미 선택된 경우 해제
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
