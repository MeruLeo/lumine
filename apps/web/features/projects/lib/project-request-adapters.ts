import type { ProjectRequestDto } from "../types/request";
import type { ProjectRequest } from "../types/project";

export function projectRequestDtoToProjectRequest(
  dto: ProjectRequestDto,
): ProjectRequest {
  return {
    id: dto.id,
    project: dto.project,
    senderId: dto.sender,
    receiverId: dto.receiver,
    status: dto.status,
    created: dto.created,
    updated: dto.updated,
  };
}
