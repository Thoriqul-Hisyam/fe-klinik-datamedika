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
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Pembelian } from "./data";

export function PembelianTable({ data }: { data: Pembelian[] }) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val);
  };

  const statusVariant = (status: string) => {
    switch (status) {
      case "Diterima": return "default";
      case "Pending": return "destructive";
      case "Draft": return "secondary";
      default: return "outline";
    }
  };

  const columns = useMemo<ColumnDef<Pembelian>[]>(
    () => [
      {
        accessorKey: "noPO",
        header: "No PO",
        cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "tanggal",
        header: "Tanggal",
      },
      {
        accessorKey: "supplier",
        header: "Supplier",
      },
      {
        accessorKey: "total",
        header: "Total",
        meta: {
          className: "text-right",
        },
        cell: (info) => (
          <div className="text-right">{formatCurrency(info.getValue() as number)}</div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as string;
          return <Badge variant={statusVariant(status)}>{status}</Badge>;
        },
      },
      {
        id: "actions",
        header: "Aksi",
        meta: {
          className: "text-right",
        },
        cell: () => (
          <div className="text-right">
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        ),
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
