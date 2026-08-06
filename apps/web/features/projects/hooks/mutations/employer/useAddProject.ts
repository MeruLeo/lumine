"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { createProjectOptions } from "../../../services/employer/add-project";

export function useCreateProject() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    ...createProjectOptions(),

    onSuccess: (data) => {
      const projectStatus = data.data.status;
      const projectId = data.data.id;

      console.log("Project created successfully:", data);

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", "list"] });

      toast.success("پروژه با موفقیت در  صف انتشار قرار گرفت");
    },

    onError: (error: any) => {
      console.error("Project creation error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "خطا در ایجاد پروژه. لطفا دوباره تلاش کنید";

      toast.danger(errorMessage);
    },
  });
}
