"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createProjectSchema,
  CreateProjectFormInput,
  CreateProjectType,
} from "../../../schemas/employer/add-project";

const DEFAULT_VALUES: Partial<CreateProjectFormInput> = {
  name: "",
  description: "",
  budget: undefined,
  category_id: undefined,
  province_id: undefined,
  start_date: undefined,
  end_date: undefined,
};

export function useCreateProjectForm(
  defaultValues?: Partial<CreateProjectFormInput>,
) {
  return useForm<CreateProjectFormInput, unknown, CreateProjectType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      ...defaultValues,
    },
    mode: "onBlur",
  });
}
