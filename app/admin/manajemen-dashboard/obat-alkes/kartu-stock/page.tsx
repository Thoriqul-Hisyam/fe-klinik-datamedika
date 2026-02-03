"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { ClipboardList, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const stockHistory = [
  { item: "Paracetamol", type: "Masuk", qty: 100, date: "28 Jan 2026", balance: 600 },
  { item: "Amoxicillin", type: "Keluar", qty: 20, date: "28 Jan 2026", balance: 180 },
  { item: "Vitamin C", type: "Keluar", qty: 10, date: "27 Jan 2026", balance: 290 },
  { item: "Paracetamol", type: "Keluar", qty: 50, date: "27 Jan 2026", balance: 500 },
  { item: "Ibuprofen", type: "Masuk", qty: 200, date: "26 Jan 2026", balance: 450 },
];

const stockTrend = [
   { date: "24 Jan", stock: 1200 },
   { date: "25 Jan", stock: 1150 },
   { date: "26 Jan", stock: 1300 },
   { date: "27 Jan", stock: 1250 },
   { date: "28 Jan", stock: 1280 },
];

export default function KartuStockPage() {
  const handleFilter = (from: Date | undefined, to: Date | undefined) => {
    console.log("Filtering Kartu Stock data from:", from, "to:", to);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Kartu Stock</h1>
          <p className="text-muted-foreground">
            Monitoring pergerakan stok harian (In/Out)
          </p>
        </div>
        <DashboardFilter onFilter={handleFilter} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
         <Card>
            <CardHeader>
                <CardTitle>Tren Stok Global</CardTitle>
                <CardDescription>Grafik pergerakan total stok item utama minggu ini</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stockTrend}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="stock" stroke="#8884d8" strokeWidth={2} name="Total Stok" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
         </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi Stok Terakhir</CardTitle>
          <CardDescription>Log mutasi barang masuk dan keluar</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Nama Item</TableHead>
                <TableHead>Tipe Mutasi</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead className="text-right">Sisa Stok</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockHistory.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell className="font-medium">{row.item}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1 ${row.type === 'Masuk' ? 'text-green-600' : 'text-red-600'}`}>
                        {row.type === 'Masuk' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {row.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{row.qty}</TableCell>
                  <TableCell className="text-right font-bold">{row.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
