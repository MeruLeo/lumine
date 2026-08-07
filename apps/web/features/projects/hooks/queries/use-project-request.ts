"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectRequests } from "../../api/requests";
import { projectRequestKeys } from "../../api/query-keys";
import { useMe } from "@/features/profile/hooks/mutations/use-me";

export function useProjectRequestStatus(projectId: number) {
  const { data: user } = useMe();

  const query = useQuery({
    queryKey: projectRequestKeys.lists(),
    queryFn: () => getProjectRequests(),
    enabled: Boolean(user),
  });

  return {
    hasRequested:
      query.data?.some(
        (r) => r.project === projectId && r.senderId === user?.id,
      ) ?? false,
    isLoading: query.isLoading,
  };
}
