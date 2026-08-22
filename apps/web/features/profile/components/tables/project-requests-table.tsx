"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Button, Chip, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMemo } from "react";

import { Can } from "@/shared/components/authorization/can";
import { ProjectAction } from "@/shared/lib/authorization/actions";

import {
  PROJECT_REQUEST_STATUS_COLORS,
  PROJECT_REQUEST_STATUS_LABELS,
} from "../../constants/project-request-status";
import type {
  Project,
  ProjectRequest,
  ProjectRequestStatus,
  ProjectRequestTableRow,
} from "../../types/project-request";
import { DynamicDataTable } from "../../../../shared/components/dynamic-data-table";

type ProjectRequestsTableProps = {
  requests: ProjectRequest[];
  projects: Project[];
  isLoading?: boolean;
  updatingRequestId?: number | null;
  onAccept: (request: ProjectRequest) => void;
  onReject: (request: ProjectRequest) => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function createProjectMap(projects: Project[]) {
  return new Map(projects.map((project) => [project.id, project]));
}

export function ProjectRequestsTable({
  requests,
  projects,
  isLoading = false,
  updatingRequestId = null,
  onAccept,
  onReject,
}: ProjectRequestsTableProps) {
  const projectMap = useMemo(() => createProjectMap(projects), [projects]);

  const rows = useMemo<ProjectRequestTableRow[]>(
    () =>
      requests.map((request) => ({
        id: request.id,
        request,
        project: projectMap.get(request.project) ?? null,
      })),
    [projectMap, requests],
  );

  const columns = useMemo<ColumnDef<ProjectRequestTableRow>[]>(
    () => [
      {
        id: "title",
        accessorFn: (row) => row.project?.title ?? "پروژه نامشخص",
        header: "پروژه",
        enableSorting: true,
        cell: ({ row }) => (
          <div className="flex min-w-0 flex-col gap-1">
            <span className="truncate text-sm font-medium text-foreground">
              {row.original.project?.title ?? "پروژه نامشخص"}
            </span>
            <span className="text-xs text-muted">
              شناسه درخواست: {row.original.request.id}
            </span>
          </div>
        ),
      },
      {
        id: "senderId",
        accessorFn: (row) => row.request.senderId,
        header: "فرستنده",
        enableSorting: true,
        cell: ({ row }) => (
          <span className="text-sm">{row.original.request.senderId}</span>
        ),
      },
      {
        id: "receiverId",
        accessorFn: (row) => row.request.receiverId,
        header: "گیرنده",
        enableSorting: true,
        cell: ({ row }) => (
          <span className="text-sm">{row.original.request.receiverId}</span>
        ),
      },
      {
        id: "status",
        accessorFn: (row) => row.request.status,
        header: "وضعیت",
        enableSorting: true,
        cell: ({ row }) => {
          const status = row.original.request.status as ProjectRequestStatus;

          return (
            <Chip
              color={PROJECT_REQUEST_STATUS_COLORS[status]}
              size="sm"
              variant="soft"
            >
              {PROJECT_REQUEST_STATUS_LABELS[status]}
            </Chip>
          );
        },
      },
      {
        id: "created",
        accessorFn: (row) => row.request.created,
        header: "تاریخ ایجاد",
        enableSorting: true,
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm">
            {formatDate(row.original.request.created)}
          </span>
        ),
      },
      {
        id: "actions",
        header: "عملیات",
        enableSorting: false,
        cell: ({ row }) => {
          const { project, request } = row.original;
          const isUpdating = updatingRequestId === request.id;

          if (!project || request.status !== "pendding") {
            return <span className="text-xs text-muted">بدون عملیات</span>;
          }

          const subject = { project, request };

          return (
            <div className="flex items-center gap-2">
              <Can action={ProjectAction.AcceptRequest} subject={subject}>
                <Tooltip content="تأیید درخواست">
                  <Button
                    isIconOnly
                    color="success"
                    size="sm"
                    isLoading={isUpdating}
                    onPress={() => onAccept(request)}
                  >
                    <Icon className="size-4" icon="gravity-ui:check" />
                  </Button>
                </Tooltip>
              </Can>

              <Can action={ProjectAction.RejectRequest} subject={subject}>
                <Tooltip content="رد درخواست">
                  <Button
                    isIconOnly
                    size="sm"
                    isPending={isUpdating}
                    onPress={() => onReject(request)}
                  >
                    <Icon className="size-4" icon="gravity-ui:xmark" />
                  </Button>
                </Tooltip>
              </Can>
            </div>
          );
        },
      },
    ],
    [onAccept, onReject, updatingRequestId],
  );

  return (
    <DynamicDataTable
      ariaLabel="جدول درخواست‌های پروژه"
      columns={columns}
      data={rows}
      emptyText="درخواستی برای نمایش وجود ندارد"
      getRowId={(row) => String(row.id)}
      isLoading={isLoading}
      minWidth={860}
      pageSize={8}
    />
  );
}
