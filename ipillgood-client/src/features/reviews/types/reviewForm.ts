export type ReviewFormMode = 'add' | 'edit';

export type ReviewImagePreview = {
  id: string;
  previewUrl: string;
  imageKey?: string;
  file?: File;
};
