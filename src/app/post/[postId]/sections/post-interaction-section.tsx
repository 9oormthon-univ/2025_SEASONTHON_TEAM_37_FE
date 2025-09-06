import React from 'react';
import { Post } from '@/types/post';
import { HeartIcon, BookmarkIcon } from 'lucide-react';
import { bookmarkPost, likePost } from '@/apis/services/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/providers/auth-provider';

interface Props {
  post: Post;
}

const PostInteractionSection = ({ post }: Props) => {
  const queryClient = useQueryClient();

  const { isLoggedIn } = useAuth();

  const likeMutation = useMutation({
    mutationFn: () => likePost({ postId: post.postId }),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeyFactory.post.detail(post.postId), {
        ...post,
        ...data,
      });
      if (data.liked) {
        toast.success('좋아요 완료');
      } else {
        toast.error('좋아요 취소');
      }
    },
    onError: () => {
      toast.error('좋아요 실패');
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: () => bookmarkPost({ postId: post.postId }),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeyFactory.post.detail(post.postId), {
        ...post,
        ...data,
      });
      if (data.bookmarked) {
        toast.success('스크랩 완료');
      } else {
        toast.error('스크랩 취소');
      }
    },
    onError: () => {
      toast.error('스크랩 실패');
    },
  });

  return (
    <section className="mt-4 flex items-center gap-8 text-gray-800">
      <div className="flex items-center gap-2">
        <p className="font-medium">좋아요</p>
        <p>{post.likeCount}</p>
        {isLoggedIn && (
          <button type="button" onClick={() => likeMutation.mutate()}>
            <HeartIcon
              className={cn(
                'size-6',
                post.liked ? 'fill-secondary text-secondary' : ''
              )}
            />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <p className="font-medium">스크랩</p>
        <p>{post.bookmarkCount}</p>
        {isLoggedIn && (
          <button type="button" onClick={() => bookmarkMutation.mutate()}>
            <BookmarkIcon
              className={cn(
                'size-6',
                post.bookmarked ? 'fill-secondary text-secondary' : ''
              )}
            />
          </button>
        )}
      </div>
    </section>
  );
};

export default PostInteractionSection;
