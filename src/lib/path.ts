export const PATH = {
  main: '/',
  category: '/category',
  popular: '/popular',
  recent: '/recent',
  recommended: '/recommended',
  auth: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  post: {
    list: '/post',
    detail: (postId: number) => `/post/${postId}`,
    edit: (postId: number) => `/post/${postId}/edit`,
    add: '/post/add',
  },
  mypage: '/mypage',
} as const;
