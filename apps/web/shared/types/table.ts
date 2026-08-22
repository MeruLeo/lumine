import { ReactNode } from "react";
import { SortDescriptor } from "@heroui/react";
import { PaginatedResponse } from "@/shared/types/paginated";

export type DataTableColumn<T> = {
  key: keyof T | string;
  label: string;

  sortable?: boolean;

  width?: number | string;

  render?: (row: T) => ReactNode;
};

export type DataTableAction<T> = {
  label: string;

  icon?: ReactNode;

  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";

  isHidden?: (row: T) => boolean;

  onClick: (row: T) => void;
};

export type DataTableProps<T extends { id: string | number }> = {
  data: PaginatedResponse<T>;

  columns: DataTableColumn<T>[];

  actions?: DataTableAction<T>[];

  page: number;

  pageSize: number;

  loading?: boolean;

  sortDescriptor?: SortDescriptor;

  onPageChange: (page: number) => void;

  onSortChange?: (descriptor: SortDescriptor) => void;
};
