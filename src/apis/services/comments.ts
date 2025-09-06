import { api } from '../axios';
import { API_PATH } from '../path';
import { Comment } from '@/types/comment';

export async function getComments(postId: number) {
  const { data } = await api.get(API_PATH.comments.list(postId));

  return data.items as Comment[];
}

export async function addComment({
  postId,
  payload,
}: {
  postId: number;
  payload: { content: string; anonymous: boolean; parentCommentId?: number };
}) {
  const { data } = await api.post(API_PATH.comments.list(postId), payload);

  return data;
}

export async function deleteComment(commentId: number) {
  const { data } = await api.delete(API_PATH.comments.delete(commentId));

  return data;
}
