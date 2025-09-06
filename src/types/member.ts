export interface Member {
  memberId: number;
  nickname: string;
  imageUrl?: string;
  age: number;
  field: string;
  loginId: string;
  hadRankingBadge: boolean;
  createdAt: string;
  updatedAt: string;
  interests: string[];
}
