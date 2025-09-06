import { queryKeyFactory } from '@/apis/query-key-factory';
import {
  addComment,
  deleteComment,
  getComments,
} from '@/apis/services/comments';
import { minutes } from '@/lib/time';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import Image from '@/components/ui/image';
import { useAuth } from '@/components/providers/auth-provider';

const PostCommentsSection = () => {
  const { postId } = useParams<{ postId: string }>();
  const { session } = useAuth();

  const queryClient = useQueryClient();

  const methods = useForm<{ content: string }>({
    resolver: zodResolver(z.object({ content: z.string() })),
  });

  const { data } = useQuery({
    queryKey: queryKeyFactory.comment.list(+postId),
    queryFn: () => getComments(+postId),
    enabled: !!postId,
    gcTime: minutes(30),
    staleTime: minutes(30),
  });

  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.comment.list(+postId),
      });
      methods.reset();
      toast.success('댓글이 추가되었습니다.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.comment.list(+postId),
      });
      toast.success('댓글이 삭제되었습니다.');
    },
    onError: () => {
      toast.error('댓글 삭제에 실패했습니다.');
    },
  });

  const onAdd = (data: { content: string }) => {
    addMutation.mutate({
      postId: +postId,
      payload: { content: data.content, anonymous: false },
    });
  };

  const onDelete = (commentId: number) => {
    deleteMutation.mutate(commentId);
  };

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-gray-800">댓글</h2>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onAdd)}
          className="mt-4 flex flex-col  gap-2"
        >
          <Input
            {...methods.register('content')}
            placeholder="댓글을 입력해주세요."
            className="h-13 px-6 text-base"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-tertiary text-gray-800 font-semibold px-3 py-2.5 h-auto"
              disabled={addMutation.isPending}
            >
              {addMutation.isPending ? (
                <Loader2 className="text-white size-6 rounded-md animate-spin" />
              ) : (
                '댓글 남기기'
              )}
            </Button>
          </div>
        </form>
      </FormProvider>

      <section className="mt-10 flex flex-col gap-4">
        {(data ?? []).length > 0 ? (
          data?.map((comment) => (
            <div
              key={comment.commentId}
              className="flex flex-col p-5 gap-4 rounded-lg border border-secondary"
            >
              <div className="flex justify-between">
                <time className="text-secondary">
                  {format(comment.createdAt, 'yyyy.MM.dd HH:mm')}
                </time>

                {comment.memberId === session?.memberId && (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      className="text-sm bg-red-100 text-red-500 min-w-auto px-2.5 py-1 h-auto font-semibold"
                      size="sm"
                      onClick={() => onDelete(comment.commentId)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? (
                        <Loader2 className="text-red-500 size-4 rounded-md animate-spin" />
                      ) : (
                        '삭제'
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex gap-10 items-center">
                <div className="flex gap-2 items-center">
                  <Image
                    src={comment?.author?.imageUrl}
                    alt={comment?.author?.nickname}
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="text-sm text-gray-800">
                    {comment?.author?.nickname}
                  </p>
                </div>

                <p className="text-gray-800">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600 font-semibold text-lg text-center">
            댓글이 존재하지 않습니다.
          </div>
        )}
      </section>
    </section>
  );
};

export default PostCommentsSection;
