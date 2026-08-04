'use client';

import { useState } from 'react';
import CabinetGrid from '../CabinetGrid';
import DeleteButtonSection from './DeleteButtonSection';

const CabinetDeleteContent = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <>
      <CabinetGrid mode='delete' onDeleteSelectionChange={setSelectedIds} />
      <DeleteButtonSection selectedIds={selectedIds} />
    </>
  );
};

export default CabinetDeleteContent;
