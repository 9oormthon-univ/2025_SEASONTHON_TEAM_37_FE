import React, { Fragment, useEffect } from 'react';
import { PATH } from '@/lib/path';
import PostCard from '@/components/ui/post-card';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { getPostsByRecent } from '@/apis/services/posts';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import PostCardSkeleton from '@/components/ui/post-card-skeleton';
import { useInView } from 'react-intersection-observer';

const RecentListSection = () => {
  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: queryKeyFactory.post.recent,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getPostsByRecent({ page: pageParam, size: 10 });
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const { number, totalPages } = lastPage;
      return number < totalPages - 1 ? number + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const isNotData = !isLoading && !data?.pages[0]?.content?.length;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">최신순</h3>
          <span className="text-gray-600 hidden lg:block">
            갓 올라온 따끈한 실패담 속에는 아직 끝나지 않은 도전의 열정이 담겨
            있어요
          </span>
        </div>

        {/* <Link href={PATH.post.list} className="text-gray-600">
          더보기
        </Link> */}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <PostCardSkeleton key={i} />)}

        {isFetched &&
          data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group?.content?.map((post) => (
                <Link href={PATH.post.detail(post.postId)} key={post.postId}>
                  <PostCard key={post.postId} post={post} />
                </Link>
              ))}
            </Fragment>
          ))}

        {isFetchingNextPage &&
          Array.from({ length: 6 }).map((_, i) => <PostCardSkeleton key={i} />)}
      </div>

      {/* Infinite scroll Observer*/}
      <div ref={ref} className="w-full h-2" />

      {isNotData && (
        <section className="h-full flex items-center justify-center">
          <div className="flex items-center justify-center">
            <span className="text-gray-600 font-semibold text-lg">
              최신순 실패담이 없습니다.
            </span>
          </div>
        </section>
      )}
    </section>
  );
};

export default RecentListSection;
