import type {
  ReviewImageContentType,
  ReviewImageUploadApiResponse,
  ReviewImageUploadRequest,
} from '../types/review';

const REVIEW_IMAGE_UPLOAD_PATH = '/api/v1/reviews/images/presigned-urls';

export const uploadReviewImages = async (
  fileList: File[],
  displayOrderList: number[],
): Promise<string[]> => {
  if (fileList.length !== displayOrderList.length) {
    throw new Error('이미지 업로드 정보를 확인해 주세요.');
  }

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

  if (
    !Array.isArray(uploadResponse.result.uploads) ||
    uploadResponse.result.uploads.length !== fileList.length
  ) {
    throw new Error('요청한 이미지 수와 업로드 정보가 일치하지 않습니다.');
  }

  const uploadByDisplayOrder = new Map(
    uploadResponse.result.uploads.map((upload) => [upload.displayOrder, upload]),
  );
  const uploadList = displayOrderList.map((displayOrder) => uploadByDisplayOrder.get(displayOrder));

  if (uploadByDisplayOrder.size !== fileList.length || uploadList.some((upload) => !upload)) {
    throw new Error('이미지 업로드 순서 정보를 확인할 수 없습니다.');
  }

  await Promise.all(
    uploadList.map(async (upload, index) => {
      const file = fileList[index];
      if (!file || !upload) {
        throw new Error('업로드할 이미지 정보를 찾을 수 없습니다.');
      }
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

  return uploadList.map((upload) => {
    if (!upload) throw new Error('업로드된 이미지 정보를 찾을 수 없습니다.');
    return upload.imageKey;
  });
};
