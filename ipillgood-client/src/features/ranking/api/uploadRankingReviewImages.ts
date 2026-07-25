import type {
  ReviewImageContentType,
  ReviewImageUploadApiResponse,
  ReviewImageUploadRequest,
} from '../types/rankingReview';

const REVIEW_IMAGE_UPLOAD_PATH = '/api/v1/reviews/images/presigned-urls';

export const uploadRankingReviewImages = async (
  fileList: File[],
  displayOrderList: number[],
): Promise<string[]> => {
  const request: ReviewImageUploadRequest = {
    images: fileList.map((file, index) => ({
      fileName: file.name,
      contentType: file.type as ReviewImageContentType,
      displayOrder: displayOrderList[index],
    })),
  };
  const response = await fetch(REVIEW_IMAGE_UPLOAD_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('이미지 업로드 URL을 발급할 수 없습니다.');
  }

  const uploadResponse = (await response.json()) as ReviewImageUploadApiResponse;
  if (!uploadResponse.isSuccess || !uploadResponse.result) {
    throw new Error(uploadResponse.message || '이미지 업로드 URL을 발급할 수 없습니다.');
  }

  const uploadList = [...uploadResponse.result.uploads].sort(
    (first, second) => first.displayOrder - second.displayOrder,
  );

  await Promise.all(
    uploadList.map(async (upload, index) => {
      const file = fileList[index];
      const uploadResult = await fetch(upload.presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadResult.ok) {
        throw new Error('이미지를 업로드할 수 없습니다.');
      }
    }),
  );

  return uploadList.map((upload) => upload.imageKey);
};
