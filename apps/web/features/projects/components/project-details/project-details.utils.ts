import type { ReactNode } from "react";
import type { Project } from "../../types/project";
import type { DetailItem } from "./project-details.types";
import { formatBudget } from "../../utils/format";

interface MapProjectToDetailsArgs {
  project: Project;
  statusBadge: ReactNode;
  employerChip: ReactNode;
  modelChip: ReactNode | null;
  walletIcon: ReactNode;
  tagIcon: ReactNode;
  mapPinIcon: ReactNode;
  calendarIcon: ReactNode;
  clockIcon: ReactNode;
  signalIcon: ReactNode;
  personNutHexIcon: ReactNode;
  personIcon: ReactNode;
}

export const mapProjectToDetails = ({
  project,
  statusBadge,
  employerChip,
  modelChip,
  walletIcon,
  tagIcon,
  mapPinIcon,
  calendarIcon,
  clockIcon,
  signalIcon,
  personNutHexIcon,
  personIcon,
}: MapProjectToDetailsArgs): DetailItem[] => {
  return [
    {
      key: "status",
      icon: signalIcon,
      label: "وضعیت",
      content: statusBadge,
    },
    {
      key: "employer",
      icon: personNutHexIcon,
      label: "کارفرما",
      content: employerChip,
    },
    {
      key: "model",
      icon: personIcon,
      label: "مدل",
      content: modelChip,
      visible: Boolean(project.model),
    },
    {
      key: "budget",
      icon: walletIcon,
      label: "بودجه",
      content: `${formatBudget(project.budget)} تومان`,
    },
    {
      key: "category",
      icon: tagIcon,
      label: "دسته‌بندی",
      content: project.category.persion_name,
    },
    {
      key: "province",
      icon: mapPinIcon,
      label: "استان",
      content: project.province.name,
    },
    {
      key: "date-range",
      icon: calendarIcon,
      label: "بازه زمانی",
      content: `${project.startDate} تا ${project.endDate}`,
    },
    {
      key: "created",
      icon: clockIcon,
      label: "تاریخ ایجاد",
      content: project.created,
    },
  ];
};
