'use client';

import Header from '@/components/layouts/header';
import Sidebar from '../ui/sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PATH } from '@/lib/path';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { getPostsByCategory } from '@/apis/services/posts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PostCard from '@/components/ui/post-card';
import useCategorySearchParams from '../lib/use-category-search-params';
import { LogoIcon } from '@/components/icons';
import PostCardSkeleton from '@/components/ui/post-card-skeleton';

const Home = () => {
  const { ref, inView } = useInView({ threshold: 0 });

  const { mainCategoryCode, subCategoryCode, mainCategory, subCategory } =
    useCategorySearchParams();

  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: queryKeyFactory.post.listByCategory(
      mainCategoryCode!,
      subCategoryCode!
    ),
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getPostsByCategory({
        mainCategory: mainCategoryCode!,
        subCategory: subCategoryCode!,
        page: pageParam,
      });
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const { number, totalPages } = lastPage;
      return number < totalPages - 1 ? number + 1 : undefined;
    },
    enabled: !!mainCategoryCode && !!subCategoryCode,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const isNotData = !isLoading && !data?.pages[0]?.content?.length;

  return (
    <div className="flex flex-col h-full">
      <Header />
      <section className="mt-10 px-25 flex items-center gap-2">
        <LogoIcon className="text-primary size-12" />
        <h1 className="text-3xl text-black font-semibold">
          {mainCategory?.mainCategoryLabel}
        </h1>
      </section>

      <div className="pl-25 flex flex-1 min-h-0">
        <Sidebar hideHeader />
        <main className="p-4 pr-25 pb-30 lg:p-10 lg:pb-30 lg:pr-25 flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center">
              <span className="px-4 py-2 text-xl font-semibold text-primary">
                {mainCategory?.mainCategoryLabel}
              </span>
              <span className="px-4 py-2 text-xl font-semibold text-gray-600">
                {subCategory?.subCategoryLabel}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {isLoading &&
                Array.from({ length: 10 }).map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))}

              {isFetched &&
                data?.pages.map((group, i) => (
                  <Fragment key={i}>
                    {group?.content?.map((post) => (
                      <Link
                        href={PATH.post.detail(post.postId)}
                        key={post.postId}
                      >
                        <PostCard key={post.postId} post={post} />
                      </Link>
                    ))}
                  </Fragment>
                ))}

              {isFetchingNextPage &&
                Array.from({ length: 6 }).map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))}
            </div>

            {/* Infinite scroll Observer*/}
            <div ref={ref} className="w-full h-2" />
          </div>

          {isNotData && (
            <section className="h-full flex items-center justify-center">
              <div className="flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-lg">
                  해당 카테고리에 등록된 실패담이 없습니다.
                </span>
              </div>
            </section>
          )}

          <Link href={PATH.post.add} className="fixed bottom-16 right-16 z-50">
            <Button
              size="lg"
              className="rounded-full font-semibold py-2 h-auto text-lg shadow-lg"
            >
              실패담 작성하기
            </Button>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
