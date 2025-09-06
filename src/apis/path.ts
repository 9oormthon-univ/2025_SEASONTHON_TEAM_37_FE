export const API_PATH = {
  auth: {
    signIn: '/members/login',
    signUp: '/members/join',
  },
  myPage: {
    my: '/members/my',
  },
  posts: {
    list: '/posts',
    popularity: '/posts/popular',
    recent: '/posts/recent',
    my: '/posts/my',
    search: '/posts/search',
    detail: (postId: number) => `/posts/${postId}`,
    like: (postId: number) => `/posts/${postId}/reactions/heart`,
    bookmark: (postId: number) => `/posts/${postId}/bookmarks`,
  },
  comments: {
    list: (postId: number) => `/posts/${postId}/comments`,
    delete: (commentId: number) => `/comments/${commentId}`,
  },
  categories: {
    list: '/categories',
  },
  uploadFile: '/upload',
} as const;
