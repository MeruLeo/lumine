"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectRequest } from "../../api/requests";
import { projectRequestKeys } from "../../api/query-keys";
import type { CreateProjectRequestBodyDto } from "../../types/request";
import type { ProjectRequest } from "../../types/project";

interface UseApplyToProjectOptions {
  onSuccess?: (request: ProjectRequest) => void;
}

export function useApplyToProject({
  onSuccess,
}: UseApplyToProjectOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateProjectRequestBodyDto) =>
      createProjectRequest(body),
    onSuccess: (request) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.lists(),
      });
      onSuccess?.(request);
    },
  });
}
