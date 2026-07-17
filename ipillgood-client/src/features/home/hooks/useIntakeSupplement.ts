import { useState } from 'react';
import { mockIntakeSupplementList } from '../mocks/intakeSupplement.mock';

export const useIntakeSupplement = () => {
  const [list, setList] = useState(mockIntakeSupplementList);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const handleDeleteConfirm = () => {
    // TODO: 실제 삭제 API 연동 (연동 시 성공 응답 후 list 갱신)
    setList((prev) => prev.filter((item) => item.userSupplementId !== deleteTargetId));
    setDeleteTargetId(null);
  };

  return {
    list,
    deleteTargetId,
    setDeleteTargetId,
    handleDeleteConfirm,
  };
};
