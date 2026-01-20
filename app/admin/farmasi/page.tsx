"use client";

import React, { useState, useCallback } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

// Mock prescriptions data
const prescriptions = [
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

type PrescriptionStatus = "pending" | "processing" | "completed" | "cancelled";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPrescription, setSelectedPrescription] = useState<typeof prescriptions[0] | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const itemsPerPage = 10;

  // Filter prescriptions
  const filteredData = prescriptions.filter((rx) => {
    const matchesSearch =
      rx.pasien.toLowerCase().includes(search.toLowerCase()) ||
      rx.noResep.toLowerCase().includes(search.toLowerCase()) ||
      rx.noRM.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || rx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Check if prescription has low stock items
  const hasLowStock = (items: typeof prescriptions[0]["items"]) =>
    items.some((item) => item.stok < item.jumlah);

  const hasOutOfStock = (items: typeof prescriptions[0]["items"]) =>
    items.some((item) => item.stok === 0);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, rx: typeof prescriptions[0]) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setSelectedPrescription(rx);
      }
    },
    []
  );

  // Toggle row selection
  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // Toggle all rows
  const toggleAllRows = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((rx) => rx.id));
    }
  };

  // Bulk actions
  const pendingSelected = selectedRows.filter(
    (id) => prescriptions.find((p) => p.id === id)?.status === "pending"
  );

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
            {prescriptions.filter((p) => p.status === "pending").length} Menunggu
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Package className="h-3 w-3" />
            {prescriptions.filter((p) => p.status === "processing").length} Diproses
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
                  placeholder="Cari resep, pasien, RM... (Ctrl+K)"
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
                {pendingSelected.length > 0 && (
                  <Button size="sm" variant="outline" className="h-8">
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Proses ({pendingSelected.length})
                  </Button>
                )}
                <Button size="sm" variant="outline" className="h-8">
                  <Printer className="h-3.5 w-3.5 mr-1" />
                  Cetak
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
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-10 h-10">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === paginatedData.length &&
                        paginatedData.length > 0
                      }
                      onChange={toggleAllRows}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </TableHead>
                  <TableHead className="text-xs h-10">No. Resep</TableHead>
                  <TableHead className="text-xs h-10">Pasien</TableHead>
                  <TableHead className="text-xs h-10">Poli / Dokter</TableHead>
                  <TableHead className="text-xs h-10">Waktu</TableHead>
                  <TableHead className="text-xs h-10">Item</TableHead>
                  <TableHead className="text-xs h-10">Stok</TableHead>
                  <TableHead className="text-xs h-10">Status</TableHead>
                  <TableHead className="text-xs h-10 w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((rx) => {
                  const config = statusConfig[rx.status as PrescriptionStatus];
                  const isSelected = selectedRows.includes(rx.id);
                  const lowStock = hasLowStock(rx.items);
                  const outOfStock = hasOutOfStock(rx.items);

                  return (
                    <TableRow
                      key={rx.id}
                      tabIndex={0}
                      onKeyDown={(e) => handleKeyDown(e, rx)}
                      className={cn(
                        "text-sm cursor-pointer focus:bg-muted focus:outline-none",
                        isSelected && "bg-muted/50"
                      )}
                      onClick={() => setSelectedPrescription(rx)}
                    >
                      <TableCell
                        className="py-2.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRowSelection(rx.id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell className="py-2.5 font-mono text-xs">
                        {rx.noResep}
                      </TableCell>
                      <TableCell className="py-2.5">
                        <div>
                          <p className="font-medium">{rx.pasien}</p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {rx.noRM}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="py-2.5 text-muted-foreground">
                        <div>
                          <p className="text-xs">{rx.poli}</p>
                          <p className="text-xs">{rx.dokter}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-2.5 text-muted-foreground">
                        {rx.waktu}
                      </TableCell>
                      <TableCell className="py-2.5">
                        <Badge variant="outline" className="text-[10px]">
                          {rx.items.length} item
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2.5">
                        {outOfStock ? (
                          <Badge variant="destructive" className="text-[10px] gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Habis
                          </Badge>
                        ) : lowStock ? (
                          <Badge variant="secondary" className="text-[10px] gap-1 text-orange-600 bg-orange-50">
                            <AlertTriangle className="h-3 w-3" />
                            Terbatas
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] text-green-600 bg-green-50">
                            OK
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="py-2.5">
                        <Badge
                          variant={config.variant}
                          className="text-[10px] px-1.5 py-0 gap-1"
                        >
                          <config.icon className="h-3 w-3" />
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className="py-2.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setSelectedPrescription(rx)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            {rx.status === "pending" && (
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
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-xs text-muted-foreground">
              {filteredData.length} resep
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="text-xs font-medium px-2">
                {currentPage} / {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
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
            {/* Patient Info */}
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

            {/* Status */}
            <div className="flex items-center justify-between py-3 border-y">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge
                variant={statusConfig[selectedPrescription.status as PrescriptionStatus].variant}
                className="gap-1"
              >
                {React.createElement(
                  statusConfig[selectedPrescription.status as PrescriptionStatus].icon,
                  { className: "h-3 w-3" }
                )}
                {statusConfig[selectedPrescription.status as PrescriptionStatus].label}
              </Badge>
            </div>

            {/* Items */}
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
                        ) : isLow ? (
                          <Badge variant="outline" className="text-[10px] text-orange-600">
                            Stok: {item.stok}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] text-green-600">
                            Stok: {item.stok}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
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
