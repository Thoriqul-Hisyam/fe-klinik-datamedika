"use client";

import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Distribusi } from "./data";

export function DistribusiTable({ data }: { data: Distribusi[] }) {
  const columns = useMemo<ColumnDef<Distribusi>[]>(
    () => [
      {
        accessorKey: "noDistribusi",
        header: "No Distribusi",
        cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "tanggal",
        header: "Tanggal",
      },
      {
        accessorKey: "dari",
        header: "Dari",
      },
      {
        accessorKey: "ke",
        header: "Ke",
      },
      {
        accessorKey: "item",
        header: "Item",
      },
      {
        accessorKey: "jumlah",
        header: "Jumlah",
        meta: {
          className: "text-right",
        },
        cell: (info) => <div className="text-right">{info.getValue() as number}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <Badge variant={status === "Selesai" ? "default" : "secondary"}>
              {status}
            </Badge>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetAll: false,
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={(header.column.columnDef.meta as any)?.className}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={(cell.column.columnDef.meta as any)?.className}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Tidak ada data distribusi.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
