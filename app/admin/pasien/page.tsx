"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  X,
  UserPlus,
  Calendar,
  Building2,
  CreditCard,
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

// Mock data for patient registrations
const registrations = [
  {
    id: "REG001",
    noRM: "RM-2024-001",
    nik: "3201234567890001",
    nama: "Ahmad Rizki",
    tanggal: "2026-01-20",
    poli: "Poli Umum",
    dokter: "dr. Sarah",
    pembayaran: "BPJS",
    status: "terdaftar",
  },
  {
    id: "REG002",
    noRM: "RM-2024-015",
    nik: "3201234567890002",
    nama: "Siti Nurhaliza",
    tanggal: "2026-01-20",
    poli: "Poli Gigi",
    dokter: "drg. Budi",
    pembayaran: "Umum",
    status: "dalam-antrian",
  },
  {
    id: "REG003",
    noRM: "RM-2024-023",
    nik: "3201234567890003",
    nama: "Dewi Lestari",
    tanggal: "2026-01-20",
    poli: "Poli Anak",
    dokter: "dr. Rina, Sp.A",
    pembayaran: "BPJS",
    status: "selesai",
  },
  {
    id: "REG004",
    noRM: "RM-2024-045",
    nik: "3201234567890004",
    nama: "Eko Prasetyo",
    tanggal: "2026-01-20",
    poli: "Poli Umum",
    dokter: "dr. Ahmad",
    pembayaran: "Asuransi",
    status: "terdaftar",
  },
  {
    id: "REG005",
    noRM: "RM-2024-067",
    nik: "3201234567890005",
    nama: "Fitri Handayani",
    tanggal: "2026-01-20",
    poli: "Poli Kandungan",
    dokter: "dr. Maya, Sp.OG",
    pembayaran: "Umum",
    status: "batal",
  },
  {
    id: "REG006",
    noRM: "RM-2024-089",
    nik: "3201234567890006",
    nama: "Gunawan Wibowo",
    tanggal: "2026-01-19",
    poli: "Poli Dalam",
    dokter: "dr. Hendra, Sp.PD",
    pembayaran: "BPJS",
    status: "selesai",
  },
  {
    id: "REG007",
    noRM: "RM-2024-091",
    nik: "3201234567890007",
    nama: "Hana Pertiwi",
    tanggal: "2026-01-19",
    poli: "Poli Umum",
    dokter: "dr. Sarah",
    pembayaran: "Umum",
    status: "selesai",
  },
  {
    id: "REG008",
    noRM: "RM-2024-102",
    nik: "3201234567890008",
    nama: "Irwan Setiawan",
    tanggal: "2026-01-19",
    poli: "Poli Mata",
    dokter: "dr. Lisa, Sp.M",
    pembayaran: "BPJS",
    status: "selesai",
  },
  {
    id: "REG009",
    noRM: "RM-2024-115",
    nik: "3201234567890009",
    nama: "Julia Rahmawati",
    tanggal: "2026-01-18",
    poli: "Poli Gigi",
    dokter: "drg. Budi",
    pembayaran: "Asuransi",
    status: "selesai",
  },
  {
    id: "REG010",
    noRM: "RM-2024-128",
    nik: "3201234567890010",
    nama: "Kevin Pratama",
    tanggal: "2026-01-18",
    poli: "Poli Anak",
    dokter: "dr. Rina, Sp.A",
    pembayaran: "Umum",
    status: "selesai",
  },
];

const poliOptions = [
  "Semua Poli",
  "Poli Umum",
  "Poli Gigi",
  "Poli Anak",
  "Poli Kandungan",
  "Poli Dalam",
  "Poli Mata",
];

const pembayaranOptions = ["Semua", "BPJS", "Umum", "Asuransi"];

type RegistrationStatus = "terdaftar" | "dalam-antrian" | "selesai" | "batal";

const statusConfig: Record<
  RegistrationStatus,
  { label: string; variant: "default" | "secondary" | "success" | "destructive" }
> = {
  terdaftar: { label: "Terdaftar", variant: "default" },
  "dalam-antrian": { label: "Dalam Antrian", variant: "secondary" },
  selesai: { label: "Selesai", variant: "success" },
  batal: { label: "Batal", variant: "destructive" },
};

export default function PendaftaranPasienPage() {
  const [search, setSearch] = useState("");
  const [filterPoli, setFilterPoli] = useState("Semua Poli");
  const [filterPembayaran, setFilterPembayaran] = useState("Semua");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter registrations
  const filteredData = registrations.filter((reg) => {
    const matchesSearch =
      reg.nama.toLowerCase().includes(search.toLowerCase()) ||
      reg.noRM.toLowerCase().includes(search.toLowerCase()) ||
      reg.nik.includes(search);
    const matchesPoli =
      filterPoli === "Semua Poli" || reg.poli === filterPoli;
    const matchesPembayaran =
      filterPembayaran === "Semua" || reg.pembayaran === filterPembayaran;
    const matchesTanggal =
      !filterTanggal || reg.tanggal === filterTanggal;
    return matchesSearch && matchesPoli && matchesPembayaran && matchesTanggal;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSearch("");
    setFilterPoli("Semua Poli");
    setFilterPembayaran("Semua");
    setFilterTanggal("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search ||
    filterPoli !== "Semua Poli" ||
    filterPembayaran !== "Semua" ||
    filterTanggal;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Pendaftaran Pasien</h1>
          <p className="text-sm text-muted-foreground">
            Kelola pendaftaran pasien klinik
          </p>
        </div>
        <Button size="sm">
          <UserPlus className="h-4 w-4 mr-2" />
          Pendaftaran Baru
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari nama, RM, NIK..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 h-9"
              />
            </div>

            {/* Date Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="date"
                value={filterTanggal}
                onChange={(e) => {
                  setFilterTanggal(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 h-9 w-[160px]"
              />
            </div>

            {/* Poli Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Building2 className="h-4 w-4 mr-2" />
                  {filterPoli}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {poliOptions.map((poli) => (
                  <DropdownMenuItem
                    key={poli}
                    onClick={() => {
                      setFilterPoli(poli);
                      setCurrentPage(1);
                    }}
                  >
                    {poli}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Payment Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <CreditCard className="h-4 w-4 mr-2" />
                  {filterPembayaran}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {pembayaranOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => {
                      setFilterPembayaran(option);
                      setCurrentPage(1);
                    }}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9"
              >
                <X className="h-4 w-4 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto max-h-[calc(100vh-380px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs h-10">No. RM</TableHead>
                  <TableHead className="text-xs h-10">NIK</TableHead>
                  <TableHead className="text-xs h-10">Nama Pasien</TableHead>
                  <TableHead className="text-xs h-10">Tanggal</TableHead>
                  <TableHead className="text-xs h-10">Poli</TableHead>
                  <TableHead className="text-xs h-10 hidden lg:table-cell">
                    Dokter
                  </TableHead>
                  <TableHead className="text-xs h-10">Pembayaran</TableHead>
                  <TableHead className="text-xs h-10">Status</TableHead>
                  <TableHead className="text-xs h-10 w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-32 text-center">
                      <div className="text-muted-foreground">
                        <p className="font-medium">Tidak ada data</p>
                        <p className="text-sm">
                          Coba ubah filter atau kata kunci pencarian
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((reg) => {
                    const config = statusConfig[reg.status as RegistrationStatus];
                    return (
                      <TableRow key={reg.id} className="text-sm">
                        <TableCell className="py-2.5 font-mono text-xs">
                          {reg.noRM}
                        </TableCell>
                        <TableCell className="py-2.5 font-mono text-xs text-muted-foreground">
                          {reg.nik}
                        </TableCell>
                        <TableCell className="py-2.5 font-medium">
                          {reg.nama}
                        </TableCell>
                        <TableCell className="py-2.5 text-muted-foreground">
                          {new Date(reg.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="py-2.5">{reg.poli}</TableCell>
                        <TableCell className="py-2.5 text-muted-foreground hidden lg:table-cell">
                          {reg.dokter}
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0 font-normal"
                          >
                            {reg.pembayaran}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant={config.variant}
                            className="text-[10px] px-1.5 py-0"
                          >
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5">
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
                              <DropdownMenuLabel className="text-xs">
                                Aksi
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="h-3.5 w-3.5 mr-2" />
                                Lihat Detail
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-3.5 w-3.5 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <X className="h-3.5 w-3.5 mr-2" />
                                Batalkan
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-xs text-muted-foreground">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredData.length)} dari{" "}
              {filteredData.length} data
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
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
