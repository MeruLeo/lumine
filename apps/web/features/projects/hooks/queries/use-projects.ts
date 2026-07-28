"use client";

import { useQuery } from "@tanstack/react-query";
import { projectsQueryOptions } from "../../services/project-queries";
import type { GetProjectsParams } from "../../types/project-query";

export function useProjects(params?: GetProjectsParams) {
  return useQuery(projectsQueryOptions(params));
}
