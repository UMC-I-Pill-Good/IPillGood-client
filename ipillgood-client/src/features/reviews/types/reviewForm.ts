export type ReviewFormMode = 'add' | 'edit';

export type ReviewImagePreview = {
  id: string;
  src: string;
  imageKey?: string;
  file?: File;
};
