"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectRequests } from "../../api/requests";
import { projectRequestKeys } from "../../api/query-keys";
import { useMe } from "@/features/profile/hooks/mutations/use-me";

export function useProjectRequestStatus(projectId: number) {
  const user = useMe();

  const query = useQuery({
    queryKey: projectRequestKeys.list({ project: projectId, sender: user?.id }),
    queryFn: () => getProjectRequests({ project: projectId, sender: user!.id }),
    enabled: Boolean(user),
  });

  return {
    hasRequested:
      query.data?.some((r) => r.senderId === user?.data?.id) ?? false,
    isLoading: query.isLoading,
  };
}
