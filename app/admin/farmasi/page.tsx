"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  Printer,
  AlertTriangle,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Pill,
  User,
  Calendar,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

// Types
type PrescriptionStatus = "pending" | "processing" | "completed" | "cancelled";

interface PrescriptionItem {
  nama: string;
  dosis: string;
  jumlah: number;
  stok: number;
  satuan: string;
}

interface Prescription {
  id: string;
  noResep: string;
  noRM: string;
  pasien: string;
  dokter: string;
  poli: string;
  waktu: string;
  status: PrescriptionStatus;
  items: PrescriptionItem[];
}

// Mock prescriptions data
const mockPrescriptions: Prescription[] = [
  {
    id: "RX001",
    noResep: "RX-2026-0120-001",
    noRM: "RM-2024-001",
    pasien: "Ahmad Rizki",
    dokter: "dr. Sarah",
    poli: "Poli Umum",
    waktu: "08:45",
    status: "pending",
    items: [
      { nama: "Paracetamol 500mg", dosis: "3x1", jumlah: 15, stok: 120, satuan: "tablet" },
      { nama: "Ambroxol 30mg", dosis: "3x1", jumlah: 15, stok: 45, satuan: "tablet" },
      { nama: "Vitamin C 500mg", dosis: "1x1", jumlah: 10, stok: 8, satuan: "tablet" },
    ],
  },
  {
    id: "RX002",
    noResep: "RX-2026-0120-002",
    noRM: "RM-2024-015",
    pasien: "Siti Nurhaliza",
    dokter: "drg. Budi",
    poli: "Poli Gigi",
    waktu: "09:15",
    status: "processing",
    items: [
      { nama: "Amoxicillin 500mg", dosis: "3x1", jumlah: 21, stok: 200, satuan: "kapsul" },
      { nama: "Asam Mefenamat 500mg", dosis: "3x1", jumlah: 15, stok: 150, satuan: "tablet" },
    ],
  },
  {
    id: "RX003",
    noResep: "RX-2026-0120-003",
    noRM: "RM-2024-023",
    pasien: "Dewi Lestari",
    dokter: "dr. Rina, Sp.A",
    poli: "Poli Anak",
    waktu: "09:30",
    status: "pending",
    items: [
      { nama: "Paracetamol Sirup 120ml", dosis: "3x1 cth", jumlah: 1, stok: 25, satuan: "botol" },
      { nama: "Ambroxol Sirup 60ml", dosis: "3x1/2 cth", jumlah: 1, stok: 0, satuan: "botol" },
    ],
  },
  {
    id: "RX004",
    noResep: "RX-2026-0120-004",
    noRM: "RM-2024-045",
    pasien: "Eko Prasetyo",
    dokter: "dr. Hendra, Sp.PD",
    poli: "Poli Dalam",
    waktu: "10:00",
    status: "completed",
    items: [
      { nama: "Metformin 500mg", dosis: "2x1", jumlah: 30, stok: 500, satuan: "tablet" },
      { nama: "Amlodipine 5mg", dosis: "1x1", jumlah: 30, stok: 300, satuan: "tablet" },
    ],
  },
  {
    id: "RX005",
    noResep: "RX-2026-0120-005",
    noRM: "RM-2024-067",
    pasien: "Fitri Handayani",
    dokter: "dr. Maya, Sp.OG",
    poli: "Poli Kandungan",
    waktu: "10:30",
    status: "pending",
    items: [
      { nama: "Asam Folat 400mcg", dosis: "1x1", jumlah: 30, stok: 200, satuan: "tablet" },
      { nama: "Kalsium Laktat 500mg", dosis: "1x1", jumlah: 30, stok: 180, satuan: "tablet" },
      { nama: "Vitamin B Complex", dosis: "1x1", jumlah: 30, stok: 5, satuan: "tablet" },
    ],
  },
  {
    id: "RX006",
    noResep: "RX-2026-0120-006",
    noRM: "RM-2024-089",
    pasien: "Gunawan Wibowo",
    dokter: "dr. Ahmad",
    poli: "Poli Umum",
    waktu: "11:00",
    status: "cancelled",
    items: [
      { nama: "Omeprazole 20mg", dosis: "1x1", jumlah: 14, stok: 100, satuan: "kapsul" },
    ],
  },
];

const statusConfig: Record<
  PrescriptionStatus,
  { label: string; variant: "default" | "secondary" | "success" | "destructive"; icon: typeof Clock }
> = {
  pending: { label: "Menunggu", variant: "secondary", icon: Clock },
  processing: { label: "Diproses", variant: "default", icon: Package },
  completed: { label: "Selesai", variant: "success", icon: CheckCircle },
  cancelled: { label: "Batal", variant: "destructive", icon: XCircle },
};

export default function FarmasiPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [rowSelection, setRowSelection] = useState({});

  const { data: prescriptionsData = [], isLoading } = useQuery({
    queryKey: ["pharmacy-prescriptions", search, statusFilter],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return mockPrescriptions.filter((rx) => {
        const matchesSearch =
          rx.pasien.toLowerCase().includes(search.toLowerCase()) ||
          rx.noResep.toLowerCase().includes(search.toLowerCase()) ||
          rx.noRM.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || rx.status === statusFilter;
        return matchesSearch && matchesStatus;
      });
    },
  });

  const columns = useMemo<ColumnDef<Prescription>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="h-4 w-4 rounded border-gray-300"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="h-4 w-4 rounded border-gray-300"
          />
        ),
      },
      {
        accessorKey: "noResep",
        header: "No. Resep",
        cell: (info) => <span className="font-mono text-xs">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "pasien",
        header: "Pasien",
        cell: (info) => {
          const rx = info.row.original;
          return (
            <div>
              <p className="font-medium">{rx.pasien}</p>
              <p className="text-xs text-muted-foreground font-mono">{rx.noRM}</p>
            </div>
          );
        },
      },
      {
        header: "Poli / Dokter",
        cell: (info) => {
          const rx = info.row.original;
          return (
            <div className="text-muted-foreground">
              <p className="text-xs">{rx.poli}</p>
              <p className="text-xs">{rx.dokter}</p>
            </div>
          );
        },
      },
      {
        accessorKey: "waktu",
        header: "Waktu",
        cell: (info) => <span className="text-xs text-muted-foreground">{info.getValue() as string}</span>,
      },
      {
        header: "Item",
        cell: (info) => (
          <Badge variant="outline" className="text-[10px]">
            {info.row.original.items.length} item
          </Badge>
        ),
      },
      {
        header: "Stok",
        cell: (info) => {
          const items = info.row.original.items;
          const outOfStock = items.some((i) => i.stok === 0);
          const lowStock = items.some((i) => i.stok < i.jumlah);

          if (outOfStock) {
            return (
              <Badge variant="destructive" className="text-[10px] gap-1">
                <AlertTriangle className="h-3 w-3" />
                Habis
              </Badge>
            );
          }
          if (lowStock) {
            return (
              <Badge variant="secondary" className="text-[10px] gap-1 text-orange-600 bg-orange-50">
                <AlertTriangle className="h-3 w-3" />
                Terbatas
              </Badge>
            );
          }
          return (
            <Badge variant="secondary" className="text-[10px] text-green-600 bg-green-50">
              OK
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as PrescriptionStatus;
          const config = statusConfig[status];
          return (
            <Badge variant={config.variant} className="text-[10px] px-1.5 py-0 gap-1">
              <config.icon className="h-3 w-3" />
              {config.label}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        cell: (info) => (
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedPrescription(info.row.original)}>
                  <Eye className="h-3.5 w-3.5 mr-2" />
                  Lihat Detail
                </DropdownMenuItem>
                {info.row.original.status === "pending" && (
                  <DropdownMenuItem>
                    <Check className="h-3.5 w-3.5 mr-2" />
                    Proses Resep
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Printer className="h-3.5 w-3.5 mr-2" />
                  Cetak
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: prescriptionsData,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetAll: false,
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Farmasi</h1>
          <p className="text-sm text-muted-foreground">
            Kelola resep masuk dan penyerahan obat
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            {mockPrescriptions.filter((p) => p.status === "pending").length} Menunggu
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Package className="h-3 w-3" />
            {mockPrescriptions.filter((p) => p.status === "processing").length} Diproses
          </Badge>
        </div>
      </div>

      {/* Filters and Bulk Actions */}
      <Card>
        <CardContent className="py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari resep, pasien, RM..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 border rounded-lg p-0.5">
                {[
                  { value: "all", label: "Semua" },
                  { value: "pending", label: "Menunggu" },
                  { value: "processing", label: "Diproses" },
                  { value: "completed", label: "Selesai" },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                      statusFilter === filter.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedRows.length} dipilih
                </span>
                <Button size="sm" variant="outline" className="h-8">
                  <Printer className="h-3.5 w-3.5 mr-1" />
                  Cetak Massal
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-xs h-10">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Memuat data resep...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className={cn(
                        "text-sm cursor-pointer hover:bg-muted/50 transition-colors",
                        row.getIsSelected() && "bg-muted"
                      )}
                      onClick={() => setSelectedPrescription(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-2.5">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-64 text-center text-muted-foreground">
                      Tidak ada resep ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-xs text-muted-foreground">
              {table.getFilteredRowModel().rows.length} resep total
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="text-xs font-medium px-2">
                {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescription Detail Drawer */}
      <Drawer
        open={!!selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
        title="Detail Resep"
        description={selectedPrescription?.noResep}
      >
        {selectedPrescription && (
          <div className="p-4 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{selectedPrescription.pasien}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {selectedPrescription.noRM}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Pill className="h-3.5 w-3.5" />
                  {selectedPrescription.poli}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {selectedPrescription.dokter}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {selectedPrescription.waktu}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-y">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge
                variant={statusConfig[selectedPrescription.status].variant}
                className="gap-1"
              >
                {React.createElement(statusConfig[selectedPrescription.status].icon, {
                  className: "h-3 w-3",
                })}
                {statusConfig[selectedPrescription.status].label}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Daftar Obat</h3>
              <div className="space-y-3">
                {selectedPrescription.items.map((item, index) => {
                  const isLow = item.stok < item.jumlah && item.stok > 0;
                  const isOut = item.stok === 0;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "rounded-lg border p-3",
                        isOut && "border-destructive/50 bg-destructive/5",
                        isLow && "border-orange-200 bg-orange-50/50"
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm">{item.nama}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.dosis} • {item.jumlah} {item.satuan}
                          </p>
                        </div>
                        {isOut ? (
                          <Badge variant="destructive" className="text-[10px]">
                            Stok Habis
                          </Badge>
                        ) : (
                          <Badge variant="outline" className={cn("text-[10px]", isLow ? "text-orange-600" : "text-green-600")}>
                            Stok: {item.stok}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              {selectedPrescription.status === "pending" && (
                <Button className="w-full">
                  <Check className="h-4 w-4 mr-2" />
                  Proses Resep
                </Button>
              )}
              {selectedPrescription.status === "processing" && (
                <Button className="w-full">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Selesaikan & Serahkan
                </Button>
              )}
              <Button variant="outline" className="w-full">
                <Printer className="h-4 w-4 mr-2" />
                Cetak Etiket
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
