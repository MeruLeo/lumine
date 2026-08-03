import { axiosInstance } from "@/shared/lib/http/axios";
import type {
  ApiEnvelopeDto,
  ProjectDto,
  ProjectsListDto,
} from "../types/project-api";
import type { Project } from "../types/project";
import type { ProjectsListResponse } from "../types/project-list";
import type { GetProjectsParams } from "../types/project-query";
import {
  projectDtoToProject,
  projectsListDtoToProjectsListResponse,
} from "../lib/project-adapters";

function buildProjectsParams(params?: GetProjectsParams) {
  if (!params) return undefined;

  return {
    page: params.page,
    page_size: params.pageSize,

    search: params.search || undefined,

    status: params.status,
    moderation_status: params.moderationStatus,

    category: params.category,
    province: params.province,

    min_budget: params.minBudget,
    max_budget: params.maxBudget,

    ordering: params.ordering,
  };
}

function unwrapData<TData>(value: TData | ApiEnvelopeDto<TData>): TData {
  if (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    "data" in value
  ) {
    return (value as ApiEnvelopeDto<TData>).data;
  }

  return value as TData;
}

export async function getProjects(
  params?: GetProjectsParams,
): Promise<ProjectsListResponse> {
  const { data } = await axiosInstance.get<ProjectsListDto>("/projects/", {
    params: buildProjectsParams(params),
  });

  return projectsListDtoToProjectsListResponse(data);
}

export async function getProject(projectId: number): Promise<Project> {
  const { data } = await axiosInstance.get<
    ProjectDto | ApiEnvelopeDto<ProjectDto>
  >(`/projects/${projectId}/`);

  return projectDtoToProject(unwrapData(data));
}
