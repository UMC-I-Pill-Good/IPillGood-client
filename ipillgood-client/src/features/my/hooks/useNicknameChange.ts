import { useState } from 'react';
import { myInfoQueryKey, useMyInfo } from './useMyInfo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchProfile } from '../api/member';
import { nicknameSchema } from '../schemas/nicknameSchema';

// 통과하면 '', 실패하면 에러 메시지 반환
const validateNickname = (value: string) => {
  const result = nicknameSchema.safeParse(value);

  return result.success ? '' : result.error.issues[0].message;
};

export const useNicknameChange = () => {
  const { data } = useMyInfo();
  const queryClient = useQueryClient();

  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [syncedNickname, setSyncedNickname] = useState<string | undefined>(undefined);

  // data가 처음 도착하거나 서버 값이 바뀌면 렌더링 중에 닉네임을 동기화
  if (data && data.nickname !== syncedNickname) {
    setSyncedNickname(data.nickname);
    setNickname(data.nickname);
  }

  const canChangePassword = data?.loginProviders.includes('LOCAL') ?? false;

  const updateProfileMutation = useMutation({
    mutationFn: patchProfile,
    // 수정 성공 시 내 정보 캐시를 무효화해 최신 닉네임을 다시 불러옴
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myInfoQueryKey });
    },
    onError: () => {
      alert('프로필 수정에 실패했습니다.');
    },
  });

  // 닉네임 입력값을 갱신하고 유효성 검사 실행
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setNickname(value);
    setNicknameError(validateNickname(value));
  };

  // 유효성 검사 통과 시 닉네임 저장 요청
  const handleSave = () => {
    const error = validateNickname(nickname);

    if (error) {
      setNicknameError(error);
      return;
    }

    updateProfileMutation.mutate({ nickname });
  };

  return {
    nickname,
    nicknameError,
    canChangePassword,
    isSaving: updateProfileMutation.isPending,
    handleNicknameChange,
    handleSave,
  };
};
