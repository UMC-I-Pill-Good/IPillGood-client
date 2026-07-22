import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HEALTH_SYSTEM_OPTION_LIST } from '../constants/healthStatusOptionList';

export const useHealthStatusSelection = () => {
  const router = useRouter();

  // 대분류 및 소분류 선택 상태 (단일 선택)
  const [selectedSystemKey, setSelectedSystemKey] = useState<string | null>(null);
  const [selectedBodyPartKey, setSelectedBodyPartKey] = useState<string | null>(null);

  // 상단 대분류 카드 클릭 핸들러
  const handleSystemSelect = (systemKey: string) => {
    setSelectedSystemKey(systemKey);
    setSelectedBodyPartKey(null); // 대분류 전환 시 소분류 선택 초기화
  };

  // 하단 소분류 칩 클릭 핸들러
  const handleBodyPartSelect = (bodyPartKey: string) => {
    setSelectedBodyPartKey(bodyPartKey);
  };

  // 현재 선택된 대분류 객체 탐색
  const selectedSystem = HEALTH_SYSTEM_OPTION_LIST.find(
    (system) => system.key === selectedSystemKey,
  );

  // 선택 완료 CTA 클릭 핸들러
  const handleComplete = () => {
    if (!selectedSystemKey || !selectedBodyPartKey || !selectedSystem) return;

    const selectedPart = selectedSystem.bodyPartList.find(
      (part) => part.key === selectedBodyPartKey,
    );

    if (selectedPart) {
      const queryParams = new URLSearchParams({
        majorCategory: selectedSystemKey,
        majorCategoryLabel: selectedSystem.label.replace('\n', ' '),
        minorCategory: selectedBodyPartKey,
        minorCategoryLabel: selectedPart.label,
      }).toString();

      router.push(`/condition/health-status/result?${queryParams}`);
    }
  };

  const isFormValid = Boolean(selectedSystemKey && selectedBodyPartKey);

  return {
    selectedSystemKey,
    selectedBodyPartKey,
    selectedSystem,
    handleSystemSelect,
    handleBodyPartSelect,
    handleComplete,
    isFormValid,
    isPending: false,
  };
};
