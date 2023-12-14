"use client";

import { AscHeader, TextRow } from "@/components/table-rows/rows";
import { Media, User } from "@/models";
import { baseUrl } from "@/services";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DocumentColumn } from "./document-column";

export const AdminActions = ({ row }: { row: Row<Media> }) => {};

export const columns = (authorized: boolean): ColumnDef<Media>[] => {
  const adminColumns: ColumnDef<Media>[] = [];

  const columns: ColumnDef<Media>[] = [
    {
      accessorKey: "messageId",
      header: ({ column }) => <AscHeader column={column}> Image </AscHeader>,
      cell: ({ row }) => {
        const messageId = row.getValue("messageId") as string;

        const type = row.original.type;

        const path = `${baseUrl}/public/${messageId}?buffer=true`;

        if (type.includes("image"))
          return (
            <a target="_blank" href={path}>
              <img className="w-[100px] h-[100px] object-cover" src={path} />
            </a>
          );

        return <DocumentColumn messageId={messageId} />;
      },
    },

    {
      accessorKey: "size",
      header: ({ column }) => <AscHeader column={column}> Tamanho </AscHeader>,
      cell: ({ row }) => {
        const size = row.getValue("size") as string;

        return <TextRow className="w-full">{Number(size) / 1000} KB</TextRow>;
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
