"use client";

import type { ReactNode } from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import type { SortDescriptor } from "@heroui/react";

import { EmptyState, Pagination, Spinner, Table } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

type DynamicDataTableProps<TData> = {
  ariaLabel: string;
  data: TData[];
  columns: ColumnDef<TData, any>[];
  getRowId?: (row: TData, index: number) => string;
  pageSize?: number;
  minWidth?: number;
  isLoading?: boolean;
  emptyText?: string;
  footerSummaryLabel?: (start: number, end: number, total: number) => ReactNode;
};

function toSortDescriptor(sorting: SortingState): SortDescriptor | undefined {
  const first = sorting[0];

  if (!first) return undefined;

  return {
    column: first.id,
    direction: first.desc ? "descending" : "ascending",
  };
}

function toSortingState(descriptor: SortDescriptor): SortingState {
  return [
    {
      id: String(descriptor.column),
      desc: descriptor.direction === "descending",
    },
  ];
}

export function DynamicDataTable<TData>({
  ariaLabel,
  data,
  columns,
  getRowId,
  pageSize = 8,
  minWidth = 760,
  isLoading = false,
  emptyText = "داده‌ای برای نمایش وجود ندارد",
  footerSummaryLabel,
}: DynamicDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: { sorting },
    initialState: { pagination: { pageSize } },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const sortDescriptor = useMemo(() => toSortDescriptor(sorting), [sorting]);
  const { pageIndex } = table.getState().pagination;
  const total = data.length;
  const pageCount = table.getPageCount();
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const start = total === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <Table className="min-h-[260px]">
      <Table.ScrollContainer className="overflow-x-auto">
        <Table.Content
          aria-label={ariaLabel}
          className="h-full"
          style={{ minWidth }}
          sortDescriptor={sortDescriptor}
          onSortChange={(descriptor) => setSorting(toSortingState(descriptor))}
        >
          <Table.Header className="sticky top-0 z-10 bg-surface-secondary">
            {table.getHeaderGroups()[0]?.headers.map((header) => (
              <Table.Column
                key={header.id}
                id={header.id}
                allowsSorting={header.column.getCanSort()}
                isRowHeader={header.id === "title" || header.id === "name"}
              >
                {({ sortDirection }) =>
                  header.column.getCanSort() ? (
                    <Table.SortableColumnHeader sortDirection={sortDirection}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Table.SortableColumnHeader>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )
                  )
                }
              </Table.Column>
            ))}
          </Table.Header>

          <Table.Body
            renderEmptyState={() => (
              <EmptyState className="flex min-h-[180px] w-full flex-col items-center justify-center gap-3 text-center">
                {isLoading ? (
                  <Spinner size="md" />
                ) : (
                  <>
                    <Icon
                      className="size-6 text-muted"
                      icon="gravity-ui:tray"
                    />
                    <span className="text-sm text-muted">{emptyText}</span>
                  </>
                )}
              </EmptyState>
            )}
          >
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id} id={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      {pageCount > 1 ? (
        <Table.Footer>
          <Pagination size="sm">
            <Pagination.Summary>
              {footerSummaryLabel?.(start, end, total) ??
                `${start} تا ${end} از ${total} مورد`}
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={!table.getCanPreviousPage()}
                  onPress={() => table.previousPage()}
                >
                  <Pagination.PreviousIcon />
                  قبلی
                </Pagination.Previous>
              </Pagination.Item>

              {pages.map((page) => (
                <Pagination.Item key={page}>
                  <Pagination.Link
                    isActive={page === pageIndex + 1}
                    onPress={() => table.setPageIndex(page - 1)}
                  >
                    {page}
                  </Pagination.Link>
                </Pagination.Item>
              ))}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={!table.getCanNextPage()}
                  onPress={() => table.nextPage()}
                >
                  بعدی
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      ) : null}
    </Table>
  );
}
