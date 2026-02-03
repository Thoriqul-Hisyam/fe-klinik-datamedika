"use client";

import { useState } from "react";
import {
  Search,
  Download,
  Calendar,
  Eye,
  FileText,
  Printer,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for pharmacy history
const historyData = [
  {
    id: "HIS001",
    noResep: "RES/20260120/0045",
    tanggal: "2026-01-20",
    namaPasien: "Ahmad Rizki",
    dokter: "dr. Sarah",
    itemCount: 3,
    totalHarga: 125000,
    status: "diserahkan",
  },
  {
    id: "HIS002",
    noResep: "RES/20260120/0046",
    tanggal: "2026-01-20",
    namaPasien: "Siti Nurhaliza",
    dokter: "drg. Budi",
    itemCount: 2,
    totalHarga: 210000,
    status: "diserahkan",
  },
  {
    id: "HIS003",
    noResep: "RES/20260121/0012",
    tanggal: "2026-01-21",
    namaPasien: "Dewi Lestari",
    dokter: "dr. Rina, Sp.A",
    itemCount: 4,
    totalHarga: 85000,
    status: "batal",
  },
  {
    id: "HIS004",
    noResep: "RES/20260121/0013",
    tanggal: "2026-01-21",
    namaPasien: "Eko Prasetyo",
    dokter: "dr. Ahmad",
    itemCount: 1,
    totalHarga: 45000,
    status: "diserahkan",
  },
];

export default function PrescriptionHistoryPage() {
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split("T")[0]);

  const filteredData = historyData.filter(
    (h) =>
      (h.namaPasien.toLowerCase().includes(search.toLowerCase()) ||
      h.noResep.toLowerCase().includes(search.toLowerCase())) &&
      (!filterDate || h.tanggal === filterDate)
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Riwayat Resep</h1>
          <p className="text-sm text-muted-foreground">
            Cari dan tinjau riwayat resep yang telah diproses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Laporan Bulanan
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari No. Resep atau Nama Pasien..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[160px] justify-start text-left font-normal",
                      !filterDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {filterDate ? format(new Date(filterDate), "dd MMM yyyy") : <span>Pilih Tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={filterDate ? new Date(filterDate) : undefined}
                    onSelect={(date) => setFilterDate(date ? format(date, "yyyy-MM-dd") : "")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>No. Resep</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Pasien</TableHead>
                <TableHead>Dokter</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Total Harga</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((h) => (
                <TableRow key={h.id}>
                  <TableCell className="font-mono text-xs">{h.noResep}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(h.tanggal).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-sm">{h.namaPasien}</p>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {h.dokter}
                  </TableCell>
                  <TableCell className="text-sm">
                    {h.itemCount} Item
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(h.totalHarga)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={h.status === "diserahkan" ? "success" : "destructive"}
                      className="capitalize text-[10px]"
                    >
                      {h.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <p className="text-xs text-muted-foreground">
              Menampilkan {filteredData.length} data
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
