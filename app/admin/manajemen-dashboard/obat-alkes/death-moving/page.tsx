"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { Skull, Archive, Trash2 } from "lucide-react";

const deathMovingItems = [
  { id: 1, name: "Obat Generik Z", category: "Tablet", expiry: "Expired Jan 2025", stock: 100 },
  { id: 2, name: "Alkes Y", category: "Disposable", expiry: "No Trans > 1 Tahun", stock: 20 },
  { id: 3, name: "Reagen Lama", category: "Lab", expiry: "Expired Dec 2024", stock: 5 },
];

export default function DeathMovingPage() {
  const handleFilter = (from: Date | undefined, to: Date | undefined) => {
    console.log("Filtering Death Moving data from:", from, "to:", to);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Obat Death Moving</h1>
          <p className="text-muted-foreground">
            Daftar stok mati (tidak ada pergerakan &gt; 6 bulan atau expired)
          </p>
        </div>
        <DashboardFilter onFilter={handleFilter} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Death Stock</CardTitle>
            <Skull className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Item tidak bergerak</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Barang Expired</CardTitle>
            <Trash2 className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Harus dimusnahkan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Stok Mati</CardTitle>
          <CardDescription>Rincian item yang tidak memiliki pergerakan signifikan</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Item</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status / Expired</TableHead>
                <TableHead className="text-right">Sisa Stok</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deathMovingItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-red-500">{item.expiry}</TableCell>
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
