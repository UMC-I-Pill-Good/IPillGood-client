import { useState } from 'react';

export const useSupplementSearch = () => {
  const [keyword, setKeyword] = useState('');

  return {
    keyword,
    setKeyword,
  };
};
