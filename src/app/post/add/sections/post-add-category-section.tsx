import React, { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { getCategories } from '@/apis/services/categories';
import { useQuery } from '@tanstack/react-query';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { cn } from '@/lib/utils';

const PostAddCategorySection = ({ id }: { id: string }) => {
  const { control, setValue } = useFormContext();

  const { data: categories } = useQuery({
    queryKey: queryKeyFactory.categories.list,
    queryFn: getCategories,
  });

  const mainCategoryCode = useWatch({
    control,
    name: 'mainCategory',
  });

  const subCategoryCode = useWatch({
    control,
    name: 'subCategory',
  });

  const selectMainCategory = useCallback(
    (mainCategoryCode: string) => {
      setValue('mainCategory', mainCategoryCode);
      setValue('subCategory', null);
    },
    [setValue]
  );

  const selectSubCategory = useCallback(
    (subCategoryCode: string) => {
      setValue('subCategory', subCategoryCode);
    },
    [setValue]
  );

  const mainCategory = categories?.find(
    (category) => category.mainCategoryCode === mainCategoryCode
  );

  const subCategory = mainCategory?.subCategories.find(
    (subCategory) => subCategory.subCategoryCode === subCategoryCode
  );

  const notSelected = !mainCategory || !subCategory;

  return (
    <section className="flex flex-col gap-4" id={id}>
      <h3 className="text-xl font-semibold text-black">카테고리</h3>

      <div className="flex flex-col gap-6">
        <div className="flex items-center rounded-md bg-tertiary px-8 py-5 h-20">
          {notSelected ? (
            <span className="text-gray-600">카테고리를 선택해주세요.</span>
          ) : (
            <div className="flex items-center gap-5">
              <span className="px-4 py-2 font-semibold bg-primary text-white rounded-md">
                {mainCategory.mainCategoryLabel}
              </span>
              <span className="px-4 py-2 font-semibold border border-primary text-primary rounded-md">
                {subCategory.subCategoryLabel}
              </span>
            </div>
          )}
        </div>

        <ul className="border border-secondary rounded-md h-80 block md:hidden pl-8 py-5 flex flex-col gap-2 border-r border-secondary overflow-y-auto">
          {categories?.map((category) => (
            <li
              key={category.mainCategoryCode}
              role="button"
              className={cn(
                'p-2 font-semibold',
                mainCategoryCode === category.mainCategoryCode && 'text-primary'
              )}
              onClick={() => selectMainCategory(category.mainCategoryCode)}
            >
              {category.mainCategoryLabel}
            </li>
          ))}
        </ul>

        <div className="flex border border-secondary rounded-md h-80">
          <ul className="hidden md:block w-[256px] pl-8 py-5 flex flex-col gap-2 border-r border-secondary overflow-y-auto">
            {categories?.map((category) => (
              <li
                key={category.mainCategoryCode}
                role="button"
                className={cn(
                  'p-2 font-semibold',
                  mainCategoryCode === category.mainCategoryCode &&
                    'text-primary'
                )}
                onClick={() => selectMainCategory(category.mainCategoryCode)}
              >
                {category.mainCategoryLabel}
              </li>
            ))}
          </ul>
          {mainCategory?.subCategories ? (
            <ul className="flex-1 px-9 py-5 h-fit max-h-full flex gap-3 flex-wrap overflow-y-auto">
              {mainCategory?.subCategories.map((subCategory) => (
                <li
                  key={subCategory.subCategoryCode}
                  role="button"
                  className={cn(
                    'h-fit px-7.5 py-2.5 border border-gray-300 text-gray-800 px-4 py-2 rounded-full font-semibold',
                    subCategoryCode === subCategory.subCategoryCode &&
                      'border-primary text-primary'
                  )}
                  onClick={() => selectSubCategory(subCategory.subCategoryCode)}
                >
                  {subCategory.subCategoryLabel}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex-1 text-gray-600 font-semibold flex items-center justify-center">
              메인 카테고리를 선택해주세요.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostAddCategorySection;
