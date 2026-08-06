import { axiosInstance } from "@/shared/lib/http/axios";
import { unwrapData } from "@/shared/lib/http/unwrap";

import type { ApiEnvelopeDto } from "@/shared/types/api";
import type {
  CreateProjectRequestBodyDto,
  ProjectRequestDto,
  UpdateProjectRequestBodyDto,
} from "../types/request";
import type { ProjectRequest } from "../types/project";

import { projectRequestDtoToProjectRequest } from "../lib/project-request-adapters";

const REQUESTS_BASE_URL = "/projects/requests/";

export async function getProjectRequests(): Promise<ProjectRequest[]> {
  const { data } = await axiosInstance.get<
    ProjectRequestDto[] | ApiEnvelopeDto<ProjectRequestDto[]>
  >(REQUESTS_BASE_URL);

  return unwrapData(data).map(projectRequestDtoToProjectRequest);
}

export async function getProjectRequest(
  requestId: number,
): Promise<ProjectRequest> {
  const { data } = await axiosInstance.get<
    ProjectRequestDto | ApiEnvelopeDto<ProjectRequestDto>
  >(`${REQUESTS_BASE_URL}${requestId}/`);

  return projectRequestDtoToProjectRequest(unwrapData(data));
}

export async function createProjectRequest(
  body: CreateProjectRequestBodyDto,
): Promise<ProjectRequest> {
  const { data } = await axiosInstance.post<
    ProjectRequestDto | ApiEnvelopeDto<ProjectRequestDto>
  >(REQUESTS_BASE_URL, body);

  return projectRequestDtoToProjectRequest(unwrapData(data));
}

export async function updateProjectRequest(
  requestId: number,
  body: UpdateProjectRequestBodyDto,
): Promise<ProjectRequest> {
  const { data } = await axiosInstance.patch<
    ProjectRequestDto | ApiEnvelopeDto<ProjectRequestDto>
  >(`${REQUESTS_BASE_URL}${requestId}/`, body);

  return projectRequestDtoToProjectRequest(unwrapData(data));
}
