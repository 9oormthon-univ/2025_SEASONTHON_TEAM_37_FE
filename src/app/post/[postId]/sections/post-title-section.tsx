import React from 'react';
import { Post } from '@/types/post';
import Image from '@/components/ui/image';
import { BlankUserIcon } from '@/components/icons';
import { format } from 'date-fns';

interface Props {
  post: Post;
}

const PostTitleSection = ({ post }: Props) => {
  const { category, title, createdAt, author } = post;

  return (
    <section className="mt-10">
      <div className="flex items-center gap-2">
        <span className="px-4 py-1 text-xl font-semibold bg-primary text-white rounded-md">
          {category.mainCategoryLabel}
        </span>
        <span className="px-4 py-1 text-xl font-semibold text-primary border border-primary rounded-md">
          {category.subCategoryLabel}
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-semibold text-gray-800">{title}</h1>

      <p className="mt-3 text-sm text-gray-500">
        {format(createdAt, 'yyyy.MM.dd HH:mm')}
      </p>

      <div className="mt-10 flex items-center gap-2">
        <Image
          src={author.profileImage ?? 'generate-error'}
          alt={author.nickname}
          className="w-6 h-6 rounded-full"
          fallback={<BlankUserIcon className="text-secondary size-6" />}
        />
        <span className="text-sm text-gray-500">{author.nickname}</span>
      </div>
    </section>
  );
};

export default PostTitleSection;
