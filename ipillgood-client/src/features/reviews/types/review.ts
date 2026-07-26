import type { AgeGroup, ApiResponse, Gender } from '@/shared/types';

export type ReviewSort = 'LATEST' | 'LIKE_COUNT_DESC';
export type ReviewAgeGroup = AgeGroup;
export type ReviewGender = Gender;
export type ReviewReportReason = 'AD_PROMOTION' | 'ABUSE' | 'FALSE_INFO' | 'PERSONAL_INFO' | 'ETC';

export type RankingReviewReportRequest = {
  reason: ReviewReportReason;
  detail?: string | null;
};

export type RankingReviewReportResult = {
  reportId: number;
  reviewId: number;
  reason: ReviewReportReason;
  createdAt: string;
};

export type RankingReviewReportApiResponse = ApiResponse<RankingReviewReportResult>;

export type ReviewImageContentType = 'image/jpeg' | 'image/png' | 'image/webp';

export type ReviewImageUploadRequest = {
  images: {
    fileName: string;
    contentType: ReviewImageContentType;
    displayOrder: number;
  }[];
};

export type PresignedReviewUpload = {
  imageKey: string;
  presignedUrl: string;
  displayOrder: number;
  expiresAt: string;
};

export type ReviewImageUploadResult = {
  uploads: PresignedReviewUpload[];
};

export type ReviewImageUploadApiResponse = ApiResponse<ReviewImageUploadResult>;

export type RankingReviewQuery = {
  productId: number;
  sort?: ReviewSort;
  size?: number;
  cursor?: string;
};

export type RankingReviewItem = {
  reviewId: number;
  nickname: string;
  profileImageKey: string;
  reviewerAgeGroup: ReviewAgeGroup;
  reviewerGender: ReviewGender;
  rating: number;
  content: string;
  imageKeys: string[];
  helpfulCount: number;
  helpedByMe: boolean;
  mine: boolean;
  createdAt: string;
};

export type RankingReviewResult = {
  productId: number;
  reviewCount: number;
  ratingAverage: number | null;
  reviews: RankingReviewItem[];
  size: number;
  nextCursor: string;
  sort: ReviewSort;
  hasNext: boolean;
};

export type RankingReviewApiResponse = ApiResponse<RankingReviewResult>;

export type CreateReviewRequest = {
  productId: number;
  rating: number;
  content: string;
  imageKeys: string[];
};

export type CreateReviewResult = {
  reviewId: number;
};

export type CreateReviewApiResponse = ApiResponse<CreateReviewResult>;

export type RankingReviewDeleteResult = {
  deleted: boolean;
  reviewId: number;
};

export type RankingReviewDeleteApiResponse = ApiResponse<RankingReviewDeleteResult>;

export type UpdateRankingReviewRequest = {
  rating?: number | null;
  content?: string | null;
  imageKeys?: string[];
};

export type UpdateRankingReviewResult = {
  reviewId: number;
  rating: number;
  content: string;
  imageKeys: string[];
  updatedAt: string;
};

export type UpdateRankingReviewApiResponse = ApiResponse<UpdateRankingReviewResult>;

export type RankingReviewHelpfulResult = {
  helpful: boolean;
  reviewId: number;
  helpfulCount: number;
};

export type RankingReviewHelpfulApiResponse = ApiResponse<RankingReviewHelpfulResult>;
