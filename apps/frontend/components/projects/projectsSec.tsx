"use client";

import React from "react";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";

import { IProjectsSec } from "@/types/projects";

const ProjectSec = ({ name, icon, link, color, secondColor }: IProjectsSec) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        className={`${pathname === link ? "bg-Porcelain_White text-Jet_Black_4 hover:cursor-default" : "bg-Jet_Black_4 hover:bg-Jet_Black_4 text-Porcelain_White"} relative transition-all duration-200 hover:scale-95 flex font-bold items-center gap-2 w-[12rem] h-[4rem] rounded-full`}
        href={link}
      >
        {/* <div
          className={`absolute top-14 rounded-full blur-xl bg-gradient-to-tl ${color} ${secondColor} w-12 h-12`}
        /> */}
        <span
          className={`bg-gradient-to-tr ${color} ${secondColor} mr-1 z-0 p-4 text-7xl rounded-full`}
        >
          {icon}
        </span>
        <div className="text-center">
          <h4 className="">{name}</h4>
        </div>
      </Link>
    </li>
  );
};

export const ProjectsSecs = ({
  projectsSecs,
}: {
  projectsSecs: IProjectsSec[];
}) => {
  return (
    <ul className="flex items-center w-full gap-4">
      {projectsSecs.map((ps, i) => (
        <ProjectSec
          key={i}
          color={ps.color}
          count={ps.count}
          icon={ps.icon}
          link={ps.link}
          name={ps.name}
          secondColor={ps.secondColor}
        />
      ))}
    </ul>
  );
};
