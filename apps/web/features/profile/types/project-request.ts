export type ProjectRequestStatus =
  | "pendding"
  | "accepted"
  | "rejected"
  | "expired";

export type ProjectStatus =
  | "open"
  | "closed"
  | "in_progress"
  | "completed"
  | string;

export interface Project {
  id: number;
  title: string;
  status: ProjectStatus;
  model?: number | null;
  employer?: number | null;
  created?: string;
  updated?: string;
}

export interface ProjectRequest {
  id: number;
  project: number;
  senderId: number;
  receiverId: number;
  status: ProjectRequestStatus;
  created: string;
  updated: string;
}

export interface ProjectRequestTableRow {
  id: number;
  request: ProjectRequest;
  project: Project | null;
}
