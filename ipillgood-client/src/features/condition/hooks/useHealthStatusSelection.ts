import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  HEALTH_CONCERN_ICON_MAP,
  TWO_LINE_HEALTH_SYSTEM_TYPE_SET,
} from '../constants/healthStatusOptionList';
import { useHealthConcernCategories } from './useHealthConcernCategories';
import { type HealthSystemType } from '../types/healthStatus';

export const useHealthStatusSelection = () => {
  const router = useRouter();
  const {
    data: categoryData,
    error: categoryError,
    isLoading,
    refetch: refetchCategoryList,
  } = useHealthConcernCategories();

  const systemList = useMemo<HealthSystemType[]>(
    () =>
      categoryData?.majorCategories.map((majorCategory) => {
        const isTwoLine = TWO_LINE_HEALTH_SYSTEM_TYPE_SET.has(majorCategory.type);
        const label = isTwoLine
          ? majorCategory.label.replace(/\s*및\s*/, '\n및 ')
          : majorCategory.label;
        const iconKey = majorCategory.type as keyof typeof HEALTH_CONCERN_ICON_MAP;

        return {
          key: majorCategory.type,
          label,
          icon: HEALTH_CONCERN_ICON_MAP[iconKey] ?? HEALTH_CONCERN_ICON_MAP.FALLBACK,
          isTwoLine,
          bodyPartList: majorCategory.minorCategories.map((minorCategory) => ({
            key: minorCategory.type,
            label: minorCategory.label,
          })),
        };
      }) ?? [],
    [categoryData],
  );

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
  const selectedSystem = systemList.find((system) => system.key === selectedSystemKey);

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

  const isFormValid = Boolean(
    selectedSystem &&
    selectedBodyPartKey &&
    selectedSystem.bodyPartList.some((part) => part.key === selectedBodyPartKey),
  );

  return {
    selectedSystemKey,
    selectedBodyPartKey,
    systemList,
    selectedSystem,
    handleSystemSelect,
    handleBodyPartSelect,
    handleComplete,
    isFormValid,
    isPending: isLoading,
    categoryError,
    refetchCategoryList,
  };
};
