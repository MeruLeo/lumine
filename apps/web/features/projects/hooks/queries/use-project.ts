"use client";

import { useQuery } from "@tanstack/react-query";
import { projectQueryOptions } from "../../services/project-queries";

export function useProject(projectId: number) {
  return useQuery(projectQueryOptions(projectId));
}
