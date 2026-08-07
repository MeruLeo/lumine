import type { ProjectRequestStatus } from "./project";

export interface ProjectRequestDto {
  id: number;
  status: ProjectRequestStatus;
  created: string;
  updated: string;
  project: number;
  sender: number;
  receiver: number;
}

export interface CreateProjectRequestBodyDto {
  project: number;
}

export interface UpdateProjectRequestBodyDto {
  status: Exclude<ProjectRequestStatus, "pendding">;
}
