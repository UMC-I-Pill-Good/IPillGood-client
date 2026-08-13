import { useState } from 'react';
import { useMyInfoQuery } from '@/shared/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchProfile } from '../api/member';
import { nicknameSchema } from '../schemas/nicknameSchema';
import { showToast } from '@/shared/utils';

// 통과하면 '', 실패하면 에러 메시지 반환
const validateNickname = (value: string) => {
  const result = nicknameSchema.safeParse(value);

  return result.success ? '' : result.error.issues[0].message;
};

export const useNicknameChange = () => {
  const { data } = useMyInfoQuery();
  const queryClient = useQueryClient();

  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [syncedNickname, setSyncedNickname] = useState<string | undefined>(undefined);

  // 서버 데이터가 처음 도착했을 때만 닉네임 초기화 (이후 사용자 입력을 서버 재조회가 덮어쓰지 않도록)
  if (data && syncedNickname === undefined) {
    setSyncedNickname(data.nickname);
    setNickname(data.nickname);
  }

  const canChangePassword = data?.loginProviders.includes('LOCAL') ?? false;

  const updateProfileMutation = useMutation({
    mutationFn: patchProfile,
    // 수정 성공 시 내 정보 캐시를 무효화해 최신 닉네임을 다시 불러옴
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
      showToast.success('프로필이 저장됐어요.');
    },
    onError: () => {
      showToast.error('저장에 실패했어요. 다시 시도해 주세요.');
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
