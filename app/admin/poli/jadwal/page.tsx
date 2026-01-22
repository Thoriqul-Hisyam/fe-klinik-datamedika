"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Building2,
  Users,
  Search,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Mock data for polyclinic schedules
const polySchedules = [
  {
    id: "SCH001",
    poli: "Poli Umum",
    hari: "Senin - Jumat",
    jam: "08:00 - 21:00",
    dokter: 4,
    kuota: 60,
    status: "buka",
  },
  {
    id: "SCH002",
    poli: "Poli Umum",
    hari: "Sabtu",
    jam: "08:00 - 15:00",
    dokter: 2,
    kuota: 30,
    status: "buka",
  },
  {
    id: "SCH003",
    poli: "Poli Gigi",
    hari: "Senin - Jumat",
    jam: "09:00 - 17:00",
    dokter: 2,
    kuota: 20,
    status: "buka",
  },
  {
    id: "SCH004",
    poli: "Poli Anak",
    hari: "Senin, Rabu, Jumat",
    jam: "10:00 - 14:00",
    dokter: 1,
    kuota: 25,
    status: "buka",
  },
  {
    id: "SCH005",
    poli: "Poli Kandungan",
    hari: "Selasa, Kamis",
    jam: "13:00 - 17:00",
    dokter: 1,
    kuota: 15,
    status: "buka",
  },
  {
    id: "SCH006",
    poli: "Poli Dalam",
    hari: "Senin - Kamis",
    jam: "08:00 - 12:00",
    dokter: 1,
    kuota: 20,
    status: "tutup",
  },
];

export default function PolySchedulePage() {
  const [search, setSearch] = useState("");

  const filteredData = polySchedules.filter((item) =>
    item.poli.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Jadwal Poli</h1>
          <p className="text-sm text-muted-foreground">
            Atur jam operasional dan kuota layanan poliklinik
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Jadwal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Poli</p>
              <h3 className="text-lg font-bold">8</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Schedule Aktif</p>
              <h3 className="text-lg font-bold">12</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Jam Layanan</p>
              <h3 className="text-lg font-bold">08:00 - 21:00</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Dokter</p>
              <h3 className="text-lg font-bold">24</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari poliklinik..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Poliklinik</TableHead>
                <TableHead>Hari Operasional</TableHead>
                <TableHead>Jam Layanan</TableHead>
                <TableHead>Dokter Jaga</TableHead>
                <TableHead>Kuota Pasien</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.poli}</TableCell>
                  <TableCell>{item.hari}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      {item.jam}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Users className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      {item.dokter} Dokter
                    </div>
                  </TableCell>
                  <TableCell>{item.kuota} Pasien</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "buka" ? "success" : "secondary"}>
                      {item.status === "buka" ? "Buka" : "Tutup"}
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
                          Edit Jadwal
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
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    Tidak ada jadwal yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
