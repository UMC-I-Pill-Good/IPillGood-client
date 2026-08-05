'use client';

import { useState } from 'react';
import CabinetGrid from '../CabinetGrid';
import DeleteButtonSection from './DeleteButtonSection';

const SupplementDeleteContent = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <>
      <CabinetGrid mode='delete' onDeleteSelectionChange={setSelectedIds} />
      <DeleteButtonSection selectedIds={selectedIds} />
    </>
  );
};

export default SupplementDeleteContent;
