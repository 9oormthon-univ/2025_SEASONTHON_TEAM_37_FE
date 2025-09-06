import { Post } from '@/types/post';
import { api } from '../axios';
import { API_PATH } from '../path';
import { Category, SubCategory } from '@/types/categories';

interface PaginationData<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

interface PageParams {
  page?: number;
  size?: number;
}

export async function getPostsByCategory({
  page = 0,
  size = 10,
  ...params
}: {
  mainCategory?: Category['mainCategoryCode'];
  subCategory?: SubCategory['subCategoryCode'];
} & PageParams) {
  const { data } = await api.get<PaginationData<Post>>(API_PATH.posts.list, {
    params: {
      page,
      size,
      ...params,
    },
  });
  return data;
}

export async function getPostsByPopularity({
  page = 0,
  size = 10,
}: PageParams) {
  const { data } = await api.get<PaginationData<Post>>(
    API_PATH.posts.popularity,
    {
      params: {
        page,
        size,
      },
    }
  );
  return data;
}

export async function getPostsByRecent({ page = 0, size = 10 }: PageParams) {
  const { data } = await api.get<PaginationData<Post>>(API_PATH.posts.recent, {
    params: {
      page,
      size,
    },
  });
  return data;
}

export async function getPost({ postId }: { postId: number }) {
  const { data } = await api.get<Post>(API_PATH.posts.detail(postId));
  return data;
}

export async function addDraftPost(payload: Post) {
  const { data } = await api.post<Post>(API_PATH.posts.list, payload);
  return data;
}

export async function addPost(payload: Post) {
  const res = await addDraftPost(payload);
  return await updatePost({
    postId: res.postId,
    payload: {
      ...payload,
      status: 'PUBLIC',
    },
  });
}

export async function updatePost({
  postId,
  payload,
}: {
  postId: number;
  payload: Post;
}) {
  const { data } = await api.patch<Post>(
    API_PATH.posts.detail(postId),
    payload
  );
  return data;
}

export async function deletePost({ postId }: { postId: number }) {
  const { data } = await api.delete<Post>(API_PATH.posts.detail(postId));
  return data;
}

export async function likePost({ postId }: { postId: number }) {
  const { data } = await api.post<Post>(API_PATH.posts.like(postId));
  return data;
}

export async function bookmarkPost({ postId }: { postId: number }) {
  const { data } = await api.post<Post>(API_PATH.posts.bookmark(postId));
  return data;
}
