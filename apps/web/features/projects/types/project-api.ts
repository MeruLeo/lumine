import type {
  ModerationStatus,
  ProjectRequestStatus,
  ProjectStatus,
} from "./project";

export interface ProjectUserDto {
  id: number;
  first_name: string;
  last_name: string;
  avatar?: string | null;
  username?: string;
}

export interface ProvinceDto {
  id: number;
  name: string;
  slug: string;
  code?: boolean | null;
}

export interface ProjectCategoryDto {
  id: number;
  name: string;
  persion_name?: string;
  type?: string;
}

export interface ProjectDto {
  id: number;
  employer: ProjectUserDto;
  model: ProjectUserDto | null;

  province: ProvinceDto;
  category: ProjectCategoryDto;

  name: string;
  description: string;
  budget: number;

  start_date: string;
  end_date: string;

  moderation_status: ModerationStatus;
  status: ProjectStatus;

  expires_at: string | null;

  created: string;
  updated: string;
}

export interface ProjectRequestDto {
  id: number;
  project: number;
  sender: ProjectUserDto;
  receiver: ProjectUserDto;

  status: ProjectRequestStatus;

  created: string;
  updated: string;
}

export interface PaginatedResponseDto<TData> {
  count: number;
  next: string | null;
  previous: string | null;
  results: TData[];
}

export interface ApiEnvelopeDto<TData> {
  success: boolean;
  message: string;
  data: TData;
}

export type ProjectsListDto =
  | ProjectDto[]
  | PaginatedResponseDto<ProjectDto>
  | ApiEnvelopeDto<ProjectDto[]>
  | ApiEnvelopeDto<PaginatedResponseDto<ProjectDto>>;
