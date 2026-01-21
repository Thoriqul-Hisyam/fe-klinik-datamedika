"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Calendar,
  Building2,
  User,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Mock data for patient registrations in EMR context
const emrRegistrations = [
  {
    id: "REG001",
    noReg: "NoReg202601200830152024001",
    noRM: "RM-2024-001",
    nama: "Ahmad Rizki",
    tanggal: "2026-01-20",
    poli: "Poli Umum",
    dokter: "dr. Sarah",
    pembayaran: "BPJS",
    status: "antrian",
  },
  {
    id: "REG002",
    noReg: "NoReg202601200915222024015",
    noRM: "RM-2024-015",
    nama: "Siti Nurhaliza",
    tanggal: "2026-01-20",
    poli: "Poli Gigi",
    dokter: "drg. Budi",
    pembayaran: "Umum",
    status: "periksa",
  },
  {
    id: "REG003",
    noReg: "NoReg202601201010052024023",
    noRM: "RM-2024-023",
    nama: "Dewi Lestari",
    tanggal: "2026-01-20",
    poli: "Poli Anak",
    dokter: "dr. Rina, Sp.A",
    pembayaran: "BPJS",
    status: "antrian",
  },
  {
    id: "REG004",
    noReg: "NoReg202601201140302024045",
    noRM: "RM-2024-045",
    nama: "Eko Prasetyo",
    tanggal: "2026-01-20",
    poli: "Poli Umum",
    dokter: "dr. Ahmad",
    pembayaran: "Asuransi",
    status: "antrian",
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" }> = {
  antrian: { label: "Dalam Antrian", variant: "secondary" },
  periksa: { label: "Sedang Diperiksa", variant: "warning" },
  selesai: { label: "Selesai", variant: "success" },
};

export default function EMRListPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = emrRegistrations.filter((reg) =>
    reg.nama.toLowerCase().includes(search.toLowerCase()) ||
    reg.noRM.toLowerCase().includes(search.toLowerCase()) ||
    reg.noReg.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Rekam Medis Elektronik</h1>
          <p className="text-sm text-muted-foreground">
            Pilih pasien untuk membuka Rekam Medis
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, RM, atau No. Registrasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">No. Registrasi</TableHead>
                  <TableHead className="w-[120px]">No. RM</TableHead>
                  <TableHead>Nama Pasien</TableHead>
                  <TableHead>Poli / Dokter</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((reg) => {
                  const config = statusConfig[reg.status] || { label: reg.status, variant: "default" };
                  return (
                    <TableRow key={reg.id}>
                      <TableCell className="font-mono text-xs">{reg.noReg}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{reg.noRM}</TableCell>
                      <TableCell>
                        <div className="font-medium text-sm">{reg.nama}</div>
                        <div className="text-[10px] text-muted-foreground">{reg.pembayaran}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{reg.poli}</div>
                        <div className="text-[10px] text-muted-foreground">{reg.dokter}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={config.variant} className="text-[10px] px-1.5 py-0">
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" className="h-8" asChild>
                          <Link href={`/admin/emr/pasien/${reg.noReg}`}>
                            <FileText className="h-3.5 w-3.5 mr-1.5" />
                            Buka RME
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
