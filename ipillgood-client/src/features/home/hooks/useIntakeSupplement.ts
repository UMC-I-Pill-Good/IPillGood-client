import { useState } from 'react';
import { mockIntakeSupplementList } from '../api/intakeSupplement.mock';

export const useIntakeSupplement = () => {
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const handleDeleteConfirm = () => {
    // TODO: 실제 삭제 로직
    setDeleteTargetId(null);
  };

  return {
    list: mockIntakeSupplementList,
    deleteTargetId,
    setDeleteTargetId,
    handleDeleteConfirm,
  };
};
