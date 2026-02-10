"use client";

import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, ChevronRight, Loader2 } from "lucide-react";

interface VisitHistory {
  tanggal: string;
  poli: string;
  dokter: string;
  diagnosa: string;
  status: string;
}

const mockHistory: VisitHistory[] = [
  { tanggal: "2025-12-01", poli: "Poli Umum", dokter: "dr. Andi", diagnosa: "Common Cold", status: "Selesai" },
  { tanggal: "2025-10-15", poli: "Poli Gigi", dokter: "drg. Budi", diagnosa: "Pulpitis", status: "Selesai" },
  { tanggal: "2025-08-20", poli: "IGD", dokter: "dr. Citra", diagnosa: "Gastritis Akut", status: "Selesai" },
];

export function RiwayatKunjunganForm() {
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["visit-history"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return mockHistory;
    },
  });

  const columns = useMemo<ColumnDef<VisitHistory>[]>(
    () => [
      {
        accessorKey: "tanggal",
        header: "Tanggal",
        cell: (info) => (
          <div className="flex items-center gap-2 font-bold text-xs">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            {info.getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "poli",
        header: "Unit / Layanan",
        cell: (info) => <span className="text-xs font-medium">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "dokter",
        header: "Dokter",
        cell: (info) => <span className="text-xs">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "diagnosa",
        header: "Diagnosa Utama",
        cell: (info) => <span className="text-xs italic text-muted-foreground">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200">
            {info.getValue() as string}
          </Badge>
        ),
      },
      {
        id: "actions",
        cell: () => (
          <Button variant="ghost" size="icon" className="h-8 w-8 group-hover:translate-x-1 transition-transform">
            <ChevronRight className="h-4 w-4 text-primary" />
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: history,
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetAll: false,
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-primary">Riwayat Kunjungan Pasien</h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Patient Encounter History</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-[10px] uppercase font-bold tracking-widest">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p className="text-xs text-muted-foreground">Memuat riwayat...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-primary/5 transition-colors cursor-pointer group">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground italic text-xs">
                  Belum ada riwayat kunjungan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-bold text-blue-900">Informasi Riwayat</p>
          <p className="text-[10px] text-blue-700 leading-relaxed">
            Klik pada baris kunjungan untuk melihat detil rekam medis pada tanggal tersebut secara lengkap (CPPT, Resep, Penunjang).
          </p>
        </div>
      </div>
    </div>
  );
}
