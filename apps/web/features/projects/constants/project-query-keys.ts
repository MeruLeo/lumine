import type { GetProjectsParams } from "../types/project-query";

export const projectQueryKeys = {
  all: ["projects"] as const,

  lists: () => [...projectQueryKeys.all, "list"] as const,

  list: (params?: GetProjectsParams) =>
    [...projectQueryKeys.lists(), params ?? {}] as const,

  details: () => [...projectQueryKeys.all, "detail"] as const,

  detail: (projectId: number) =>
    [...projectQueryKeys.details(), projectId] as const,
};
