"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
  User,
  Clock,
  Building2,
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

// Mock data for doctor schedules
const doctorSchedules = [
  {
    id: "DS001",
    dokter: "dr. Sarah",
    spesialis: "Umum",
    poli: "Poli Umum",
    jadwal: [
      { hari: "Senin", jam: "08:00 - 14:00" },
      { hari: "Selasa", jam: "08:00 - 14:00" },
      { hari: "Rabu", jam: "08:00 - 14:00" },
    ],
    status: "aktif",
  },
  {
    id: "DS002",
    dokter: "dr. Ahmad",
    spesialis: "Umum",
    poli: "Poli Umum",
    jadwal: [
      { hari: "Kamis", jam: "14:00 - 21:00" },
      { hari: "Jumat", jam: "14:00 - 21:00" },
      { hari: "Sabtu", jam: "08:00 - 15:00" },
    ],
    status: "aktif",
  },
  {
    id: "DS003",
    dokter: "drg. Budi",
    spesialis: "Gigi",
    poli: "Poli Gigi",
    jadwal: [
      { hari: "Senin", jam: "09:00 - 17:00" },
      { hari: "Rabu", jam: "09:00 - 17:00" },
      { hari: "Jumat", jam: "09:00 - 17:00" },
    ],
    status: "aktif",
  },
  {
    id: "DS004",
    dokter: "dr. Rina, Sp.A",
    spesialis: "Anak",
    poli: "Poli Anak",
    jadwal: [
      { hari: "Selasa", jam: "10:00 - 14:00" },
      { hari: "Kamis", jam: "10:00 - 14:00" },
    ],
    status: "aktif",
  },
  {
    id: "DS005",
    dokter: "dr. Maya, Sp.OG",
    spesialis: "Kandungan",
    poli: "Poli Kandungan",
    jadwal: [
      { hari: "Senin", jam: "13:00 - 17:00" },
      { hari: "Rabu", jam: "13:00 - 17:00" },
    ],
    status: "cuti",
  },
];

export default function DoctorSchedulePage() {
  const [search, setSearch] = useState("");

  const filteredData = doctorSchedules.filter(
    (item) =>
      item.dokter.toLowerCase().includes(search.toLowerCase()) ||
      item.poli.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Jadwal Praktek Dokter</h1>
          <p className="text-sm text-muted-foreground">
            Kelola jadwal harian dan ketersediaan dokter klinik
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Jadwal
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama dokter atau poli..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid of Schedules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{item.dokter}</h3>
                      <p className="text-xs text-muted-foreground">{item.spesialis}</p>
                    </div>
                  </div>
                  <Badge variant={item.status === "aktif" ? "success" : "secondary"}>
                    {item.status === "aktif" ? "Aktif" : "Cuti"}
                  </Badge>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5 mr-2" />
                  {item.poli}
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-2" />
                    Jadwal Mingguan:
                  </p>
                  <div className="grid gap-1.5">
                    {item.jadwal.map((j, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs p-2 rounded-md bg-muted/50"
                      >
                        <span className="font-medium">{j.hari}</span>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {j.jam}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Salin Jadwal</DropdownMenuItem>
                      <DropdownMenuItem>Non-aktifkan</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Hapus Permanen
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredData.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            Tidak ada jadwal dokter yang ditemukan.
          </div>
        )}
      </div>
    </div>
  );
}
