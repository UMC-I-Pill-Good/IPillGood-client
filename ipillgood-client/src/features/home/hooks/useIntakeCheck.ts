import { useState } from 'react';
import { mockIntakeSupplementList } from '../api/intakeSupplement.mock';

export const useIntakeCheck = () => {
  const [checkedIdList, setCheckedIdList] = useState<number[]>([]);

  const handleToggleCheck = (userSupplementId: number) => {
    setCheckedIdList((prev) =>
      prev.includes(userSupplementId)
        ? prev.filter((id) => id !== userSupplementId)
        : [...prev, userSupplementId],
    );
  };

  return {
    list: mockIntakeSupplementList,
    checkedIdList,
    handleToggleCheck,
  };
};
