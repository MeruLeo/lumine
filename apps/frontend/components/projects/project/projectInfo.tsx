"use client";
import { Link } from "@heroui/link";

import { ProjectInfoProps } from "@/types/projects";
import { getStatusInfo } from "@/utils/getStatusInfo";

export const ProjectInfo = ({ icon, title, value }: ProjectInfoProps) => {
  const renderValue = () => {
    if (title === "وضعیت" && typeof value === "string") {
      const { label, color } = getStatusInfo(
        value as "pending" | "in_progress" | "completed" | "cancelled",
      );

      return <h3 className={`${color} px-3 rounded-full`}>{label}</h3>;
    }

    if (title === "مدل" && typeof value === "string") {
      return (
        <Link
          className="bg-Ash_Gray text-Jet_Black px-3 rounded-full"
          href={value}
        >
          {value}
        </Link>
      );
    }

    return <h3>{value}</h3>;
  };

  return (
    <li className="flex bg-Jet_Black_2 p-4 rounded-full justify-between w-full gap-16">
      <div className="flex text-Ash_Gray gap-2">
        <span>{icon}</span>
        <h4>{title}</h4>
      </div>
      {renderValue()}
    </li>
  );
};
