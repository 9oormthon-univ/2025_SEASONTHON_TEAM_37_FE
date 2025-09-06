import React from 'react';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/apis/services/posts';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { PATH } from '@/lib/path';
import { queryKeyFactory } from '@/apis/query-key-factory';

const PostDeleteButton = () => {
  const { postId } = useParams<{ postId: string }>();

  const queryClient = useQueryClient();
  const router = useRouter();

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: queryKeyFactory.post.detail(+postId),
      });
      toast.success('실패담이 삭제되었습니다.');
      router.replace(PATH.main);
    },
    onError: () => {
      toast.error('실패담 삭제에 실패했습니다.');
    },
  });

  const onDelete = () => {
    deletePostMutation.mutate({ postId: +postId });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="bg-red-100 text-red-500 min-w-auto px-5 py-2 font-semibold"
          >
            삭제
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>실패담 삭제하기</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            정말 삭제하시겠습니까? 삭제된 실패담은 복구할 수 없습니다.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={deletePostMutation.isPending}
              >
                아니요
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={onDelete}
              disabled={deletePostMutation.isPending}
            >
              {deletePostMutation.isPending ? <Loader /> : '네'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDeleteButton;
