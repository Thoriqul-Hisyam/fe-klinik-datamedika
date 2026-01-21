"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Building2,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
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
import { PoliFormModal, type PoliData } from "@/components/admin/poli/poli-form-modal";

// Mock data for Polyclinics
const initialPoliData: PoliData[] = [
  {
    id: "1",
    nama: "Poli Umum",
    kode: "PL001",
    tipe: "reguler",
    spesialisasi: ["Umum"],
  },
  {
    id: "2",
    nama: "Poli Gigi",
    kode: "PL002",
    tipe: "reguler",
    spesialisasi: ["Gigi & Mulut"],
  },
  {
    id: "3",
    nama: "Poli Anak",
    kode: "PL003",
    tipe: "reguler",
    spesialisasi: ["Anak (Pediatri)"],
  },
  {
    id: "4",
    nama: "Poli Kandungan",
    kode: "PL004",
    tipe: "reguler",
    spesialisasi: ["Kandungan (Obsgyn)"],
  },
  {
    id: "5",
    nama: "Ruang VIP",
    kode: "PL005",
    tipe: "vip",
    spesialisasi: ["Penyakit Dalam", "Jantung"],
  },
];

export default function PolyclinicPage() {
  const [data, setData] = useState<PoliData[]>(initialPoliData);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoli, setSelectedPoli] = useState<PoliData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter based on search
  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.kode.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = () => {
    setSelectedPoli(null);
    setIsModalOpen(true);
  };

  const handleEdit = (poli: PoliData) => {
    setSelectedPoli(poli);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data poli ini?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleFormSubmit = (formData: PoliData) => {
    if (selectedPoli) {
      // Edit
      setData((prev) =>
        prev.map((item) => (item.id === selectedPoli.id ? { ...formData, id: item.id } : item))
      );
    } else {
      // Add
      const newPoli = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setData((prev) => [newPoli, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Master Data Poli</h1>
          <p className="text-sm text-muted-foreground">
            Kelola data poliklinik dan spesialisasi klinik
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Poli Baru
        </Button>
      </div>

      {/* Stats Quick View (Optional but nice) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Poli</p>
              <h3 className="text-2xl font-bold">{data.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Table */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Daftar Poliklinik</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau kode poli..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            {search && (
              <Button variant="ghost" size="sm" onClick={() => setSearch("")} className="h-9">
                <X className="h-4 w-4 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto max-h-[calc(100vh-320px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                  <TableHead className="w-[100px]">Kode</TableHead>
                  <TableHead>Nama Poliklinik</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead className="hidden md:table-cell">Spesialisasi</TableHead>
                  <TableHead className="text-right w-20">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      Tidak ada data poli ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item) => (
                    <TableRow key={item.id} className="group">
                      <TableCell className="font-mono text-xs font-bold">{item.kode}</TableCell>
                      <TableCell className="font-medium">{item.nama}</TableCell>
                      <TableCell>
                        <Badge variant={item.tipe === "vip" ? "warning" as any : "outline"} className="capitalize">
                          {item.tipe}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {item.spesialisasi.map((spec) => (
                            <Badge key={spec} variant="secondary" className="text-[10px] py-0 px-1.5 font-normal">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEdit(item)}>
                              <Edit className="h-3.5 w-3.5 mr-2" />
                              Edit Data
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDelete(item.id!)}
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-xs text-muted-foreground">
              Menampilkan {filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
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

      <PoliFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedPoli}
      />
    </div>
  );
}
