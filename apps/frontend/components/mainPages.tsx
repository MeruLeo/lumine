import Link from "next/link";

import { UserIcon } from "./icons/icons";

import { IMainPage } from "@/types";

const mainPagesArray: IMainPage[] = [
  {
    name: "خانه",
    link: "",
    icon: <UserIcon />,
  },
  {
    name: "پروژه ها",
    link: "",
    icon: <UserIcon />,
  },
  {
    name: "صندوق",
    link: "",
    icon: <UserIcon />,
  },
  {
    name: "حساب",
    link: "",
    icon: <UserIcon />,
  },
];

const MainPage = ({ name, link, icon }: IMainPage) => {
  return (
    <li key={name}>
      <Link
        className="text-Porcelain_White transition-all duration-200  hover:bg-Jet_Black_3 h-[3rem] p-3 flex justify-center items-center rounded-full w-[3rem]"
        href={link}
      >
        <span>{icon}</span>
      </Link>
    </li>
  );
};

const MainPages = () => {
  return (
    <ul className="bg-Jet_Black_4 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute flex p-1 w-fit items-center justify-between rounded-full">
      {mainPagesArray.map((mp) => (
        <MainPage key={mp.name} icon={mp.icon} link={mp.link} name={mp.name} />
      ))}
    </ul>
  );
};

export default MainPages;
