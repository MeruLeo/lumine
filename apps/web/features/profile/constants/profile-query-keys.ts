export const profileQueryKeys = {
  all: ["profile"] as const,

  me: () => [...profileQueryKeys.all, "me"] as const,

  roles: () => [...profileQueryKeys.all, "roles"] as const,

  basicInfo: () => [...profileQueryKeys.all, "basic-info"] as const,

  technicalInfo: () => [...profileQueryKeys.all, "technical-info"] as const,

  categories: () => [...profileQueryKeys.all, "categories"] as const,

  images: () => [...profileQueryKeys.all, "images"] as const,

  employerProjects: () =>
    [...profileQueryKeys.all, "employer-projects"] as const,

  modelProjects: () => [...profileQueryKeys.all, "model-projects"] as const,

  requests: (params?: Record<string, unknown>) =>
    [...profileQueryKeys.all, "requests", params] as const,

  request: (requestId: number) =>
    [...profileQueryKeys.all, "requests", requestId] as const,
};
