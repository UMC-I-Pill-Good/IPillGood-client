import { useState } from 'react';

export const useSupplementSelection = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  return { selectedIds, setSelectedIds, toggle };
};
