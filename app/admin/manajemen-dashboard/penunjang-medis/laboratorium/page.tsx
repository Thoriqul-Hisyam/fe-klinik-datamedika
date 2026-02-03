"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Microscope, FlaskConical, TrendingUp, Clock } from "lucide-react";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const labData = [
  { name: "Hematologi", count: 45 },
  { name: "Kimia Darah", count: 32 },
  { name: "Imunologi", count: 15 },
  { name: "Urinalisa", count: 28 },
  { name: "Parasitologi", count: 8 },
  { name: "Mikrobiologi", count: 12 },
];

export default function LaboratoriumDashboardPage() {
  const handleFilter = (from: Date | undefined, to: Date | undefined) => {
    console.log("Filtering Laboratorium data from:", from, "to:", to);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Penunjang Medis - Laboratorium</h1>
          <p className="text-muted-foreground">
            Analisis dan statistik layanan laboratorium
          </p>
        </div>
        <DashboardFilter onFilter={handleFilter} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pemeriksaan Hari Ini</CardTitle>
            <Microscope className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">140</div>
            <p className="text-xs text-muted-foreground">Sampel diproses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selesai Tepat Waktu</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Sesuai SLA</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pemeriksaan Bulan Ini</CardTitle>
            <FlaskConical className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,450</div>
            <p className="text-xs text-muted-foreground">Total pemeriksaan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nilai Transaksi</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 450jt</div>
            <p className="text-xs text-muted-foreground">Pendapatan bulan ini</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribusi Pemeriksaan</CardTitle>
          <CardDescription>Jumlah pemeriksaan berdasarkan kategori</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={labData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Legend />
                <Bar dataKey="count" name="Jumlah Sampel" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
