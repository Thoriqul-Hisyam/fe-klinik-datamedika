"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Stethoscope,
  Activity,
  HeartPulse,
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
import { Card, CardContent } from "@/components/ui/card";

// Mock data for medical actions
const medicalActions = [
  {
    id: "TRT001",
    kode: "UMM-001",
    nama: "Konsultasi Umum",
    kategori: "Konsultasi",
    harga: 50000,
    durasi: "15 min",
    status: "aktif",
  },
  {
    id: "TRT002",
    kode: "GGI-001",
    nama: "Pembersihan Karang Gigi",
    kategori: "Gigi",
    harga: 250000,
    durasi: "30 min",
    status: "aktif",
  },
  {
    id: "TRT003",
    kode: "LAB-001",
    nama: "Cek Darah Lengkap",
    kategori: "Laboratorium",
    harga: 150000,
    durasi: "10 min",
    status: "aktif",
  },
  {
    id: "TRT004",
    kode: "UMM-002",
    nama: "Nebulizer",
    kategori: "Tindakan",
    harga: 75000,
    durasi: "20 min",
    status: "aktif",
  },
  {
    id: "TRT005",
    kode: "GGI-002",
    nama: "Pencabutan Gigi Susu",
    kategori: "Gigi",
    harga: 150000,
    durasi: "20 min",
    status: "non-aktif",
  },
  {
    id: "TRT006",
    kode: "ANK-001",
    nama: "Imunisasi Dasar",
    kategori: "Anak",
    harga: 100000,
    durasi: "15 min",
    status: "aktif",
  },
  {
    id: "TRT007",
    kode: "BED-001",
    nama: "Hecting (Jahit Luka)",
    kategori: "Bedah Ringan",
    harga: 200000,
    durasi: "45 min",
    status: "aktif",
  },
  {
    id: "TRT008",
    kode: "RAD-001",
    nama: "Rontgen Dada",
    kategori: "Radiologi",
    harga: 300000,
    durasi: "15 min",
    status: "aktif",
  },
];

const categoryOptions = [
  "Semua Kategori",
  "Konsultasi",
  "Tindakan",
  "Gigi",
  "Anak",
  "Laboratorium",
  "Bedah Ringan",
  "Radiologi",
];

export default function MedicalActionPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua Kategori");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = medicalActions.filter((action) => {
    const matchesSearch =
      action.nama.toLowerCase().includes(search.toLowerCase()) ||
      action.kode.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "Semua Kategori" || action.kategori === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Tindakan Medis</h1>
          <p className="text-sm text-muted-foreground">
            Kelola daftar tindakan dan prosedur medis klinik
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Tindakan
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Tindakan</p>
              <h3 className="text-2xl font-bold">{medicalActions.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Tindakan Aktif</p>
              <h3 className="text-2xl font-bold">
                {medicalActions.filter((a) => a.status === "aktif").length}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Kategori</p>
              <h3 className="text-2xl font-bold">{categoryOptions.length - 1}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau kode tindakan..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-[180px] justify-between">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                {filterCategory}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            {categoryOptions.map((cat) => (
              <DropdownMenuItem key={cat} onClick={() => setFilterCategory(cat)}>
                {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px]">Kode</TableHead>
                <TableHead>Nama Tindakan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Durasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((action) => (
                <TableRow key={action.id}>
                  <TableCell className="font-mono text-xs">{action.kode}</TableCell>
                  <TableCell className="font-medium">{action.nama}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {action.kategori}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(action.harga)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {action.durasi}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={action.status === "aktif" ? "success" : "secondary"}
                    >
                      {action.status === "aktif" ? "Aktif" : "Non-aktif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    Tidak ada data tindakan medis.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <p className="text-sm text-muted-foreground">
                Menampilkan {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, filteredData.length)} dari{" "}
                {filteredData.length} data
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{currentPage}</span>
                  <span className="text-sm text-muted-foreground">/</span>
                  <span className="text-sm text-muted-foreground">{totalPages}</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
