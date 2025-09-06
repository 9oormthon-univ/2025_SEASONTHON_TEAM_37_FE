import React from 'react';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

const PostAddTitleSection = ({ id }: { id: string }) => {
  const { register } = useFormContext();

  return (
    <section className="flex flex-col gap-4" id={id}>
      <h3 className="text-xl font-semibold text-black">제목</h3>
      <Input
        placeholder="제목을 입력해주세요."
        className="h-13 px-6 text-base"
        {...register('title')}
      />
    </section>
  );
};

export default PostAddTitleSection;
