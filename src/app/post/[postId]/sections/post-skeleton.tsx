import React from 'react';

const PostSkeleton = () => {
  return (
    <>
      <section className="mt-10 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="h-8 bg-gray-200 rounded-md w-20"></div>
          <div className="h-8 bg-gray-200 rounded-md w-24"></div>
        </div>
        <div className="mt-3 h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="mt-3 h-4 bg-gray-200 rounded w-32"></div>
        <div className="mt-10 flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </section>

      <section className="mt-10 animate-pulse">
        <div className="grid grid-cols-2 gap-2">
          <div className="row-span-2">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </section>

      <section className="mt-16 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </section>
    </>
  );
};

export default PostSkeleton;
