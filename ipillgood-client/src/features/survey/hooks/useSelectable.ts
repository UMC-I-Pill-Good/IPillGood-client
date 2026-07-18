import { useState } from 'react';

interface UseSelectableOptions {
  max?: number;
}

const useSelectable = ({ max }: UseSelectableOptions = {}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      if (max !== undefined && prev.length >= max) {
        return prev;
      }

      return [...prev, id];
    });
  };

  return {
    selectedItems,
    handleSelect,
    setSelectedItems,
  };
};

export default useSelectable;
