import React from 'react';
import { Card, CardContent } from './card';

const PostCardSkeleton = () => {
  return (
    <Card className="shadow-none bg-tertiary p-0">
      <CardContent className="relative p-3">
        {/* 이미지 영역 */}
        <div className="w-full h-32 rounded-md bg-gray-200 animate-pulse" />

        {/* 프로필 + 아이콘 */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
            <div className="w-16 h-4 rounded bg-gray-200 animate-pulse" />
          </div>

          {/* 북마크 */}
          <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
        </div>

        {/* 제목 + 내용 */}
        <div className="mt-2 flex flex-col gap-2">
          <div className="w-32 h-5 rounded bg-gray-200 animate-pulse" />
          <div className="w-48 max-w-full h-4 rounded bg-gray-200 animate-pulse" />
        </div>

        {/* 좋아요 + 댓글 + 날짜 */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-3 rounded bg-gray-200 animate-pulse" />
              <div className="w-6 h-3 rounded bg-gray-200 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-3 rounded bg-gray-200 animate-pulse" />
              <div className="w-6 h-3 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>

          <div className="w-20 h-4 rounded bg-gray-200 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCardSkeleton;
