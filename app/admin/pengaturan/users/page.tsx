"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  User,
  Mail,
  ShieldCheck,
  Phone,
  Filter,
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

// Mock data for users
const users = [
  {
    id: "USR001",
    nama: "Admin Utama",
    email: "admin@datamedika.com",
    role: "Super Admin",
    telepon: "081234567890",
    status: "aktif",
    lastLogin: "2 jam yang lalu",
  },
  {
    id: "USR002",
    nama: "dr. Sarah",
    email: "sarah@datamedika.com",
    role: "Dokter",
    telepon: "081234567891",
    status: "aktif",
    lastLogin: "1 hari yang lalu",
  },
  {
    id: "USR003",
    nama: "Budi Santoso",
    email: "budi@datamedika.com",
    role: "Farmasi",
    telepon: "081234567892",
    status: "aktif",
    lastLogin: "5 jam yang lalu",
  },
  {
    id: "USR004",
    nama: "Siti Aminah",
    email: "siti@datamedika.com",
    role: "Resepsionis",
    telepon: "081234567893",
    status: "non-aktif",
    lastLogin: "3 hari yang lalu",
  },
  {
    id: "USR005",
    nama: "Andi Wijaya",
    email: "andi@datamedika.com",
    role: "Admin",
    telepon: "081234567894",
    status: "aktif",
    lastLogin: "45 menit yang lalu",
  },
];

export default function UserManagementPage() {
  const [search, setSearch] = useState("");

  const filteredData = users.filter(
    (u) =>
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Manajemen User</h1>
          <p className="text-sm text-muted-foreground">
            Kelola akun staff dan hak akses aplikasi
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Tambah User
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari user..."
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

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Terakhir Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                        {u.nama.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{u.nama}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <ShieldCheck className="h-3.5 w-3.5 mr-2 text-primary" />
                      {u.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm flex items-center">
                      <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      {u.telepon}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {u.lastLogin}
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.status === "aktif" ? "success" : "secondary"}>
                      {u.status === "aktif" ? "Aktif" : "Non-aktif"}
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
                          Edit Profil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          Ganti Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus Akun
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
