import { GraduationCap, Briefcase, Person } from "@gravity-ui/icons";
import { FieldConfig } from "@/shared/types/form/form-builder";
import { getCategories } from "../api/auth_3";
import { UserRole } from "../types/auth_3";

export const auth_3FieldConfig: FieldConfig[] = [
  {
    name: "role",
    type: "select",
    variant: "secondary",
    label: "انتخاب نقش",
    options: [
      { label: "مدل", value: "model", icon: <Person /> },
      { label: "مدرس", value: "instructor", icon: <GraduationCap /> },
      { label: "کارفرما", value: "employer", icon: <Briefcase /> },
    ],
    placeholder: "نقش شما",
    required: true,
  },
  {
    name: "category",
    type: "select",
    variant: "secondary",
    label: "انتخاب دسته بندی",
    placeholder: "دسته بندی",
    dynamicIdentifier: {
      dependsOn: "role",
      defaultDisabled: true,
      defaultOptions: [],
      queryFn: async (role: string) => {
        const categories = await getCategories(role as UserRole);
        return categories.map((cat) => ({
          label: cat.persion_name,
          value: String(cat.id),
        }));
      },
    },
  },
];
