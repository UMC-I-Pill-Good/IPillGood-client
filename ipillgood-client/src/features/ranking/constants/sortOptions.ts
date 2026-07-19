import type { RankingUiSort } from '../types/ranking';

export const RANKING_UI_SORT_LABELS: Record<RankingUiSort, string> = {
  REVIEW_COUNT: '후기 많은 순',
  RATING: '평점 높은 순',
};

export const RANKING_UI_SORT_OPTIONS = [
  'REVIEW_COUNT',
  'RATING',
] as const satisfies readonly RankingUiSort[];
