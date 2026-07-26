import { useState } from 'react';

export const usePushAlarmSettings = () => {
  const [isPushAlarmOn, setIsPushAlarmOn] = useState(true); // TODO: 푸시 알람 상태

  const handleTogglePushAlarm = () => {
    //   TODO: 로직
    setIsPushAlarmOn((v) => !v);
  };

  return { isPushAlarmOn, handleTogglePushAlarm };
};
