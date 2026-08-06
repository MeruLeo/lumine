"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { useQuery } from "@tanstack/react-query";
import { createProjectFieldConfig } from "../../configs/employer/add-project";
import {
  CreateProjectType,
  createProjectSchema,
} from "../../schemas/employer/add-project";
import { useCreateProject } from "../../hooks/mutations/employer/useAddProject";
import { provincesOptions } from "../../services/provinces";
import { ProvinceDto } from "../../types/project-api";

import { categoriesQueryOptions } from "@/features/auth/services/auth_3";
import { Category } from "@/features/auth/types/auth_3";

interface CreateProjectFormProps {
  onSuccess?: () => void;
}

export const CreateProjectForm = ({ onSuccess }: CreateProjectFormProps) => {
  const { mutate, isPending } = useCreateProject();

  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    categoriesQueryOptions("model"),
  );

  const { data: provinces, isLoading: isProvincesLoading } =
    useQuery(provincesOptions());

  const fields = createProjectFieldConfig({
    categoryOptions:
      categories?.map((category: Category) => ({
        label: category.persion_name || "",
        value: category.id,
      })) ?? [],
    provinceOptions:
      provinces?.map((p: ProvinceDto) => ({
        label: p.name,
        value: p.id,
      })) ?? [],
  });

  const onSubmit = (data: CreateProjectType) => {
    const formatCalendarDate = (dateObj: {
      year: number;
      month: number;
      day: number;
    }): string => {
      const { year, month, day } = dateObj;
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    };

    mutate(
      {
        name: data.name,
        description: data.description,
        category_id: data.category_id,
        province_id: data.province_id,
        budget: data.budget,
        start_date: formatCalendarDate(data["start_date"]),
        end_date: formatCalendarDate(data["end_date"]),
      },
      { onSuccess },
    );
  };

  return (
    <FormBuilder
      fields={fields}
      onSubmit={onSubmit}
      schema={createProjectSchema}
      submitButtonText="ایجاد پروژه"
    />
  );
};
