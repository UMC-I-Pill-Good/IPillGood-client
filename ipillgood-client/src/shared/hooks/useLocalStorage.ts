const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const PUSH_TOKEN_ID_KEY = 'pushTokenId';

export const useLocalStorage = () => {
  const setTokens = (accessToken: string, refreshToken?: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  };

  const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  };

  const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  };

  const clearTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  const setPushTokenId = (pushTokenId: number) => {
    localStorage.setItem(PUSH_TOKEN_ID_KEY, String(pushTokenId));
  };

  const getPushTokenId = () => {
    return localStorage.getItem(PUSH_TOKEN_ID_KEY);
  };

  const clearPushTokenId = () => {
    localStorage.removeItem(PUSH_TOKEN_ID_KEY);
  };

  return {
    setTokens,
    getAccessToken,
    getRefreshToken,
    clearTokens,
    setPushTokenId,
    getPushTokenId,
    clearPushTokenId,
  };
};
