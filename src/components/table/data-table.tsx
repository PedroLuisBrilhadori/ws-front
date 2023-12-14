"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterName?: string;
  placeholder?: string;
  filters?: {
    name: string;
    title: string;
    options: {
      value: string;
      label: string;
      icon?: React.ComponentType<{ className?: string }>;
      hasStandardTrue?: boolean;
    }[];
  }[];
  onClickRow?: (row: any) => void;
  url?: string;
  paginator?: boolean;
  defaultSort?: SortingState;
  selectMultipleRows?: boolean | undefined;
  rowSelections?: TData[] | undefined;
  classNameTable?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterName,
  placeholder,
  filters,
  onClickRow,
  url,
  paginator,
  defaultSort = [],
  selectMultipleRows,
  rowSelections,
  classNameTable,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(
      columns.reduce(
        (state, column) => ({
          ...state,
          [column.id || ""]: false,
        }),
        {}
      )
    );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>(defaultSort);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    enableMultiRowSelection: selectMultipleRows,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const getParameterUrl = () => {
    return url?.split("/").find((item) => {
      if (item.startsWith(":")) return item;
    });
  };

  const getUrl = (row: TData) => {
    if (!url) return "#";

    if (getParameterUrl()) {
      const property = getParameterUrl()?.replace(":", "");

      if (property) {
        return url.replace(
          getParameterUrl() as string,
          // @ts-ignore
          row[property].replaceAll("/", "%2F")
        );
      }
    }

    return url;
  };

  return (
    <div className="space-y-4">
      {filterName && (
        <DataTableToolbar
          placeholder={placeholder}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          table={table}
          filters={filters}
        />
      )}
      <div className={`rounded-md border ${classNameTable}`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      onClickRow && onClickRow(row.original);
                    }}
                    className={
                      rowSelections?.includes(row.original)
                        ? "!bg-primary opacity-80 !text-white"
                        : ""
                    }
                  >
                    {url
                      ? row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            <a
                              className="contents"
                              href={encodeURI(getUrl(row.original))}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </a>
                          </TableCell>
                        ))
                      : row
                          .getVisibleCells()
                          .map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paginator && <DataTablePagination table={table} />}
    </div>
  );
}
