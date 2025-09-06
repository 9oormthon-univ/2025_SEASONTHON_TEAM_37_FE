'use client';

import { queryKeyFactory } from '@/apis/query-key-factory';
import { Category, SubCategory } from '@/types/categories';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const useCategorySearchParams = () => {
  const queryClient = useQueryClient();

  const categories = queryClient.getQueryData<Category[]>(
    queryKeyFactory.categories.list
  );

  const searchParams = useSearchParams();
  const mainCategoryCode = searchParams.get(
    'mc_code'
  ) as Category['mainCategoryCode'];
  const subCategoryCode = searchParams.get(
    'sc_code'
  ) as SubCategory['subCategoryCode'];

  const mainCategory = categories?.find(
    (category) => category.mainCategoryCode === mainCategoryCode
  );

  const subCategory = mainCategory?.subCategories.find(
    (subCategory) => subCategory.subCategoryCode === subCategoryCode
  );

  return { mainCategoryCode, subCategoryCode, mainCategory, subCategory };
};

export default useCategorySearchParams;
