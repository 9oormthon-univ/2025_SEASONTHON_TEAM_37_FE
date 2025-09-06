import axios from 'axios';
import { isServer } from '@tanstack/react-query';
import { PATH } from '@/lib/path';
import { getCookie } from '@/lib/cookie';
import { TOKEN_KEY } from '@/lib/constants';

const TIMEOUT_TIME = 10_000;

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const cancelTokenSource = () => {
  const cancelToken = axios.CancelToken.source();
  return {
    token: cancelToken.token,
    cancel: cancelToken.cancel,
  };
};

let firstRequestCancelToken = null;

api.interceptors.request.use(
  async (config) => {
    firstRequestCancelToken = cancelTokenSource();
    config.cancelToken = firstRequestCancelToken.token;
    config.timeout = TIMEOUT_TIME;

    const token = getCookie(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // timeout
    if (axios.isCancel(error)) {
      Promise.resolve();
    }

    if (error.response?.status === 401) {
      if (isServer) {
        return Promise.reject({
          status: 401,
          message: 'Unauthorized request',
        });
      }
      window.location.href = PATH.auth.signIn;

      return Promise.reject('Unauthorized request');
    }

    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    );
  }
);
