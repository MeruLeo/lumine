"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Chip, Input } from "@heroui/react";
import type { Key, Selection } from "@react-types/shared";

import {
  DataTable,
  type DataTableAction,
  type DataTableColumn,
  type PaginatedResponse,
  type SortDirection,
} from "@/shared/components/table";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ProjectStatus = "active" | "pending" | "completed" | "archived";

type Project = {
  id: number;
  name: string;
  clientName: string;
  manager: string;
  status: ProjectStatus;
  budget: number;
  createdAt: string;
};

// -----------------------------------------------------------------------------
// Mock data - بعداً با API واقعی جایگزین می‌شود
// -----------------------------------------------------------------------------

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Lumine Dashboard",
    clientName: "Lumine",
    manager: "Ali Ahmadi",
    status: "active",
    budget: 145_000_000,
    createdAt: "2026-07-28T10:30:00.000Z",
  },
  {
    id: 2,
    name: "E-commerce Platform",
    clientName: "Memar Rezaei",
    manager: "Sara Mohammadi",
    status: "pending",
    budget: 92_000_000,
    createdAt: "2026-07-25T10:30:00.000Z",
  },
  {
    id: 3,
    name: "SEO Content Strategy",
    clientName: "Ahmadi Tire",
    manager: "Mohammad Karimi",
    status: "active",
    budget: 48_000_000,
    createdAt: "2026-07-19T10:30:00.000Z",
  },
  {
    id: 4,
    name: "CRM Admin Panel",
    clientName: "Novin Tech",
    manager: "Ali Ahmadi",
    status: "completed",
    budget: 185_000_000,
    createdAt: "2026-07-12T10:30:00.000Z",
  },
  {
    id: 5,
    name: "Mobile Application UI",
    clientName: "Aria Group",
    manager: "Neda Hosseini",
    status: "archived",
    budget: 75_000_000,
    createdAt: "2026-07-02T10:30:00.000Z",
  },
  {
    id: 6,
    name: "Job Search Platform",
    clientName: "Career Hub",
    manager: "Reza Ebrahimi",
    status: "active",
    budget: 230_000_000,
    createdAt: "2026-06-29T10:30:00.000Z",
  },
  {
    id: 7,
    name: "Internal Design System",
    clientName: "Lumine",
    manager: "Sara Mohammadi",
    status: "pending",
    budget: 64_000_000,
    createdAt: "2026-06-18T10:30:00.000Z",
  },
  {
    id: 8,
    name: "Payment Gateway Integration",
    clientName: "Shopify Plus",
    manager: "Mohammad Karimi",
    status: "completed",
    budget: 110_000_000,
    createdAt: "2026-06-10T10:30:00.000Z",
  },
  {
    id: 9,
    name: "Analytics Dashboard",
    clientName: "Data Vision",
    manager: "Neda Hosseini",
    status: "active",
    budget: 135_000_000,
    createdAt: "2026-06-05T10:30:00.000Z",
  },
  {
    id: 10,
    name: "Marketing Landing Pages",
    clientName: "Ahmadi Tire",
    manager: "Ali Ahmadi",
    status: "archived",
    budget: 32_000_000,
    createdAt: "2026-05-28T10:30:00.000Z",
  },
  {
    id: 11,
    name: "Supplier Management",
    clientName: "Memar Rezaei",
    manager: "Reza Ebrahimi",
    status: "active",
    budget: 98_000_000,
    createdAt: "2026-05-21T10:30:00.000Z",
  },
  {
    id: 12,
    name: "Customer Support Portal",
    clientName: "Novin Tech",
    manager: "Sara Mohammadi",
    status: "pending",
    budget: 88_000_000,
    createdAt: "2026-05-15T10:30:00.000Z",
  },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const PAGE_SIZE = 5;

const statusConfig: Record<
  ProjectStatus,
  {
    label: string;
    color: "success" | "warning" | "primary" | "default";
  }
> = {
  active: {
    label: "فعال",
    color: "success",
  },
  pending: {
    label: "در انتظار",
    color: "warning",
  },
  completed: {
    label: "تکمیل‌شده",
    color: "primary",
  },
  archived: {
    label: "آرشیو",
    color: "default",
  },
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function getSelectionCount(selection: Selection, total: number) {
  if (selection === "all") {
    return total;
  }

  return selection.size;
}

// -----------------------------------------------------------------------------
// Columns
// -----------------------------------------------------------------------------

const projectColumns = [
  {
    key: "name",
    label: "نام پروژه",
    allowsSorting: true,
    width: 240,
    render: (project: Project) => (
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-foreground">{project.name}</span>
        <span className="text-xs text-default-500">{project.clientName}</span>
      </div>
    ),
  },
  {
    key: "manager",
    label: "مدیر پروژه",
    allowsSorting: true,
    width: 180,
  },
  {
    key: "status",
    label: "وضعیت",
    allowsSorting: true,
    width: 140,
    align: "center",
    render: (project: Project) => {
      const status = statusConfig[project.status];

      return (
        <Chip color={status.color} size="sm">
          {status.label}
        </Chip>
      );
    },
  },
  {
    key: "budget",
    label: "بودجه",
    allowsSorting: true,
    width: 180,
    align: "end",
    render: (project: Project) => (
      <span className="whitespace-nowrap font-medium">
        {formatPrice(project.budget)}
      </span>
    ),
  },
  {
    key: "createdAt",
    label: "تاریخ ایجاد",
    allowsSorting: true,
    width: 160,
    render: (project: Project) => (
      <span className="whitespace-nowrap text-default-600">
        {formatDate(project.createdAt)}
      </span>
    ),
  },
] satisfies DataTableColumn<Project>[];

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function TablePlaygroundPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<Key>());
  const [isLoading, setIsLoading] = useState(false);

  // با تغییر search باید به صفحه اول برگردیم.
  useEffect(() => {
    setPage(1);
  }, [search]);

  // شبیه‌سازی رفتار API شامل search و sorting و pagination.
  const paginatedProjects = useMemo<PaginatedResponse<Project>>(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("fa-IR");

    const filteredProjects = MOCK_PROJECTS.filter((project) => {
      if (!normalizedSearch) {
        return true;
      }

      const searchableValues = [
        project.name,
        project.clientName,
        project.manager,
        statusConfig[project.status].label,
      ];

      return searchableValues.some((value) =>
        value.toLocaleLowerCase("fa-IR").includes(normalizedSearch),
      );
    });

    const sortedProjects = [...filteredProjects].sort((a, b) => {
      const firstValue = a[sortKey as keyof Project];
      const secondValue = b[sortKey as keyof Project];

      if (typeof firstValue === "number" && typeof secondValue === "number") {
        return sortDirection === "asc"
          ? firstValue - secondValue
          : secondValue - firstValue;
      }

      const comparison = String(firstValue).localeCompare(
        String(secondValue),
        "fa",
      );

      return sortDirection === "asc" ? comparison : -comparison;
    });

    const start = (page - 1) * PAGE_SIZE;
    const results = sortedProjects.slice(start, start + PAGE_SIZE);

    return {
      count: sortedProjects.length,
      next:
        start + PAGE_SIZE < sortedProjects.length
          ? `/api/projects?page=${page + 1}`
          : null,
      previous: page > 1 ? `/api/projects?page=${page - 1}` : null,
      results,
    };
  }, [page, search, sortDirection, sortKey]);

  const totalPages = Math.max(
    1,
    Math.ceil(paginatedProjects.count / PAGE_SIZE),
  );

  const handleSortChange = (key: string, direction: SortDirection) => {
    setIsLoading(true);
    setSortKey(key);
    setSortDirection(direction);
    setPage(1);

    // فقط جهت نمایش loading در صفحه تستی
    window.setTimeout(() => setIsLoading(false), 300);
  };

  const handlePageChange = (nextPage: number) => {
    setIsLoading(true);
    setPage(nextPage);

    // فقط جهت نمایش loading در صفحه تستی
    window.setTimeout(() => setIsLoading(false), 300);
  };

  const handleDeleteProject = (project: Project) => {
    const confirmed = window.confirm(
      `آیا از حذف پروژه «${project.name}» مطمئن هستید؟`,
    );

    if (!confirmed) {
      return;
    }

    // در پروژه واقعی:
    // deleteProjectMutation.mutate(project.id)
    console.log("Delete project:", project);
  };

  const rowActions: DataTableAction<Project>[] = [
    {
      key: "view",
      label: "مشاهده جزئیات",
      onPress: (project) => {
        // router.push(`/dashboard/projects/${project.id}`)
        console.log("View project:", project);
      },
    },
    {
      key: "edit",
      label: "ویرایش پروژه",
      onPress: (project) => {
        // router.push(`/dashboard/projects/${project.id}/edit`)
        console.log("Edit project:", project);
      },
      disabled: (project) => project.status === "archived",
    },
    {
      key: "delete",
      label: "حذف پروژه",
      color: "danger",
      onPress: handleDeleteProject,
      hidden: (project) => project.status === "completed",
    },
  ];

  const selectedCount = getSelectionCount(
    selectedKeys,
    paginatedProjects.count,
  );

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-8" dir="rtl">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">تست جدول پروژه‌ها</h1>
          <p className="mt-1 text-sm text-default-500">
            نمونه استفاده از کامپوننت عمومی و داینامیک DataTable
          </p>
        </div>

        <Button color="primary" onPress={() => console.log("Create project")}>
          ایجاد پروژه جدید
        </Button>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          className="max-w-md"
          label="جست‌وجو"
          placeholder="نام پروژه، مشتری یا مدیر پروژه..."
          value={search}
          onValueChange={setSearch}
        />

        {selectedCount > 0 ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-default-600">
              {selectedCount} مورد انتخاب شده است
            </span>

            <Button
              color="danger"
              variant="flat"
              size="sm"
              onPress={() => {
                console.log("Selected keys:", selectedKeys);
              }}
            >
              حذف گروهی
            </Button>

            <Button
              variant="flat"
              size="sm"
              onPress={() => setSelectedKeys(new Set<Key>())}
            >
              لغو انتخاب
            </Button>
          </div>
        ) : null}
      </section>

      <DataTable<Project>
        ariaLabel="جدول لیست پروژه‌ها"
        items={paginatedProjects}
        columns={projectColumns}
        getRowKey={(project) => project.id}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        isLoading={isLoading}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys)}
        actions={rowActions}
        emptyContent="پروژه‌ای مطابق جست‌وجوی شما پیدا نشد."
      />
    </main>
  );
}
