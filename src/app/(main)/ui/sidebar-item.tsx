'use client';

import { Category } from '@/types/categories';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import useCategorySearchParams from '../lib/use-category-search-params';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { PATH } from '@/lib/path';

interface SidebarItemProps {
  category: Category;
}

const SidebarItem = ({ category }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { mainCategoryCode, subCategoryCode } = useCategorySearchParams();

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const isSelected = category.mainCategoryCode === mainCategoryCode;

  const isSelectedSubCategory = useCallback(
    (s: string) => {
      return s === subCategoryCode;
    },
    [subCategoryCode]
  );

  const selectSubCategory = useCallback(
    (s: string) => {
      setIsOpen(false);
      const queryString = new URLSearchParams(searchParams);
      queryString.set('mc_code', category.mainCategoryCode);
      queryString.set('sc_code', s);

      router.push(`${PATH.category}?${queryString.toString()}`);
    },
    [category.mainCategoryCode, router, searchParams]
  );

  useEffect(() => {
    setIsOpen(isSelected);
  }, [isSelected, mainCategoryCode, subCategoryCode]);

  return (
    <li className="">
      <div role="button" className="py-1.5 cursor-pointer" onClick={onToggle}>
        <span
          className={cn(
            'text-lg font-semibold text-gray-800',
            isSelected && 'text-primary'
          )}
        >
          {category.mainCategoryLabel}
        </span>
      </div>
      {isOpen && (
        <ul className="mt-2 flex flex-col gap-1">
          {category.subCategories.map((subCategory) => (
            <li
              key={subCategory.subCategoryCode}
              className="py-1 cursor-pointer"
              onClick={() => selectSubCategory(subCategory.subCategoryCode)}
            >
              <span
                className={cn(
                  'text-gray-600',
                  isSelectedSubCategory(subCategory.subCategoryCode) &&
                    'text-primary'
                )}
              >
                {subCategory.subCategoryLabel}
              </span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
