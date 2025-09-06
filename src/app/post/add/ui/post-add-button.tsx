import React from 'react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost } from '@/apis/services/posts';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { PATH } from '@/lib/path';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { useFormContext } from 'react-hook-form';
import { onAddPostInvalid, PostAddFormData } from '../utils';
import { Post } from '@/types/post';
import { cn } from '@/lib/utils';

const PostAddButton = ({ className }: { className?: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { handleSubmit } = useFormContext<PostAddFormData>();

  const addPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: queryKeyFactory.post.list,
      });
      toast.success('실패담이 등록되었습니다.');
      router.replace(PATH.main);
    },
    onError: () => {
      toast.error('실패담 등록에 실패했습니다.');
    },
  });

  const onAdd = (data: PostAddFormData) => {
    const payload = {
      ...data,
      tags: data.tags?.map((tag) => tag.value),
      status: 'PUBLIC',
    };
    addPostMutation.mutate(payload as unknown as Post);
  };

  return (
    <Button
      type="button"
      size="lg"
      className={cn('w-full h-11 text-xl font-semibold', className)}
      onClick={handleSubmit(onAdd, onAddPostInvalid)}
      disabled={addPostMutation.isPending}
    >
      {addPostMutation.isPending ? (
        <Loader2 className="text-white size-6 rounded-md animate-spin" />
      ) : (
        '등록하기'
      )}
    </Button>
  );
};

export default PostAddButton;
