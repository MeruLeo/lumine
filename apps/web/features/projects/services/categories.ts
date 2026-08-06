import { queryOptions } from "@tanstack/react-query";

import { axiosInstance } from "@/shared/lib/http/axios";

import type { ProjectCategory } from "../types/project";

export const categoriesQueryKey = ["categories"] as const;

export async function getCategories(): Promise<ProjectCategory[]> {
  const { data } = await axiosInstance.get<{
    data: ProjectCategory[];
  }>("/auth/categories");

  return data.data;
}

export const categoriesOptions = () =>
  queryOptions({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
    staleTime: Infinity,
  });
