import React from 'react';
import { Card, CardContent } from './card';
import { Post } from '@/types/post';
import Image from './image';
import { BookmarkIcon } from 'lucide-react';
import { BlankUserIcon, SymbolIcon } from '../icons';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { useQueryClient } from '@tanstack/react-query';
import { Category } from '@/types/categories';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const queryClient = useQueryClient();

  const categories = queryClient.getQueryData<Category[]>(
    queryKeyFactory.categories.list
  );

  const thumbnail = post.imageUrls[0] ?? 'generate-error';

  const mainCategory = categories?.find(
    (category) => category.mainCategoryCode === post.category.mainCategoryCode
  );

  return (
    <Card className="shadow-none bg-tertiary p-0">
      <CardContent className="relative p-3">
        <Image
          src={thumbnail}
          alt={post.title}
          className="h-40 w-full object-cover rounded-md h-30"
          fallback={
            <div className="size-full bg-white flex items-center justify-center">
              <SymbolIcon className="text-secondary size-20" />
            </div>
          }
        />

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Image
              src={post.author.profileImage ?? 'generate-error'}
              alt={post.author.nickname}
              className="w-6 h-6 rounded-full"
              fallback={<BlankUserIcon className="text-secondary size-6" />}
            />
            <p className="text-sm text-gray-500">{post.author.nickname}</p>
          </div>

          {/* 북마크 */}
          <div>
            <p className="text-sm text-gray-500">
              {post.bookmarked ? (
                <BookmarkIcon className="text-primary fill-primary" />
              ) : (
                <BookmarkIcon className="text-secondary" />
              )}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <p className="font-semibold truncate">{post.title}</p>
          <p className="text-sm text-gray-700 truncate">
            {post.situationContent}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-500">좋아요</p>
              <p className="text-xs text-gray-500">{post.likeCount}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-500">댓글</p>
              <p className="text-xs text-gray-500">{post.bookmarkCount}</p>
            </div>
          </div>

          <span className="text-xs text-secondary font-bold">
            {mainCategory?.mainCategoryLabel}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
