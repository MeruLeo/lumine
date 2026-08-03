"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { createProjectOptions } from "../../../services/employer/add-project";
import {
  CREATE_PROJECT_SUCCESS_ROUTE,
  CREATE_PROJECT_DRAFT_ROUTE,
} from "../../../configs/employer/add-project";

export function useCreateProject() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    ...createProjectOptions(),

    onSuccess: (data) => {
      const projectStatus = data.data.status;
      const projectId = data.data.id;

      console.log("Project created successfully:", data);

      // Invalidate projects list to refetch
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", "list"] });

      // Show success message
      toast.success("پروژه با موفقیت ایجاد شد");

      // Navigate based on project status
      if (projectStatus === "draft") {
        router.push(`${CREATE_PROJECT_DRAFT_ROUTE}/${projectId}`);
      } else {
        router.push(`${CREATE_PROJECT_SUCCESS_ROUTE}/${projectId}`);
      }
    },

    onError: (error: any) => {
      console.error("Project creation error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "خطا در ایجاد پروژه. لطفا دوباره تلاش کنید";

      toast.danger(errorMessage);

      if (error?.response?.status === 401) {
        router.push("/auth");
      }
    },
  });
}
