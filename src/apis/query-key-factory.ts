export const queryKeyFactory = {
  post: {
    list: ['post'],
    listByCategory: (mainCategoryCode: string, subCategoryCode: string) => [
      'post',
      'list',
      mainCategoryCode,
      subCategoryCode,
    ],
    detail: (postId: number) => ['post', postId],
    recent: ['post', 'recent'],
    popularity: ['post', 'popularity'],
    my: ['post', 'my'],
    search: ['post', 'search'],
  },
  comment: {
    list: (postId: number) => ['comment', postId],
  },
  myPage: {
    my: ['myPage', 'my'],
  },
  categories: {
    list: ['categories'],
  },
} as const;
