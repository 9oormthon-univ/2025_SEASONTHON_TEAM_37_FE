'use client';

import { getPost } from '@/apis/services/posts';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import PostImagesSection from './sections/post-images-section';
import PostTitleSection from './sections/post-title-section';
import PostContentSection from './sections/post-content-section';
import PostInteractionSection from './sections/post-interaction-section';
import Link from 'next/link';
import { PATH } from '@/lib/path';
import { ChevronLeftIcon } from 'lucide-react';
import { SymbolIcon } from '@/components/icons';
import PostTagsSection from './sections/post-tags-section';
import PostCommentsSection from './sections/post-comments-section';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { minutes } from '@/lib/time';
import PostDeleteButton from './ui/post-delete-button';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import PostSkeleton from './sections/post-skeleton';

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: queryKeyFactory.post.detail(+postId),
    queryFn: () => getPost({ postId: +postId }),
    enabled: !!postId,
    gcTime: minutes(30),
    staleTime: minutes(30),
  });

  const { session } = useAuth();

  const isMine = session?.memberId === data?.author.memberId;

  console.log(session, data?.author);

  return (
    <>
      <Header />
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
        <main className="px-4 flex-1 w-full max-w-5xl mx-auto">
          <section className="mt-16 flex flex-col gap-2">
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              <SymbolIcon className="text-primary" /> 실패담
            </h1>

            <div className="mt-6 flex items-center justify-between">
              <Link
                href={PATH.main}
                replace
                className="flex items-center gap-2 text-gray-500"
              >
                <ChevronLeftIcon />
                이전으로
              </Link>

              {isMine && (
                <div className="flex items-center gap-2">
                  <PostDeleteButton />
                  <Link href={PATH.post.edit(+postId)}>
                    <Button
                      type="button"
                      className="bg-tertiary text-gray-800 min-w-auto px-5 py-2 font-semibold"
                    >
                      수정
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>

          {isLoading ? (
            <PostSkeleton />
          ) : !data ? (
            <div className="h-full flex items-center justify-center">
              <div className="flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-lg">
                  해당 실패담이 존재하지 않습니다.
                </span>
              </div>
            </div>
          ) : (
            <>
              <PostTitleSection post={data} />
              <PostImagesSection post={data} />
              <PostContentSection
                title="상황"
                content={data.situationContent}
              />
              <PostContentSection
                title="실패/좌절"
                content={data.failureContent}
              />
              <PostContentSection
                title="핵심 배움"
                content={data.learningContent}
              />
              <PostContentSection
                title="다음 단계"
                content={data.nextStepContent}
              />
              <PostTagsSection post={data} />
              <PostInteractionSection post={data} />

              <PostCommentsSection />
            </>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PostPage;
