"use client";

import { useState } from "react";
import {
  Search,
  Download,
  Filter,
  Users,
  UserPlus,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Mock data for visit reports
const visitData = [
  {
    id: "VST001",
    tanggal: "2026-01-20",
    nama: "Ahmad Rizki",
    poli: "Poli Umum",
    dokter: "dr. Sarah",
    pembayaran: "BPJS",
    diagnosa: "Common Cold",
  },
  {
    id: "VST002",
    tanggal: "2026-01-20",
    nama: "Siti Nurhaliza",
    poli: "Poli Gigi",
    dokter: "drg. Budi",
    pembayaran: "Umum",
    diagnosa: "Pulpitis",
  },
  {
    id: "VST003",
    tanggal: "2026-01-21",
    nama: "Dewi Lestari",
    poli: "Poli Anak",
    dokter: "dr. Rina, Sp.A",
    pembayaran: "BPJS",
    diagnosa: "Imunisasi",
  },
  {
    id: "VST004",
    tanggal: "2026-01-21",
    nama: "Eko Prasetyo",
    poli: "Poli Umum",
    dokter: "dr. Ahmad",
    pembayaran: "Asuransi",
    diagnosa: "Hypertension",
  },
  {
    id: "VST005",
    tanggal: "2026-01-22",
    nama: "Fitri Handayani",
    poli: "Poli Kandungan",
    dokter: "dr. Maya, Sp.OG",
    pembayaran: "Umum",
    diagnosa: "Antenatal Care",
  },
];

export default function VisitReportPage() {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("2026-01-01");
  const [dateTo, setDateTo] = useState("2026-01-22");

  const filteredData = visitData.filter(
    (v) =>
      v.nama.toLowerCase().includes(search.toLowerCase()) ||
      v.poli.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Laporan Kunjungan</h1>
          <p className="text-sm text-muted-foreground">
            Analisis data kunjungan pasien dan statistik harian
          </p>
        </div>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export PDF/Excel
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Total Kunjungan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Pasien Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-blue-500 flex items-center mt-1">
              <UserPlus className="h-3 w-3 mr-1" />
              27% dari total kunjungan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Rata-rata Harian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              Senin - Jumat
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[240px]">
              <p className="text-xs font-medium mb-1.5 ml-1">Cari Pasien/Poli</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nama, poli, atau dokter..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="w-[180px]">
              <p className="text-xs font-medium mb-1.5 ml-1">Dari Tanggal</p>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="w-[180px]">
              <p className="text-xs font-medium mb-1.5 ml-1">Sampai Tanggal</p>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button variant="secondary">
                <Filter className="h-4 w-4 mr-2" />
                Terapkan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Data Detail Kunjungan</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Nama Pasien</TableHead>
                <TableHead>Poliklinik</TableHead>
                <TableHead>Dokter</TableHead>
                <TableHead>Pembayaran</TableHead>
                <TableHead>Diagnosa Utama</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="text-sm">
                    {new Date(v.tanggal).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="font-medium text-sm">{v.nama}</TableCell>
                  <TableCell className="text-sm">{v.poli}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{v.dokter}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {v.pembayaran}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm italic">{v.diagnosa}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileText className="h-4 w-4 text-primary" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <p className="text-xs text-muted-foreground">
              Menampilkan 1-{filteredData.length} dari {visitData.length} kunjungan
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
