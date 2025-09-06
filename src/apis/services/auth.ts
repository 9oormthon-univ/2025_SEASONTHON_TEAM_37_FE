import { api } from '../axios';
import { API_PATH } from '../path';

export interface SignInPayload {
  loginId: string;
  password: string;
}

export interface SignUpPayload {
  loginId: string;
  password: string;
  nickname: string;
  age: number;
  field: string;
  interests: string[];
}

export async function signIn(payload: SignInPayload) {
  const { data } = await api.post(API_PATH.auth.signIn, payload);
  return data;
}

export async function signUp(payload: SignUpPayload) {
  const { data } = await api.post(API_PATH.auth.signUp, payload);
  return data;
}
