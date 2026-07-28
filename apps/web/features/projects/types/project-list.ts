import type { Project } from "./project";

export interface ProjectsListResponse {
  items: Project[];
  count: number;
  next: string | null;
  previous: string | null;
}
