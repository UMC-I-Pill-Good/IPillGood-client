'use client';

import { useState } from 'react';
import CabinetGrid from '../CabinetGrid';
import IntakeAddButtonSection from './IntakeAddButtonSection';

const IntakeAddContent = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <>
      <CabinetGrid mode='add' onAddSelectionChange={setSelectedIds} />
      <IntakeAddButtonSection selectedIds={selectedIds} />
    </>
  );
};

export default IntakeAddContent;
