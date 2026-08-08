import type { AgeGroup, ApiResponse, Gender } from '@/shared/types';

export type ReviewSort = 'LATEST' | 'LIKE_COUNT_DESC';
export type ReviewReportReason = 'AD_PROMOTION' | 'ABUSE' | 'FALSE_INFO' | 'PERSONAL_INFO' | 'ETC';

export type ReviewImageContentType = 'image/jpeg' | 'image/png' | 'image/webp';

export type ReviewImageUploadRequest = {
  contentTypes: ReviewImageContentType[];
};

export type PresignedReviewUpload = {
  key: string;
  uploadUrl: string;
};

export type ReviewImageUploadResult = {
  images: PresignedReviewUpload[];
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
  profileImageUrl: string | null;
  ageGroup: AgeGroup;
  gender: Gender;
  rating: number;
  content: string;
  reviewImageUrls: string[];
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
  nextCursor: string | null;
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
  productId: number;
  rating: number;
  content: string;
  imageUrls: string[];
  helpfulCount: number;
  createdAt: string;
};

export type CreateReviewApiResponse = ApiResponse<CreateReviewResult>;

export type UpdateRankingReviewRequest = {
  rating: number;
  content: string;
  imageKeys: string[];
};

export type UpdateRankingReviewResult = {
  reviewId: number;
  rating: number;
  content: string;
  imageUrls: string[];
  updatedAt: string;
};

export type UpdateRankingReviewApiResponse = ApiResponse<UpdateRankingReviewResult>;

export type MyReviewResult = {
  reviewId: number;
  productId: number;
  rating: number;
  content: string;
  imageKeys: string[];
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
};

export type MyReviewApiResponse = ApiResponse<MyReviewResult>;

export type DeleteReviewResult = {
  deleted: boolean;
  reviewId: number;
};

export type DeleteReviewApiResponse = ApiResponse<DeleteReviewResult>;

export type ReviewHelpfulResult = {
  helpful: boolean;
  reviewId: number;
  helpfulCount: number;
};

export type ReviewHelpfulApiResponse = ApiResponse<ReviewHelpfulResult>;

export type CreateReviewReportRequest = {
  reason: ReviewReportReason;
  detail?: string | null;
};

export type CreateReviewReportResult = {
  reportId: number;
  reviewId: number;
  reason: ReviewReportReason;
  createdAt: string;
};

export type CreateReviewReportApiResponse = ApiResponse<CreateReviewReportResult>;
