"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { OnChangeFn, Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  placeholder?: string;
  setGlobalFilter: OnChangeFn<any>;
  globalFilter: string;
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
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  placeholder,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {filters &&
          filters.map((filter) => {
            const column = table.getColumn("situacaoDocumento");

            if (!column) return null;

            return (
              <DataTableFacetedFilter
                key={`table-filter-${filter.name}`}
                column={table.getColumn(filter.name)}
                title={filter.title}
                options={filter.options}
              />
            );
          })}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
