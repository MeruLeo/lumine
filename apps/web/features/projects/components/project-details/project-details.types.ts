import type { ReactNode } from "react";
import type { Project } from "../../types/project";

export interface ProjectDetailsProps {
  project: Project;
  collaboration?: ProjectDetailsCollaboration;
}

export interface ProjectDetailsCollaboration {
  visible: boolean;
  onClick: () => void;
  isLoading?: boolean;
  hasRequested: boolean;
}

export interface DetailItem {
  key: string;
  icon: ReactNode;
  label: string;
  content: ReactNode;
  visible?: boolean;
}
