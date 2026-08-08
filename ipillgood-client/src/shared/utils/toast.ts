import toast from 'react-hot-toast';

export const showToast = {
  success: (msg: string) => {
    toast.dismiss();
    toast.success(msg);
  },
  error: (msg: string) => {
    toast.dismiss();
    toast.error(msg);
  },
};
