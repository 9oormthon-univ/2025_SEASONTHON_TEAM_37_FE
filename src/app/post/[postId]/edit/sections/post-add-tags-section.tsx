import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { XIcon } from 'lucide-react';

const PostAddTagsSection = ({ id }: { id: string }) => {
  const [inputValue, setInputValue] = useState('');
  const { control, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;

    // 중복 방지
    const current = (getValues('tags') ?? []) as Array<{ value: string }>;
    const exists = current.some(
      (t) => t?.value?.toLowerCase() === tag.toLowerCase()
    );
    if (exists) return;

    append({ value: tag });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
      setInputValue('');
    }
  };

  return (
    <section className="flex flex-col gap-4" id={id}>
      <h3 className="text-xl font-semibold text-black">태그</h3>

      <Input
        placeholder="태그를 입력 후 콤마(,)나 Enter를 누르세요"
        className="h-13 px-6 text-base"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <ul className="flex flex-wrap gap-2">
        {fields.map((field, index) => (
          <li
            key={field.id}
            className="px-2 py-1 bg-tertiary text-gray-500 rounded-sm flex items-center gap-2"
          >
            #{' '}
            {
              /* @ts-expect-error react-hook-form */
              field.value
            }
            <button
              type="button"
              onClick={() => remove(index)}
              aria-label="태그 삭제"
            >
              <XIcon className="text-gray-500 size-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostAddTagsSection;
