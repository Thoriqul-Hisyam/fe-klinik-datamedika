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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Tag } from "lucide-react";
import { Obat } from "./data";

interface ObatTableProps {
  data: Obat[];
  onEdit: (obat: Obat) => void;
  onDelete: (obat: Obat) => void;
  onSetPrice: (obat: Obat) => void;
}

export function ObatTable({ data, onEdit, onDelete, onSetPrice }: ObatTableProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val);
  };

  const columns = useMemo<ColumnDef<Obat>[]>(
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
        accessorKey: "kfa",
        header: "KFA",
      },
      {
        accessorKey: "hargaBeli",
        header: "Harga Beli",
        cell: (info) => formatCurrency(info.getValue() as number),
      },
      {
        accessorKey: "tipeHarga",
        header: "Tipe Harga",
      },
      {
        header: "Harga Jual / Margin",
        cell: (info) => {
          const item = info.row.original;
          return item.tipeHarga === "Fix"
            ? formatCurrency(item.hargaJualFix || 0)
            : item.tipeHarga === "Persentase"
            ? `${item.marginPersentase}%`
            : "-";
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <Badge variant={status === "Show" ? "default" : "secondary"}>
              {status}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Aksi",
        meta: {
          className: "text-right",
        },
        cell: (info) => (
          <div className="text-right space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSetPrice(info.row.original)}
              title="Set Price"
            >
              <Tag className="h-4 w-4 text-green-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(info.row.original)}
              title="Edit"
            >
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(info.row.original)}
              title="Hapus"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete, onSetPrice]
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
                <TableHead
                  key={header.id}
                  className={(header.column.columnDef.meta as any)?.className}
                >
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
                  <TableCell
                    key={cell.id}
                    className={(cell.column.columnDef.meta as any)?.className}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Tidak ada data obat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
