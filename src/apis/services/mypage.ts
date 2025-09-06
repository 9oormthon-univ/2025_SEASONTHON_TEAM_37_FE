import { API_PATH } from '../path';
import { api } from '../axios';
import { Member } from '@/types/member';

export type MyPageDto = Pick<
  Member,
  | 'nickname'
  | 'age'
  | 'field'
  | 'imageUrl'
  | 'hadRankingBadge'
  | 'loginId'
  | 'interests'
>;

export async function getMypage() {
  const { data } = await api.get<MyPageDto>(API_PATH.myPage.my);

  return data;
}

export async function updateMyPage(
  payload: Omit<MyPageDto, 'hadRankingBadge' | 'loginId'>
) {
  const { data } = await api.patch(API_PATH.myPage.my, payload);
  return data;
}
