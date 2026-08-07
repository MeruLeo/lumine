import { queryOptions } from "@tanstack/react-query";

import { axiosInstance } from "@/shared/lib/http/axios";

import type { ProvinceDto } from "../types/project-api";

export const provincesQueryKey = ["provinces"] as const;

export async function getProvinces(): Promise<ProvinceDto[]> {
  const { data } = await axiosInstance.get<{ data: ProvinceDto[] }>(
    "/projects/provinces",
  );

  return data.data;
}

export const provincesOptions = () =>
  queryOptions({
    queryKey: provincesQueryKey,
    queryFn: getProvinces,
  });
