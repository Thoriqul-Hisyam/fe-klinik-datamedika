"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  Pill,
  Printer,
  ChevronRight,
  User,
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

// Mock data for prescription queue
const prescriptions = [
  {
    id: "PRS001",
    noAntrian: "F-001",
    namaPasien: "Ahmad Rizki",
    poli: "Poli Umum",
    dokter: "dr. Sarah",
    waktu: "10:30",
    itemCount: 3,
    status: "menunggu",
  },
  {
    id: "PRS002",
    noAntrian: "F-002",
    namaPasien: "Siti Nurhaliza",
    poli: "Poli Gigi",
    dokter: "drg. Budi",
    waktu: "10:45",
    itemCount: 2,
    status: "diproses",
  },
  {
    id: "PRS003",
    noAntrian: "F-003",
    namaPasien: "Dewi Lestari",
    poli: "Poli Anak",
    dokter: "dr. Rina, Sp.A",
    waktu: "11:05",
    itemCount: 4,
    status: "selesai",
  },
  {
    id: "PRS004",
    noAntrian: "F-004",
    namaPasien: "Eko Prasetyo",
    poli: "Poli Umum",
    dokter: "dr. Ahmad",
    waktu: "11:20",
    itemCount: 1,
    status: "menunggu",
  },
];

export default function PharmacyPrescriptionPage() {
  const [search, setSearch] = useState("");

  const filteredData = prescriptions.filter(
    (p) =>
      p.namaPasien.toLowerCase().includes(search.toLowerCase()) ||
      p.noAntrian.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">E-Resep (Antrian Farmasi)</h1>
          <p className="text-sm text-muted-foreground">
            Kelola dan proses persiapan obat untuk pasien
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Cetak Label Hari Ini
          </Button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Menunggu</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
            <Clock className="h-8 w-8 text-blue-500/20" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Diproses</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-500/20" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Selesai</p>
              <h3 className="text-2xl font-bold">48</h3>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-500/20" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari No. Antrian atau Nama..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter Status
        </Button>
      </div>

      {/* Prescription List */}
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-base font-medium">Antrian Hari Ini</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[100px]">No. Antrian</TableHead>
                <TableHead>Pasien & Poli</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Jml Obat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Badge variant="secondary" className="text-sm font-bold w-12 justify-center">
                      {p.noAntrian}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{p.namaPasien}</p>
                      <p className="text-xs text-muted-foreground">{p.poli} - {p.dokter}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {p.waktu}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Pill className="h-3.5 w-3.5 mr-2 text-primary" />
                      {p.itemCount} Item
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        p.status === "selesai" ? "success" : 
                        p.status === "diproses" ? "warning" : "default"
                      }
                      className="capitalize text-[10px]"
                    >
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 px-2 group">
                      <span className="mr-2 text-xs group-hover:text-primary">Proses Obat</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
