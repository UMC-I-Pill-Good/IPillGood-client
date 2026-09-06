import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotificationSettingsMe, patchNotificationSettingsMe } from '../api/notification';
import { intakeNotificationSettingsQueryKey } from './useNotificationSettings';
import { showToast } from '@/shared/utils';

export const appPushSettingQueryKey = ['appPushSetting'];

export const usePushAlarmSettings = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: appPushSettingQueryKey,
    queryFn: getNotificationSettingsMe,
    select: (res) => res.result,
  });

  const { mutate: updatePushSetting } = useMutation({
    mutationFn: patchNotificationSettingsMe,
    onSuccess: () => {
      // 반환해서 refetch가 끝난 뒤에 onSettled가 호출되도록 함
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: appPushSettingQueryKey }),
        queryClient.invalidateQueries({ queryKey: intakeNotificationSettingsQueryKey }),
      ]);
    },
    onError: () => {
      showToast.error('알림 설정 변경에 실패했어요.');
    },
  });

  const handleTogglePushAlarm = (onSettled?: () => void) => {
    if (!data) return;
    updatePushSetting({ pushEnabled: !data.pushEnabled }, { onSettled });
  };

  return {
    isPushAlarmOn: data?.pushEnabled,
    isPushAlarmLoading: isLoading,
    isPushAlarmError: isError,
    refetchPushAlarm: refetch,
    handleTogglePushAlarm,
    updatePushSetting,
  };
};
