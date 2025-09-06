import React from 'react';
import { Post } from '@/types/post';
import Image from '@/components/ui/image';

interface Props {
  post: Post;
}

const PostImagesSection = ({ post }: Props) => {
  const images = post.imageUrls;

  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <section className="h-100 mt-10">
        <Image
          src={images[0]}
          alt={`${post.title} image 1`}
          className="rounded-lg h-full"
        />
      </section>
    );
  }

  if (images.length === 2) {
    return (
      <section className="h-100 mt-10 grid grid-cols-2 gap-5">
        <Image
          src={images[0]}
          alt={`${post.title} image 1`}
          className="rounded-lg"
        />
        <Image
          src={images[1]}
          alt={`${post.title} image 2`}
          className="rounded-lg"
        />
      </section>
    );
  }

  if (images.length === 3) {
    return (
      <section className="h-100 mt-10 grid grid-cols-3 grid-rows-2 gap-5">
        <Image
          src={images[0]}
          alt={`${post.title} image 1`}
          className="col-span-2 row-span-2 rounded-lg"
        />
        <Image
          src={images[1]}
          alt={`${post.title} image 2`}
          className="rounded-lg"
        />
        <Image
          src={images[2]}
          alt={`${post.title} image 3`}
          className="rounded-lg"
        />
      </section>
    );
  }

  return (
    <section className="h-100 mt-10 grid grid-cols-3 grid-rows-2 gap-5">
      <Image
        src={images[0]}
        alt={`${post.title} image 1`}
        className="col-span-2 row-span-2 rounded-lg"
      />
      <Image
        src={images[1]}
        alt={`${post.title} image 2`}
        className="rounded-lg"
      />
      <div className="relative">
        <div className="rounded-lg absolute inset-0 z-10 bg-black/50 flex items-center justify-center">
          <p className="text-white font-semibold text-2xl ">
            +{images.length - 3}
          </p>
        </div>
        <Image
          src={images[2]}
          alt={`${post.title} image 3`}
          className="rounded-lg h-full"
        />
      </div>
    </section>
  );
};

export default PostImagesSection;
