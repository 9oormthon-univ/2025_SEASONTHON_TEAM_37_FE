export interface SubCategory {
  subCategoryCode: string;
  subCategoryLabel: string;
}

export interface Category {
  mainCategoryCode: string;
  mainCategoryLabel: string;
  subCategories: SubCategory[];
}
