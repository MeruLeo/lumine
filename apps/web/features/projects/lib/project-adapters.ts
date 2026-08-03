import type {
  PaginatedResponseDto,
  ProjectDto,
  ProjectUserDto,
  ProjectRequestDto,
  ProjectsListDto,
} from "../types/project-api";
import type { Project, ProjectRequest, ProjectUser } from "../types/project";
import type { ProjectsListResponse } from "../types/project-list";

export function projectUserDtoToProjectUser(dto: ProjectUserDto): ProjectUser {
  const fullName =
    [dto.first_name, dto.last_name].filter(Boolean).join(" ") ||
    dto.username ||
    "کاربر ناشناس";

  return {
    id: dto.id,
    fullName,
    avatar: dto.avatar ?? null,
    username: dto.username,
  };
}

export function projectDtoToProject(dto: ProjectDto): Project {
  return {
    id: dto.id,

    employer: projectUserDtoToProjectUser(dto.employer),
    model: dto.model ? projectUserDtoToProjectUser(dto.model) : null,

    province: {
      id: dto.province.id,
      name: dto.province.name,
    },

    category: {
      id: dto.category.id,
      name: dto.category.name,
      persion_name: dto.category.persion_name,
      type: dto.category.type,
    },

    name: dto.name,
    description: dto.description,
    budget: dto.budget,

    startDate: dto.start_date,
    endDate: dto.end_date,

    moderationStatus: dto.moderation_status,
    status: dto.status,

    expiresAt: dto.expires_at,

    created: dto.created,
    updated: dto.updated,
  };
}

export function projectRequestDtoToProjectRequest(
  dto: ProjectRequestDto,
): ProjectRequest {
  return {
    id: dto.id,
    project: dto.project,
    senderId: projectUserDtoToProjectUser(dto.sender),
    receiver: projectUserDtoToProjectUser(dto.receiver),
    status: dto.status,
    created: dto.created,
    updated: dto.updated,
  };
}

function isApiEnvelope<TData>(
  value: unknown,
): value is { success: boolean; message: string; data: TData } {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    "data" in value
  );
}

function isPaginatedProjectsDto(
  value: unknown,
): value is PaginatedResponseDto<ProjectDto> {
  return (
    typeof value === "object" &&
    value !== null &&
    "results" in value &&
    Array.isArray((value as PaginatedResponseDto<ProjectDto>).results)
  );
}

export function projectsListDtoToProjectsListResponse(
  dto: ProjectsListDto,
): ProjectsListResponse {
  const rawData = isApiEnvelope<
    ProjectDto[] | PaginatedResponseDto<ProjectDto>
  >(dto)
    ? dto.data
    : dto;

  if (Array.isArray(rawData)) {
    return {
      items: rawData.map(projectDtoToProject),
      count: rawData.length,
      next: null,
      previous: null,
    };
  }

  if (isPaginatedProjectsDto(rawData)) {
    return {
      items: rawData.results.map(projectDtoToProject),
      count: rawData.count,
      next: rawData.next,
      previous: rawData.previous,
    };
  }

  return {
    items: [],
    count: 0,
    next: null,
    previous: null,
  };
}
