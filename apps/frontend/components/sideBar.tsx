import { Link } from "@heroui/link";

export type ISidebarLink = {
  title: string;
  link: string;
  icon: React.ReactNode;
};

const SideBarLink = ({ title, link, icon }: ISidebarLink) => {
  return (
    <li className="bg-red-500 p-2 rounded-2xl">
      <Link href={`${link}`}>
        <span>{icon}</span>
        <h6>{title}</h6>
      </Link>
    </li>
  );
};

export const SideBar = ({ links }: { links: ISidebarLink[] }) => {
  return (
    <ul className="bg-Jet_Black_4 w-[40%] border border-Jet_Black_3 p-4 rounded-3xl m-4">
      {links.map((link, i) => (
        <SideBarLink
          key={i}
          title={link.title}
          link={link.link}
          icon={link.icon}
        />
      ))}
    </ul>
  );
};
