"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Phone,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoctorFormModal, type DoctorData } from "@/components/admin/dokter/doctor-form-modal";

// Mock data for Doctors
const initialDoctorData: DoctorData[] = [
  {
    id: "1",
    nama: "dr. Sarah Amalia",
    spesialis: "Umum",
    namaDisplay: "dr. Sarah Amalia",
    jabatanDisplay: "Dokter Umum",
    nip: "199001152024011001",
    telp: "081234567890",
    keyword: "umum, general",
    status: "aktif",
    operasi: false,
    onCall: true,
  },
  {
    id: "2",
    nama: "dr. Budi Santoso",
    spesialis: "Gigi & Mulut",
    namaDisplay: "dr. Budi Santoso",
    jabatanDisplay: "Dokter Gigi",
    nip: "198805202024041002",
    telp: "081234567891",
    keyword: "gigi, mulut, dental",
    status: "aktif",
    operasi: true,
    onCall: false,
  },
  {
    id: "3",
    nama: "dr. Rina Wijaya, Sp.A",
    spesialis: "Anak (Pediatri)",
    namaDisplay: "dr. Rina Wijaya",
    jabatanDisplay: "Spesialis Anak",
    nip: "199212102024081003",
    telp: "081234567892",
    keyword: "anak, pediatric",
    status: "aktif",
    operasi: false,
    onCall: true,
  },
  {
    id: "4",
    nama: "dr. Ahmad Subarjo, Sp.PD",
    spesialis: "Penyakit Dalam",
    namaDisplay: "dr. Ahmad S.",
    jabatanDisplay: "Spesialis Penyakit Dalam",
    nip: "198501012024101004",
    telp: "081234567893",
    keyword: "dalam, internal",
    status: "nonaktif",
    operasi: false,
    onCall: false,
  },
];

const specializations = [
  "Semua Spesialis",
  "Umum",
  "Gigi & Mulut",
  "Anak (Pediatri)",
  "Kandungan (Obsgyn)",
  "Penyakit Dalam",
  "Mata",
  "THT",
];

export default function DoctorsPage() {
  const [data, setData] = useState<DoctorData[]>(initialDoctorData);
  const [search, setSearch] = useState("");
  const [filterSpec, setFilterSpec] = useState("Semua Spesialis");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter based on search and specialty
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.telp.includes(search) ||
      item.nip.includes(search);
    const matchesSpec =
      filterSpec === "Semua Spesialis" || item.spesialis === filterSpec;
    return matchesSearch && matchesSpec;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = () => {
    setSelectedDoctor(null);
    setIsModalOpen(true);
  };

  const handleEdit = (doctor: DoctorData) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data dokter ini?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleFormSubmit = (formData: DoctorData) => {
    if (selectedDoctor) {
      // Edit
      setData((prev) =>
        prev.map((item) => (item.id === selectedDoctor.id ? { ...formData, id: item.id } : item))
      );
    } else {
      // Add
      const newDoctor = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setData((prev) => [newDoctor, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Master Data Dokter</h1>
          <p className="text-sm text-muted-foreground">
            Kelola data dokter, spesialisasi, dan status operasional
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah Dokter Baru
        </Button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Stethoscope className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Dokter</p>
              <h3 className="text-2xl font-bold">{data.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5 border-green-500/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <div className="h-5 w-5 rounded-full bg-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Aktif</p>
              <h3 className="text-2xl font-bold text-green-600">
                {data.filter(d => d.status === "aktif").length}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Table */}
      <Card>
        <CardHeader className="pb-3 space-y-4">
          <CardTitle className="text-sm font-medium">Daftar Tenaga Medis</CardTitle>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, telp, atau NIP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={filterSpec} onValueChange={setFilterSpec}>
                <SelectTrigger className="h-9 w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Spesialisasi" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(search || filterSpec !== "Semua Spesialis") && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSearch("");
                    setFilterSpec("Semua Spesialis");
                  }} 
                  className="h-9"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto max-h-[calc(100vh-380px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                  <TableHead>Nama Dokter</TableHead>
                  <TableHead>Spesialisasi</TableHead>
                  <TableHead>No. Telepon</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Operasional</TableHead>
                  <TableHead className="text-right w-20">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      Tidak ada data dokter ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item) => (
                    <TableRow key={item.id} className="group">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.nama}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{item.nip || "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">
                          {item.spesialis}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {item.telp}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.status === "aktif" ? "success" as any : "destructive"} 
                          className="capitalize text-[10px] py-0 px-1.5"
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {item.operasi && (
                            <Badge variant="outline" className="text-[10px] border-blue-200 bg-blue-50 text-blue-600 font-normal">
                              Operasi
                            </Badge>
                          )}
                          {item.onCall && (
                            <Badge variant="outline" className="text-[10px] border-amber-200 bg-amber-50 text-amber-600 font-normal">
                              On Call
                            </Badge>
                          )}
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

      <DoctorFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedDoctor}
      />
    </div>
  );
}
