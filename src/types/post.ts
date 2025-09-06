import { Member } from './member';

export interface Post {
  postId: number; // 1;
  title: string; // 'test';
  createdAt: string; // '2025-09-05T09:58:35.691627';
  tags: string[]; // ['tag1'];
  imageUrls: string[]; // [];
  category: {
    mainCategoryCode: string; // 'ADMISSION';
    mainCategoryLabel: string; // '입시';
    subCategoryCode: string; // 'ADMISSION_STRATEGY_ERROR';
    subCategoryLabel: string; // '수시/정시 전략 오류';
  };
  situationContent: string; // 'test';
  failureContent: string; // 'test';
  learningContent: string; // 'test';
  nextStepContent: string; // 'test';
  author: Pick<Member, 'memberId' | 'nickname'> & {
    profileImage: string | null; // null;
  };
  likeCount: number; // 1;
  bookmarkCount: number; // 1;
  liked: boolean; // false;
  bookmarked: boolean; // false;
  status: PostStatus; // 'PUBLIC';
}

export type PostStatus = 'PUBLIC' | 'DRAFT' | 'HIDDEN';
