import { CircleCheck, CircleX } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        duration: 3000,
        success: {
          icon: <CircleCheck color='#92e4c2' />,
          style: {
            background: '#FFFFFF',
            color: '#88D4B4',
            borderRadius: '32px',
            border: '1px solid #92e4c2',
            padding: '12px 16px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '16px',
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all',
            minWidth: '300px',
          },
        },
        error: {
          icon: <CircleX color='#ff4444' />,
          style: {
            background: '#FFFFFF',
            color: '#E60000',
            borderRadius: '32px',
            border: '1px solid #ff4444',
            padding: '12px 16px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '16px',
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all',
            minWidth: '300px',
          },
        },
      }}
      containerStyle={{
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    />
  );
};

export default Toast;
