import React from 'react';
import { PATH } from '@/lib/path';
import PostCard from '@/components/ui/post-card';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { getPostsByPopularity } from '@/apis/services/posts';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import PostCardSkeleton from '@/components/ui/post-card-skeleton';

const PopularListSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeyFactory.post.popularity,
    // 4개 고정
    queryFn: () => getPostsByPopularity({ page: 0, size: 4 }),
  });

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">인기순</h3>
          <span className="text-gray-600 hidden lg:block">
            실패를 마주한 많은 사람들이 용기를 얻고 다시 도전한 이야기예요
          </span>
        </div>

        {/* <Link href={PATH.post.list} className="text-gray-600">
          더보기
        </Link> */}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <PostCardSkeleton key={i} />)}

        {data?.content?.map((post) => (
          <Link href={PATH.post.detail(post.postId)} key={post.postId}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularListSection;
