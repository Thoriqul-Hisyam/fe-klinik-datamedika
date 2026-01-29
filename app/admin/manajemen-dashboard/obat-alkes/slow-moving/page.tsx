"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { TrendingDown, AlertCircle } from "lucide-react";

const slowMovingItems = [
  { id: 1, name: "Salep Kulit X", category: "Topikal", lastSold: "25 Jan 2026", stock: 150 },
  { id: 2, name: "Obat Batuk Syrup A", category: "Sirup", lastSold: "20 Jan 2026", stock: 80 },
  { id: 3, name: "Vitamin E 200IU", category: "Suplemen", lastSold: "15 Jan 2026", stock: 120 },
  { id: 4, name: "Kalsium 500mg", category: "Suplemen", lastSold: "10 Jan 2026", stock: 200 },
  { id: 5, name: "Injeksi B12", category: "Injeksi", lastSold: "05 Jan 2026", stock: 50 },
];

export default function SlowMovingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Obat Slow Moving</h1>
          <p className="text-muted-foreground">
            Daftar obat dan alkes dengan perputaran stok lambat
          </p>
        </div>
        <DashboardFilter />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Item Slow Moving</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Item perlu evaluasi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nilai Aset Tertahan</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12jt</div>
            <p className="text-xs text-muted-foreground">Estimasi nilai stok</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Obat Perputaran Lambat</CardTitle>
          <CardDescription>Item dengan transaksi penjualan rendah dalam 3 bulan terakhir</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Obat</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Terakhir Terjual</TableHead>
                <TableHead className="text-right">Sisa Stok</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slowMovingItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.lastSold}</TableCell>
                  <TableCell className="text-right">{item.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
