export const projectRequestKeys = {
  all: ["project-requests"] as const,
  lists: () => [...projectRequestKeys.all, "list"] as const,
  detail: (id: number) => [...projectRequestKeys.all, "detail", id] as const,
};
