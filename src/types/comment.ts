import { Member } from './member';

export interface Comment {
  commentId: number; // 1;
  postId: number; // 1;
  memberId: number; // 2;
  parentCommentId: number | null; // null;
  content: string; // 'test';
  anonymous: boolean; // true;
  status: 'PUBLIC'; // 'PUBLIC';
  likeCount: number; // 2;
  author: Pick<Member, 'memberId' | 'nickname' | 'imageUrl'>;
  createdAt: string; // '2025-09-05T14:31:23.999264Z';
}
