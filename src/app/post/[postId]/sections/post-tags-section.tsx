import React from 'react';
import { Post } from '@/types/post';
import PostTag from '../ui/post-tag';

interface Props {
  post: Post;
}

const PostTagsSection = ({ post }: Props) => {
  const { tags } = post;

  return (
    <section className="mt-32">
      <div className="flex items-center gap-2">
        {tags.map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </div>
    </section>
  );
};

export default PostTagsSection;
