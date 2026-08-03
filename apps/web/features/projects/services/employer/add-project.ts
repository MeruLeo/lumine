import { mutationOptions } from "@tanstack/react-query";
import { createProject } from "../../api/employer/add-project";

export const createProjectOptions = () =>
  mutationOptions({
    mutationFn: createProject,
    mutationKey: ["createProject"],
  });
