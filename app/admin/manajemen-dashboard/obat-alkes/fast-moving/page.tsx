"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { TrendingUp, Package } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const fastMovingItems = [
  { id: 1, name: "Paracetamol 500mg", category: "Obat Bebas", sold: 1250, stock: 500 },
  { id: 2, name: "Amoxicillin 500mg", category: "Antibiotik", sold: 850, stock: 200 },
  { id: 3, name: "Vitamin C 50mg", category: "Suplemen", sold: 720, stock: 300 },
  { id: 4, name: "Omeprazole 20mg", category: "Obat Lambung", sold: 650, stock: 150 },
  { id: 5, name: "Ibuprofen 400mg", category: "Analgesik", sold: 580, stock: 250 },
];

export default function FastMovingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Obat Fast Moving</h1>
          <p className="text-muted-foreground">
            Daftar obat dan alkes dengan perputaran stok tercepat (High Demand)
          </p>
        </div>
        <DashboardFilter />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Item</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Paracetamol</div>
            <p className="text-xs text-muted-foreground">1,250 terjual bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Terjual</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,450</div>
            <p className="text-xs text-muted-foreground">Unit obat keluar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Grafik Penjualan Terbanyak</CardTitle>
                <CardDescription>Top 5 obat paling laris</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={fastMovingItems} layout="vertical" margin={{ left: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={120} style={{ fontSize: '12px' }} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="sold" name="Terjual" fill="#22c55e" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tabel Detail Fast Moving</CardTitle>
            <CardDescription>Rincian stok dan penjualan</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Obat</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Terjual</TableHead>
                  <TableHead className="text-right">Sisa Stok</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fastMovingItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.sold}</TableCell>
                    <TableCell className="text-right">{item.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
