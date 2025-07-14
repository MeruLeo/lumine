import {
  ArrowLeftIcon,
  FolderIcon,
  StartDateIcon,
  StatusIcon,
  TagIcon,
} from "@/components/icons/icons";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { Link } from "@heroui/link";
import { Button, Divider } from "@heroui/react";
import React from "react";

type TicketPreviweProps = {
  title: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: Date;
  category: "financial" | "work" | "teach" | "other";
  number: number;
};

interface TicketPreviewDetailProps {
  title: string;
  value: any;
  icon: React.ReactNode;
  className?: string;
}

const TicketPreviewDetail = ({
  icon,
  title,
  className,
  value,
}: TicketPreviewDetailProps) => {
  return (
    <li className="gradient-border bg-Jet_Black p-2 rounded-3xl h-20 flex flex-col justify-between w-32">
      <span className={`text-xl font-bold ${className}`}>{value}</span>
      <Divider />
      <div className="flex text-sm text-Ash_Gray justify-between">
        <p>{title}</p>
        <span className="">{icon}</span>
      </div>
    </li>
  );
};

export const TicketPreviwe = ({
  title,
  status,
  createdAt,
  category,
  number,
}: TicketPreviweProps) => {
  return (
    <li className="bg-Jet_Black_4 gradient-border_bottom w-fit flex flex-col gap-4 p-4 rounded-[2rem]">
      <header className="flex justify-between items-center">
        <Link
          href={`${number}`}
          className="text-3xl text-Porcelain_White font-bold"
        >
          {title}
        </Link>
        <Button
          endContent={<ArrowLeftIcon />}
          radius="full"
          className="bg-Porcelain_White text-Jet_Black"
        >
          جزئیات
        </Button>
      </header>
      {/* <Divider /> */}
      <main className="flex gap-4">
        <TicketPreviewDetail
          icon={<FolderIcon />}
          title="شماره تیکت"
          value={number}
        />
        <TicketPreviewDetail
          icon={<TagIcon />}
          title="دسته بندی"
          value={category}
        />
        <TicketPreviewDetail
          icon={<StartDateIcon />}
          title="تاریخ ثبت"
          value={createdAt}
        />
        <TicketPreviewDetail
          icon={<StatusIcon />}
          title="وضعیت"
          value={status}
        />
      </main>
    </li>
  );
};
