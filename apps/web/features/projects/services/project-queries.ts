import { queryOptions } from "@tanstack/react-query";
import { getProject, getProjects } from "../api/projects";
import { projectQueryKeys } from "../constants/project-query-keys";
import type { GetProjectsParams } from "../types/project-query";

export const projectsQueryOptions = (params?: GetProjectsParams) =>
  queryOptions({
    queryKey: projectQueryKeys.list(params),
    queryFn: () => getProjects(params),
  });

export const projectQueryOptions = (projectId: number) =>
  queryOptions({
    queryKey: projectQueryKeys.detail(projectId),
    queryFn: () => getProject(projectId),
    enabled: Number.isFinite(projectId) && projectId > 0,
  });
