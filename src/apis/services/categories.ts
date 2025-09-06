import { Category } from "@/types/categories";
import { api } from "../axios";
import { API_PATH } from "../path";

export async function getCategories() {
  const { data } = await api.get<Category[]>(API_PATH.categories.list);
  return data;
}
