export type ProjectStatus =
  | "draft"
  | "open"
  | "in_progress"
  | "completed"
  | "closed"
  | "cancelled";

export type ModerationStatus = "pending" | "approved" | "rejected";

export type ProjectRequestStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "expired";

export interface ProjectUser {
  id: number;
  fullName: string;
  avatar: string | null;
  username?: string;
}

export interface Province {
  id: number;
  name: string;
}

export interface ProjectCategory {
  id: number;
  name: string;
  persion_name?: string;
  type?: string;
}

export interface Project {
  id: number;
  employer: ProjectUser;
  model: ProjectUser | null;

  province: Province;
  category: ProjectCategory;

  name: string;
  description: string;
  budget: number;

  startDate: string;
  endDate: string;

  moderationStatus: ModerationStatus;
  status: ProjectStatus;

  expiresAt: string | null;

  created: string;
  updated: string;
}

export interface ProjectRequest {
  id: number;
  project: number;
  sender: ProjectUser;
  receiver: ProjectUser;

  status: ProjectRequestStatus;

  created: string;
  updated: string;
}
