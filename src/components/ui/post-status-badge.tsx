import { PostStatus } from '@/types/post';
import { cn } from '@/lib/utils';
import React from 'react';

const PostStatusBadge = ({ status }: { status: PostStatus }) => {
  const statusToLabel = {
    PUBLIC: '공개',
    DRAFT: '임시저장',
    HIDDEN: '비공개',
  };

  const statusToColor = {
    PUBLIC: 'bg-green-200 text-green-600',
    DRAFT: 'bg-yellow-200 text-yellow-600',
    HIDDEN: 'bg-red-200 text-red-600',
  };

  return (
    <div
      className={cn(
        'text-xs rounded-sm px-2 py-1 flex items-center justify-center',
        statusToColor[status]
      )}
    >
      {statusToLabel[status]}
    </div>
  );
};

export default PostStatusBadge;
