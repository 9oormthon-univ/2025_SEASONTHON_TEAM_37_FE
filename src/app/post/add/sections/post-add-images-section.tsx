import React, { useRef } from 'react';
import { ImageIcon, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '@/apis/services/upload-file';
import { toast } from 'sonner';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { XIcon } from 'lucide-react';
import Image from '@/components/ui/image';

const PostAddImagesSection = ({ id }: { id: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'postImages',
  });

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data: string) => {
      toast.success('사진 업로드에 성공했습니다.');
      append({ imageUrl: data });
    },
    onError: () => {
      toast.error('사진 업로드에 실패했습니다.');
    },
  });

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      fileArray.forEach((file) => {
        uploadMutation.mutate(file);
      });
      resetInput();
    }
  };

  const parseImageName = (imageUrl: string) => {
    return imageUrl.split('/').pop();
  };

  return (
    <section className="flex flex-col gap-4" id={id}>
      <h3 className="text-xl font-semibold text-black">사진첨부</h3>

      <label
        htmlFor="image-input"
        className="flex items-center justify-center border border-secondary h-50 rounded-lg cursor-pointer"
      >
        {uploadMutation.isPending ? (
          <div className="flex flex-col items-center justify-center gap-5">
            <Loader2 className="text-gray-600 size-8 animate-spin" />
            <span className="text-gray-600 font-semibold">
              사진 업로드 중...
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <ImageIcon className="text-gray-600 size-8" />
            <span className="text-gray-600 font-semibold">
              파일 선택 또는 여기로 이미지를 끌어오세요.
            </span>
          </div>
        )}
        <input
          type="file"
          multiple
          onChange={handleChange}
          ref={inputRef}
          id="image-input"
          className="hidden"
          accept="image/*"
        />
      </label>

      <ul className="flex flex-col px-5 border border-secondary rounded-lg">
        {fields.map((field, index) => (
          <li
            key={field.id}
            className="px-4 py-2.5 flex items-center justify-between gap-2 border-b border-secondary"
          >
            <div className="flex items-center gap-8">
              <Image
                // @ts-expect-error react-hook-form
                src={field.imageUrl}
                alt={`post image ${index + 1}`}
                className="w-8 h-8"
              />
              <span className="text-gray-800">
                {
                  // @ts-expect-error react-hook-form
                  parseImageName(field.imageUrl)
                }
              </span>
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              aria-label="사진 삭제"
            >
              <XIcon className="text-gray-600 size-5" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostAddImagesSection;
