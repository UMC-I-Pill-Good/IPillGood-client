import { axiosInstance } from '@/app/api/api';
import type {
  ReviewImageContentType,
  ReviewImageUploadApiResponse,
  ReviewImageUploadRequest,
} from '../types/review';

const REVIEW_IMAGE_UPLOAD_PATH = '/reviews/images/presign';

export const uploadReviewImages = async (fileList: File[]): Promise<string[]> => {
  const request: ReviewImageUploadRequest = {
    contentTypes: fileList.map((file) => file.type as ReviewImageContentType),
  };
  const { data: uploadResponse } = await axiosInstance.post<ReviewImageUploadApiResponse>(
    REVIEW_IMAGE_UPLOAD_PATH,
    request,
  );
  if (!uploadResponse.isSuccess || !uploadResponse.result) {
    throw new Error(uploadResponse.message || '이미지 업로드 URL을 발급할 수 없습니다.');
  }

  if (
    !Array.isArray(uploadResponse.result.images) ||
    uploadResponse.result.images.length !== fileList.length
  ) {
    throw new Error('요청한 이미지 수와 업로드 정보가 일치하지 않습니다.');
  }

  const uploadList = uploadResponse.result.images;

  await Promise.all(
    uploadList.map(async (upload, index) => {
      const file = fileList[index];
      if (!file) {
        throw new Error('업로드할 이미지 정보를 찾을 수 없습니다.');
      }
      const uploadResult = await fetch(upload.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadResult.ok) {
        throw new Error('이미지를 업로드할 수 없습니다.');
      }
    }),
  );

  return uploadList.map((upload) => upload.key);
};
