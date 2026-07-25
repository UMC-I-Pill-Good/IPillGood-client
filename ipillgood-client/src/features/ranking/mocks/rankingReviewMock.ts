import type { RankingReviewItem } from '../types/rankingReview';

export const MOCK_RANKING_REVIEWS: RankingReviewItem[] = [
  {
    reviewId: 1,
    nickname: '알약이',
    profileImageKey: 'mascot/profile-1.png',
    reviewerAgeGroup: 'TWENTIES',
    reviewerGender: 'MALE',
    rating: 3,
    content: '아침에 일어났을 때 피로감이 줄고, 확실히 컨디션이 좋아진 느낌이에요! 꾸준히 먹어보려구요~',
    imageKeys: ['photo-1', 'photo-2', 'photo-3'],
    helpfulCount: 1,
    helpedByMe: false,
    mine: true,
    createdAt: '2025-06-30T15:00:00',
  },
  {
    reviewId: 2,
    nickname: '필굿',
    profileImageKey: 'mascot/profile-1.png',
    reviewerAgeGroup: 'TWENTIES',
    reviewerGender: 'MALE',
    rating: 3,
    content: '꾸준히 섭취하니 일상 컨디션 관리에 도움이 되는 것 같아요.',
    imageKeys: ['photo-4', 'photo-5', 'photo-6'],
    helpfulCount: 3,
    helpedByMe: false,
    mine: false,
    createdAt: '2025-06-30T15:00:00',
  },
];

export const MOCK_EMPTY_RANKING_REVIEW_PRODUCT_ID = 9002;
