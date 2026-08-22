"use client";

import React, { useMemo } from "react";
import {
  Table,
  Pagination,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Spinner,
} from "@heroui/react";
import {
  MoreVertical,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type { Key, Selection } from "@react-types/shared";

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type SortDirection = "asc" | "desc";

export type DataTableColumn<T> = {
  key: string;
  label: React.ReactNode;
  width?: number | string;
  allowsSorting?: boolean;
  className?: string;
  render?: (item: T) => React.ReactNode;
  align?: "start" | "center" | "end";
};

export type DataTableAction<T> = {
  key: string;
  label: string;
  onPress: (item: T) => void;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  startContent?: React.ReactNode;
  hidden?: (item: T) => boolean;
  disabled?: (item: T) => boolean;
};

export type DataTableProps<T> = {
  items: PaginatedResponse<T> | undefined;
  columns: DataTableColumn<T>[];
  getRowKey: (item: T) => React.Key;

  isLoading?: boolean;
  emptyContent?: React.ReactNode;

  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  sortKey?: string;
  sortDirection?: SortDirection;
  onSortChange?: (sortKey: string, direction: SortDirection) => void;

  actions?: DataTableAction<T>[];
  showRowActions?: boolean;

  selectionMode?: "none" | "single" | "multiple";
  selectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;

  ariaLabel: string;
  footer?: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

function getNextSortDirection(current?: SortDirection) {
  return current === "asc" ? "desc" : "asc";
}

export function DataTable<T>({
  items,
  columns,
  getRowKey,
  isLoading = false,
  emptyContent = "No data found.",
  page,
  totalPages,
  onPageChange,
  sortKey,
  sortDirection,
  onSortChange,
  actions = [],
  showRowActions = true,
  selectionMode = "none",
  selectedKeys,
  onSelectionChange,
  ariaLabel,
  footer,
  variant = "primary",
  className,
}: DataTableProps<T>) {
  const rows = items?.results ?? [];
  const count = items?.count ?? 0;

  const paginationSummary = useMemo(() => {
    if (!count) return "0 results";
    const pageSize = rows.length || 1;
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, count);
    return `${start} to ${end} of ${count} results`;
  }, [count, page, rows.length]);

  const visibleColumns =
    showRowActions && actions.length
      ? [...columns, { key: "__actions__", label: "", width: 56 }]
      : columns;

  return (
    <Table variant={variant} className={className}>
      <Table.ScrollContainer>
        <Table.Content
          aria-label={ariaLabel}
          selectionMode={selectionMode}
          selectedKeys={selectedKeys}
          onSelectionChange={onSelectionChange}
        >
          <Table.Header columns={visibleColumns}>
            {(column) => (
              <Table.Column
                key={column.key}
                allowsSorting={Boolean(column.allowsSorting)}
                className={column.className}
              >
                {column.key === "__actions__" ? null : (
                  <div
                    className={[
                      "flex items-center gap-2",
                      column.align === "center" ? "justify-center" : "",
                      column.align === "end" ? "justify-end" : "",
                    ].join(" ")}
                  >
                    <span>{column.label}</span>
                    {column.allowsSorting ? (
                      <Button
                        isIconOnly
                        size="sm"
                        aria-label={`Sort by ${String(column.label)}`}
                        onPress={() => {
                          if (!onSortChange) return;
                          const next =
                            sortKey === column.key
                              ? getNextSortDirection(sortDirection)
                              : "asc";
                          onSortChange(column.key, next);
                        }}
                      >
                        <ArrowUpDown size={14} />
                      </Button>
                    ) : null}
                  </div>
                )}
              </Table.Column>
            )}
          </Table.Header>

          <Table.Body
            items={rows}
            renderEmptyState={() => (
              <div className="py-10 text-center text-sm text-default-500">
                {emptyContent}
              </div>
            )}
          >
            {(item) => {
              const rowKey = getRowKey(item);

              return (
                <Table.Row id={String(rowKey)}>
                  {columns.map((column) => (
                    <Table.Cell key={column.key} className={column.className}>
                      {column.render
                        ? column.render(item)
                        : (item as any)[column.key]}
                    </Table.Cell>
                  ))}

                  {showRowActions && actions.length ? (
                    <Table.Cell className="w-14">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" aria-label="Row actions">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Row actions menu">
                          {actions.map((action) => {
                            if (action.hidden?.(item)) return null;

                            return (
                              <DropdownItem
                                key={action.key}
                                onPress={() => action.onPress(item)}
                                isDisabled={action.disabled?.(item)}
                              >
                                {action.label}
                              </DropdownItem>
                            );
                          })}
                        </DropdownMenu>
                      </Dropdown>
                    </Table.Cell>
                  ) : null}
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      <Table.Footer>
        <div className="flex w-full items-center justify-between gap-3">
          <div className="text-sm text-default-500">{paginationSummary}</div>

          <div className="flex items-center gap-2">
            {footer}

            <Button
              isIconOnly
              size="sm"
              isDisabled={page === 1}
              onPress={() => onPageChange(page - 1)}
            >
              <ChevronLeft size={16} />
            </Button>

            <Pagination
              page={page}
              total={totalPages}
              onChange={onPageChange}
              showControls={false}
              size="sm"
            />

            <Button
              isIconOnly
              variant="outline"
              size="sm"
              isDisabled={page === totalPages}
              onPress={() => onPageChange(page + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </Table.Footer>

      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Spinner />
        </div>
      ) : null}
    </Table>
  );
}
