import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';

interface Props {
  title: string;
  subTitle: string;
  name: string;
  id: string;
}

const PostAddContentSection = ({ title, subTitle, name, id }: Props) => {
  const { register } = useFormContext();

  return (
    <section className="flex flex-col" id={id}>
      <h3 className="text-xl font-semibold text-black">{title}</h3>
      <p className="mt-2 text-gray-400">{subTitle}</p>

      <Textarea
        placeholder="내용을 작성해 주세요."
        className="mt-5 h-64 px-6 py-5 text-base"
        rows={4}
        {...register(name)}
      />
    </section>
  );
};

export default PostAddContentSection;
