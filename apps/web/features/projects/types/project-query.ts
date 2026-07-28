import type { ModerationStatus, ProjectStatus } from "./project";

export interface GetProjectsParams {
  page?: number;
  pageSize?: number;

  search?: string;

  status?: ProjectStatus;
  moderationStatus?: ModerationStatus;

  category?: number;
  province?: number;

  minBudget?: number;
  maxBudget?: number;

  ordering?: string;
}
