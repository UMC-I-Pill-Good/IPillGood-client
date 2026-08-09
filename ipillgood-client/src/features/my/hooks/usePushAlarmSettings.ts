import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotificationSettingsMe, patchNotificationSettingsMe } from '../api/notification';
import { intakeNotificationSettingsQueryKey } from './useNotificationSettings';

export const appPushSettingQueryKey = ['appPushSetting'];

export const usePushAlarmSettings = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: appPushSettingQueryKey,
    queryFn: getNotificationSettingsMe,
    select: (res) => res.result,
  });

  const { mutate: updatePushSetting } = useMutation({
    mutationFn: patchNotificationSettingsMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appPushSettingQueryKey });
      queryClient.invalidateQueries({ queryKey: intakeNotificationSettingsQueryKey });
    },
  });

  const handleTogglePushAlarm = () => {
    if (!data) return;
    updatePushSetting({ pushEnabled: !data.pushEnabled });
  };

  return {
    isPushAlarmOn: data?.pushEnabled,
    isPushAlarmLoading: isLoading,
    handleTogglePushAlarm,
    updatePushSetting,
  };
};
