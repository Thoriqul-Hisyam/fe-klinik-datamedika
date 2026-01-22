"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  File,
  FileImage,
  FileText,
  FolderOpen,
  MoreVertical,
  Download,
  Eye,
  Plus,
  ArrowRight,
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

// Mock data for patient documents
const documents = [
  {
    id: "DOC001",
    nama: "Hasil Laboratorium Darah",
    pasien: "Ahmad Rizki",
    kategori: "Laboratorium",
    tanggal: "2026-01-20",
    tipe: "PDF",
    size: "1.2 MB",
  },
  {
    id: "DOC002",
    nama: "Rontgen Dada (Thorax)",
    pasien: "Siti Nurhaliza",
    kategori: "Radiologi",
    tanggal: "2026-01-21",
    tipe: "Image",
    size: "4.5 MB",
  },
  {
    id: "DOC003",
    nama: "Informed Consent Operasi",
    pasien: "Dewi Lestari",
    kategori: "Legal",
    tanggal: "2026-01-21",
    tipe: "PDF",
    size: "0.8 MB",
  },
  {
    id: "DOC004",
    nama: "Surat Keterangan Sakit",
    pasien: "Eko Prasetyo",
    kategori: "Administrasi",
    tanggal: "2026-01-22",
    tipe: "PDF",
    size: "0.4 MB",
  },
];

export default function PatientDocsPage() {
  const [search, setSearch] = useState("");

  const filteredData = documents.filter(
    (d) =>
      d.nama.toLowerCase().includes(search.toLowerCase()) ||
      d.pasien.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Arsip Dokumen EMR</h1>
          <p className="text-sm text-muted-foreground">
            Manajemen dokumen digital, hasil penunjang, dan legalitas pasien
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Unggah Dokumen
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Categories */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Kategori</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0">
              <div className="space-y-1">
                {[
                  { name: "Semua Dokumen", count: 124, active: true },
                  { name: "Laboratorium", count: 45, active: false },
                  { name: "Radiologi", count: 28, active: false },
                  { name: "Kesehatan Ibu & Anak", count: 15, active: false },
                  { name: "Legal & Persetujuan", count: 36, active: false },
                ].map((cat, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      cat.active
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-xs ${cat.active ? "opacity-90" : "text-muted-foreground"}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <h4 className="text-xs font-semibold text-primary uppercase mb-2">Penyimpanan Digital</h4>
              <div className="space-y-3">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[65%]" />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Terpakai <strong>65 GB</strong> dari <strong>100 GB</strong>
                </p>
                <Button variant="link" size="sm" className="h-auto p-0 text-xs flex items-center">
                  Kelola Kuota <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document List */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari dokumen atau nama pasien..."
                    className="pl-9 h-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  Urutkan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Nama Fail</TableHead>
                    <TableHead>Pasien</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Ukuran</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((d) => (
                    <TableRow key={d.id} className="group">
                      <TableCell>
                        <div className="flex items-center">
                          {d.tipe === "PDF" ? (
                            <FileText className="h-4 w-4 mr-2 text-red-500" />
                          ) : (
                            <FileImage className="h-4 w-4 mr-2 text-blue-500" />
                          )}
                          <span className="text-sm font-medium">{d.nama}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{d.pasien}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] font-normal">
                          {d.kategori}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(d.tanggal).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">
                        {d.size}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4 text-primary" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
