import { useRouter } from 'next/navigation';

export const useAlternativeFoodSection = (ingredientId: number) => {
  const router = useRouter();

  const handleSearchClick = () => {
    // TODO: 해당 영양성분 검색된 채로 검색 페이지로 이동
  };

  return { handleSearchClick };
};
