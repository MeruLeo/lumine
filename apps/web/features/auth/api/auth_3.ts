import { axiosInstance } from "@/shared/lib/http/axios";
import {
  TechnicalInfo_RoleResponse,
  TechnicalInfo_CategoryResponse,
  TechnicalInfo_RolePayload,
  TechnicalInfo_CategoryPayload,
  UserRole,
  Category,
} from "../types/auth_3";
import { PaginatedResponse } from "@/shared/types/paginated";

export async function setRole(
  payload: TechnicalInfo_RolePayload,
): Promise<TechnicalInfo_RoleResponse> {
  const { data } = await axiosInstance.post("/auth/set-role/", payload);
  return data;
}

export async function getCategories(role: UserRole): Promise<Category[]> {
  const categories: Category[] = [];

  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const { data } = await axiosInstance.get<PaginatedResponse<Category>>(
      "/auth/categories/",
      {
        headers: {
          type: role,
        },
        params: {
          page,
        },
      },
    );

    categories.push(...data.results);

    hasNextPage = Boolean(data.next);
    page += 1;
  }

  return categories;
}

export async function setCategory(
  payload: TechnicalInfo_CategoryPayload,
): Promise<TechnicalInfo_CategoryResponse> {
  const { data } = await axiosInstance.post("/auth/p-category/", payload);
  return data;
}
