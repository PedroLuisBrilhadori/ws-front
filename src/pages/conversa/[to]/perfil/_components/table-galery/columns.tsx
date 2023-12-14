"use client";

import { AscHeader, TextRow } from "@/components/table-rows/rows";
import { Media, User } from "@/models";
import { ColumnDef, Row } from "@tanstack/react-table";

export const AdminActions = ({ row }: { row: Row<Media> }) => {};

export const columns = (authorized: boolean): ColumnDef<Media>[] => {
  const adminColumns: ColumnDef<Media>[] = [];

  const columns: ColumnDef<Media>[] = [
    {
      accessorKey: "messageId",
      header: ({ column }) => <AscHeader column={column}> Image </AscHeader>,
      cell: ({ row }) => {
        const value = row.getValue("messageId") as string;

        return <TextRow>{value}</TextRow>;
      },
    },

    {
      accessorKey: "size",
      header: ({ column }) => <AscHeader column={column}> Tamanho </AscHeader>,
      cell: ({ row }) => {
        const size = row.getValue("size") as string;

        return <TextRow className="w-full">{size}</TextRow>;
      },
    },

    {
      accessorKey: "message",
      header: ({ column }) => (
        <AscHeader column={column}> Menssagem </AscHeader>
      ),
      cell: ({ row }) => {
        const message = row.getValue("message") as string;

        return <TextRow className="w-full">{message}</TextRow>;
      },
    },
  ];

  if (authorized) return columns.concat(adminColumns);

  return columns;
};
