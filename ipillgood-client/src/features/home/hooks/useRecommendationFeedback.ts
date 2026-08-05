import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getRecommendationFeedbackCyclesDue,
  postRecommendationFeedbackCyclesResponse,
} from '../api/recommendationFeedback';
import { useCallback, useEffect, useState } from 'react';

export const useRecommendationFeedback = () => {
  const { data } = useQuery({
    queryKey: ['recommendationFeedbackCyclesDue'],
    queryFn: getRecommendationFeedbackCyclesDue,
    select: (res) => res.result,
    staleTime: 1000 * 60 * 5,
  });

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSurveyRetakeModalOpen, setIsSurveyRetakeModalOpen] = useState(false);
  const [sectionNode, setSectionNode] = useState<HTMLElement | null>(null);
  const queryClient = useQueryClient();

  const sectionRef = useCallback((node: HTMLElement | null) => {
    setSectionNode(node);
  }, []);

  // due === true일 때만, 섹션이 화면에 일정 비율 이상 보이는 상태로 5초 유지되면 모달 오픈
  useEffect(() => {
    if (!sectionNode || !data?.due) return;

    let timerId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerId = setTimeout(() => {
            setIsFeedbackModalOpen(true);
            observer.disconnect();
          }, 5000);
        } else if (timerId) {
          clearTimeout(timerId);
          timerId = null;
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(sectionNode);

    return () => {
      observer.disconnect();
      if (timerId) clearTimeout(timerId);
    };
  }, [sectionNode, data?.due]);

  const responseMutation = useMutation({
    mutationFn: (responseType: 'HELPFUL' | 'UNSURE') =>
      postRecommendationFeedbackCyclesResponse(data!.cycleId!, { responseType }),
    onSuccess: (_result, responseType) => {
      setIsFeedbackModalOpen(false);
      // UNSURE(도움 안 됨)면 설문 다시 작성 유도 모달로 이어짐
      if (responseType === 'UNSURE') {
        setIsSurveyRetakeModalOpen(true);
      }
      // due 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['recommendationFeedbackCyclesDue'] });
    },
  });

  return {
    sectionRef,
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
    isSurveyRetakeModalOpen,
    setIsSurveyRetakeModalOpen,
    handleSubmit: responseMutation.mutate,
  };
};
