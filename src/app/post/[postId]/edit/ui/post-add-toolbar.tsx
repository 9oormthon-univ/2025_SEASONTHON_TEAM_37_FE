import { cn } from '@/lib/utils';
import { CheckIcon, SquareIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { PostEditFormData } from '../utils';
import { useCallback } from 'react';
import PostPublishButton from './post-publish-button';
import PostEditButton from './post-edit-button';

const SectionItem = ({
  name,
  completed,
  to,
}: {
  name: string;
  completed: boolean;
  to: string;
}) => {
  const moveToSection = () => {
    const target = document.getElementById(to);
    if (target) {
      target.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  };

  return (
    <li
      className="px-5 py-2 flex items-center justify-between"
      onClick={moveToSection}
    >
      <span role="button" className="text-gray-800 text-xl font-medium">
        {name}
      </span>
      <CheckIcon
        className={cn('text-gray-200 size-6', completed && 'text-primary')}
      />
    </li>
  );
};

const PostAddToolbar = () => {
  const { watch, setValue } = useFormContext<PostEditFormData>();

  const values = watch();

  const isCompleted = useCallback(
    (name: keyof PostEditFormData) => {
      if (name === 'tags') {
        return !!(values?.tags?.length ?? 0 > 0);
      }
      if (name === 'postImages') {
        return !!(values?.postImages?.length ?? 0 > 0);
      }

      return !!values[name];
    },
    [values]
  );

  return (
    <aside className="hidden lg:flex sticky w-76 top-4 self-start flex flex-col gap-5">
      <div className="border border-secondary rounded-lg p-7">
        <ul className="flex flex-col gap-2">
          <SectionItem
            name="제목"
            completed={isCompleted('title')}
            to="title-section"
          />
          <SectionItem
            name="카테고리 선택"
            completed={
              isCompleted('mainCategory') && isCompleted('subCategory')
            }
            to="category-section"
          />
          <SectionItem
            name="태그"
            completed={isCompleted('tags')}
            to="tag-section"
          />
          <SectionItem
            name="상황"
            completed={isCompleted('situationContent')}
            to="situation-section"
          />
          <SectionItem
            name="실패/좌절"
            completed={isCompleted('failureContent')}
            to="failure-section"
          />
          <SectionItem
            name="핵심배움"
            completed={isCompleted('learningContent')}
            to="learning-section"
          />
          <SectionItem
            name="다음단계"
            completed={isCompleted('nextStepContent')}
            to="nextStep-section"
          />
          <SectionItem
            name="사진첨부"
            completed={isCompleted('postImages')}
            to="image-section"
          />
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <PostEditButton />
          <PostPublishButton />
        </div>
      </div>

      <div className="bg-tertiary rounded-md px-7 py-3 flex items-center justify-between">
        <span className="text-xl text-gray-800">익명</span>
        <button
          type="button"
          onClick={() => setValue('isAnonymous', !values.isAnonymous)}
        >
          {values.isAnonymous ? (
            <CheckIcon className="text-primary size-6 rounded-md" />
          ) : (
            <SquareIcon className="text-secondary fill-white size-6 rounded-md" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default PostAddToolbar;
