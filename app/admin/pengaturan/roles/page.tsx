"use client";

import { useState } from "react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Check,
  X,
  Info,
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Mock data for roles
const roles = [
  {
    id: "ROL001",
    nama: "Super Admin",
    deskripsi: "Akses penuh ke semua fitur sistem",
    userCount: 2,
    isSystem: true,
  },
  {
    id: "ROL002",
    nama: "Dokter",
    deskripsi: "Akses ke EMR, jadwal praktek, dan resep",
    userCount: 12,
    isSystem: false,
  },
  {
    id: "ROL003",
    nama: "Farmasi",
    deskripsi: "Manajemen stok obat dan proses resep",
    userCount: 5,
    isSystem: false,
  },
  {
    id: "ROL004",
    nama: "Resepsionis",
    deskripsi: "Pendaftaran pasien and manajemen antrian",
    userCount: 8,
    isSystem: false,
  },
  {
    id: "ROL005",
    nama: "Kasir",
    deskripsi: "Manajemen pembayaran dan laporan keuangan",
    userCount: 3,
    isSystem: false,
  },
];

export default function RolesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Hak Akses (RBAC)</h1>
          <p className="text-sm text-muted-foreground">
            Atur peran dan izin akses setiap staff klinik
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Peran
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Role List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Nama Peran</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id} className="cursor-pointer hover:bg-muted/30">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm flex items-center">
                            {role.isSystem ? (
                              <ShieldCheck className="h-3.5 w-3.5 mr-2 text-primary" />
                            ) : (
                              <Shield className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            )}
                            {role.nama}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {role.deskripsi}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">
                          {role.userCount} User
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
                              Edit Peran
                            </DropdownMenuItem>
                            {!role.isSystem && (
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Hapus
                              </DropdownMenuItem>
                            )}
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

        {/* Permission Preview */}
        <div className="space-y-4">
          <Card className="border-primary/20 shadow-sm bg-primary/[0.02]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm">Preview Izin Akses</CardTitle>
                  <CardDescription className="text-xs">Role: Super Admin</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Modul Registrasi
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-background border">
                    <span>Lihat Pasien</span>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-background border">
                    <span>Daftar Pasien Baru</span>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Modul Medis
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-background border">
                    <span>Input Rekam Medis</span>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded bg-background border">
                    <span>Input Resep Obat</span>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Button className="w-full h-8 text-xs" variant="outline">
                  <Info className="h-3.5 w-3.5 mr-2" />
                  Detail Seluruh Izin
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
