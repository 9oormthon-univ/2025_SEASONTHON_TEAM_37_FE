'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { getCategories } from '@/apis/services/categories';
import SidebarItem from './sidebar-item';
import { SymbolIcon } from '@/components/icons';
// import { cn } from '@/lib/utils';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { PATH } from '@/lib/path';

// const ToItem = ({ name, to }: { name: string; to: string }) => {
//   const pathname = usePathname();
//   const isSelected = pathname === to;

//   return (
//     <li className="">
//       <Link href={to} className="py-1.5 cursor-pointer">
//         <span
//           className={cn(
//             'text-lg font-semibold text-gray-800',
//             isSelected && 'text-primary'
//           )}
//         >
//           {name}
//         </span>
//       </Link>
//     </li>
//   );
// };

const Sidebar = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: queryKeyFactory.categories.list,
    queryFn: () => getCategories(),
    gcTime: Infinity,
    staleTime: Infinity,
  });

  return (
    <aside className="hidden lg:flex w-64 p-4 pt-10 min-h-0 overflow-y-auto flex flex-col scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
      {!hideHeader && (
        <div className="pb-16 flex items-center gap-2">
          <SymbolIcon className="text-primary size-12" />
          <h1 className="text-3xl text-black font-semibold">홈</h1>
        </div>
      )}

      <h2 className="py-1.5 text-2xl text-gray-800 font-semibold">카테고리</h2>

      <ul className="mt-10 flex flex-col gap-2">
        {isLoading ? (
          // 간단한 스켈레톤
          Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="animate-pulse">
              <div className="py-1.5">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
              </div>
            </li>
          ))
        ) : (
          <>
            {/* <ToItem name="인기글 모아보기" to={PATH.popular} />
            <ToItem name="최신글 모아보기" to={PATH.recent} />
            <ToItem name="추천글 모아보기" to={PATH.recommended} /> */}
            {categories?.map((category) => (
              <SidebarItem
                key={category.mainCategoryCode}
                category={category}
              />
            ))}
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
