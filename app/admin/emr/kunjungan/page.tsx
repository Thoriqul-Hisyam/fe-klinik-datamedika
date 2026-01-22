"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  FileText,
  Clock,
  ChevronRight,
  MoreVertical,
  Stethoscope,
  Activity,
  History,
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
import Link from "next/link";

// Mock data for visit history
const historyData = [
  {
    id: "VST001",
    tanggal: "2026-01-22",
    waktu: "09:30",
    namaPasien: "Ahmad Rizki",
    noRM: "RM-2024-001",
    poli: "Poli Umum",
    dokter: "dr. Sarah",
    tipe: "Kunjungan Baru",
    status: "proses",
  },
  {
    id: "VST002",
    tanggal: "2026-01-22",
    waktu: "10:15",
    namaPasien: "Siti Nurhaliza",
    noRM: "RM-2024-015",
    poli: "Poli Gigi",
    dokter: "drg. Budi",
    tipe: "Kontrol",
    status: "antri",
  },
  {
    id: "VST003",
    tanggal: "2026-01-21",
    waktu: "11:00",
    namaPasien: "Dewi Lestari",
    noRM: "RM-2024-023",
    poli: "Poli Anak",
    dokter: "dr. Rina, Sp.A",
    tipe: "Kunjungan Baru",
    status: "selesai",
  },
  {
    id: "VST004",
    tanggal: "2026-01-21",
    waktu: "14:20",
    namaPasien: "Eko Prasetyo",
    noRM: "RM-2024-045",
    poli: "Poli Umum",
    dokter: "dr. Ahmad",
    tipe: "Kontrol",
    status: "selesai",
  },
];

export default function VisitHistoryPage() {
  const [search, setSearch] = useState("");

  const filteredData = historyData.filter(
    (h) =>
      h.namaPasien.toLowerCase().includes(search.toLowerCase()) ||
      h.noRM.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Rekam Medis Kunjungan</h1>
          <p className="text-sm text-muted-foreground">
            Daftar kronologis kunjungan pasien and catatan medis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <History className="h-4 w-4 mr-2" />
            Tinjau Log Akses
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase">Total Visit</p>
            <h3 className="text-xl font-bold">148</h3>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase">Sedang Proses</p>
            <h3 className="text-xl font-bold">5</h3>
          </div>
        </Card>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari Nama Pasien atau No. RM..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Visit List Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Tanggal & Waktu</TableHead>
                <TableHead>No. RM</TableHead>
                <TableHead>Pasien</TableHead>
                <TableHead>Unit / Poliklinik</TableHead>
                <TableHead>Dokter Pemeriksa</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((h) => (
                <TableRow key={h.id}>
                  <TableCell>
                    <div className="text-sm font-medium">
                      {new Date(h.tanggal).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-[10px] text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {h.waktu}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-primary">
                    {h.noRM}
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {h.namaPasien}
                  </TableCell>
                  <TableCell className="text-sm">
                    {h.poli}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground font-medium">
                    {h.dokter}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-normal">
                      {h.tipe}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        h.status === "selesai" ? "success" : 
                        h.status === "proses" ? "warning" : "secondary"
                      }
                      className="capitalize text-[10px]"
                    >
                      {h.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild className="h-8 px-2 group">
                      <Link href={`/admin/emr/pasien/${h.id}`}>
                        <FileText className="h-4 w-4 text-primary" />
                        <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
