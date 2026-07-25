import type { ReactNode } from "react";
import type { Project } from "../../types/project";

export interface ProjectDetailsProps {
  project: Project;
  onCollaborate?: () => void;
  isLoadingAction?: boolean;
}

export interface DetailItem {
  key: string;
  icon: ReactNode;
  label: string;
  content: ReactNode;
  visible?: boolean;
}
