import React from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '@/apis/services/posts';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { PATH } from '@/lib/path';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { useFormContext } from 'react-hook-form';
import { onEditPostInvalid, PostEditFormData } from '../utils';
import { Post } from '@/types/post';
import { cn } from '@/lib/utils';

const PostPublishButton = ({ className }: { className?: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { postId } = useParams<{ postId: string }>();

  const { handleSubmit } = useFormContext<PostEditFormData>();

  const publishPostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.post.detail(+postId),
      });
      toast.success('실패담이 발행되었습니다.');
      router.replace(PATH.post.detail(+postId));
    },
    onError: () => {
      toast.error('실패담 발행에 실패했습니다.');
    },
  });

  const onPublish = (data: PostEditFormData) => {
    const payload = {
      ...data,
      tags: data.tags?.map((tag) => tag.value),
      status: 'PUBLIC',
    };
    publishPostMutation.mutate({
      postId: +postId,
      payload: payload as unknown as Post,
    });
  };

  return (
    <Button
      type="button"
      size="lg"
      className={cn('w-full h-11 text-xl font-semibold', className)}
      onClick={handleSubmit(onPublish, onEditPostInvalid)}
      disabled={publishPostMutation.isPending}
    >
      {publishPostMutation.isPending ? (
        <Loader2 className="text-white size-6 rounded-md animate-spin" />
      ) : (
        '발행하기'
      )}
    </Button>
  );
};

export default PostPublishButton;
