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
import { Stock } from "./data";

export function StokTable({ data }: { data: Stock[] }) {
  const isExpiredSoon = (date: string) => {
    const exp = new Date(date);
    const now = new Date();
    const diff = exp.getTime() - now.getTime();
    return diff < 1000 * 60 * 60 * 24 * 90; // 90 days
  };

  const columns = useMemo<ColumnDef<Stock>[]>(
    () => [
      {
        id: "index",
        header: "No",
        cell: (info) => info.row.index + 1,
      },
      {
        accessorKey: "kodeObat",
        header: "Kode",
        cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "namaObat",
        header: "Nama Obat",
      },
      {
        accessorKey: "batchNo",
        header: "Batch No",
      },
      {
        accessorKey: "expiredDate",
        header: "Expired",
      },
      {
        accessorKey: "stokGudang",
        header: "Stok Gudang",
        meta: {
          className: "text-right",
        },
        cell: (info) => <div className="text-right">{info.getValue() as number}</div>,
      },
      {
        accessorKey: "stokFarmasi",
        header: "Stok Farmasi",
        meta: {
          className: "text-right",
        },
        cell: (info) => <div className="text-right">{info.getValue() as number}</div>,
      },
      {
        accessorKey: "satuan",
        header: "Satuan",
      },
      {
        id: "status",
        header: "Status",
        cell: (info) => {
          const expiredDate = info.row.original.expiredDate;
          return isExpiredSoon(expiredDate) ? (
            <Badge variant="destructive">Exp. Soon</Badge>
          ) : (
            <Badge variant="default">Aman</Badge>
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
                Tidak ada data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
