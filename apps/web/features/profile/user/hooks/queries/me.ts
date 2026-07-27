import { queryOptions } from "@tanstack/react-query";
import { getMe } from "../../../../profile/api/me";

export const meQueryOptions = () =>
  queryOptions({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
  });
