import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { MAX_REVIEW_IMAGE_COUNT, SUPPORTED_REVIEW_IMAGE_TYPE_LIST } from '../constants/reviewForm';
import type { ReviewImagePreview } from '../types/reviewForm';

type UseReviewImagesParams = {
  onValidationError: (message: string) => void;
};

export const useReviewImages = ({ onValidationError }: UseReviewImagesParams) => {
  const [imagePreviewList, setImagePreviewList] = useState<ReviewImagePreview[]>([]);
  const imagePreviewListRef = useRef<ReviewImagePreview[]>([]);

  useEffect(() => {
    imagePreviewListRef.current = imagePreviewList;
  }, [imagePreviewList]);

  useEffect(
    () => () => {
      imagePreviewListRef.current.forEach((image) => {
        if (image.file) URL.revokeObjectURL(image.previewUrl);
      });
    },
    [],
  );

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(event.target.files ?? []);
    if (!fileList.length) return;

    const supportedFileList = fileList.filter((file) =>
      SUPPORTED_REVIEW_IMAGE_TYPE_LIST.includes(file.type),
    );
    const availableCount = Math.max(0, MAX_REVIEW_IMAGE_COUNT - imagePreviewList.length);

    if (supportedFileList.length !== fileList.length) {
      onValidationError('JPG, PNG, WEBP 형식의 이미지만 첨부할 수 있습니다.');
    } else if (supportedFileList.length > availableCount) {
      onValidationError(`이미지는 최대 ${MAX_REVIEW_IMAGE_COUNT}장까지 첨부할 수 있습니다.`);
    } else {
      onValidationError('');
    }

    const nextImageList = supportedFileList.slice(0, availableCount).map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      previewUrl: URL.createObjectURL(file),
      file,
    }));
    setImagePreviewList((currentList) => [...currentList, ...nextImageList]);
    event.target.value = '';
  };

  const handleImageRemove = (imageId: string) => {
    setImagePreviewList((currentList) => {
      const image = currentList.find((item) => item.id === imageId);
      if (image?.file) URL.revokeObjectURL(image.previewUrl);
      return currentList.filter((item) => item.id !== imageId);
    });
  };

  return {
    imagePreviewList,
    setImagePreviewList,
    handleImageChange,
    handleImageRemove,
  };
};
