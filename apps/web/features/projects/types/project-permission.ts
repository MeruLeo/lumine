import type { Project, ProjectRequest } from "./project";

export interface ProjectApplySubject {
  project: Project;
  hasRequested?: boolean;
  currentRequest?: ProjectRequest | null;
}

export interface ProjectRequestSubject {
  project: Project;
  request: ProjectRequest;
}
