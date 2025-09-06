import { api } from '@/apis/axios';
import { TOKEN_KEY } from '@/lib/constants';
import { deleteCookie, getCookie, setCookie } from '@/lib/cookie';
import { isServer } from '@tanstack/react-query';

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  if (isServer) {
    return null;
  }

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const hasTokenAndValid = () => {
  const token = getCookie(TOKEN_KEY);
  return !!token && isValidToken(token);
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  // 1일보다 많이 남으면 실행하지 않음
  if (timeLeft >= 86400000) {
    return;
  }

  expiredTimer = setTimeout(() => {
    alert('로그인이 만료되었습니다.');

    removeSession();

    window.location.reload();
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken: string) => {
  setCookie(TOKEN_KEY, accessToken);

  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const { exp } = jwtDecode(accessToken);
  tokenExpired(exp);
};

// ----------------------------------------------------------------------

export const removeSession = () => {
  deleteCookie(TOKEN_KEY);

  delete api.defaults.headers.common.Authorization;
};
