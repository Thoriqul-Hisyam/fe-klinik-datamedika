"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, Users, TrendingUp, BarChart3 } from "lucide-react";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const classData = [
  { name: "VVIP", active: 2, total: 5 },
  { name: "VIP", active: 8, total: 10 },
  { name: "Kelas 1", active: 15, total: 20 },
  { name: "Kelas 2", active: 25, total: 30 },
  { name: "Kelas 3", active: 45, total: 50 },
  { name: "ICU", active: 4, total: 5 },
  { name: "NICU", active: 3, total: 5 },
];

const insuranceData = [
    { name: "BPJS PBI", value: 45, color: "#22c55e" },
    { name: "BPJS Non-PBI", value: 30, color: "#16a34a" },
    { name: "Umum", value: 15, color: "#3b82f6" },
    { name: "Asuransi Lain", value: 10, color: "#f97316" },
];

export default function RawatInapKelasPage() {
  const totalActive = classData.reduce((acc, curr) => acc + curr.active, 0);
  const totalBeds = classData.reduce((acc, curr) => acc + curr.total, 0);
  const occupancyRate = Math.round((totalActive / totalBeds) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Kunjungan Rawat Inap per Kelas</h1>
          <p className="text-muted-foreground">
            Analisis d an statistik kunjungan rawat inap berdasarkan kelas perawatan
          </p>
        </div>
        <DashboardFilter />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pasien Rawat Inap</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActive}</div>
            <p className="text-xs text-muted-foreground">Pasien aktif saat ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kapasitas Bed</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBeds}</div>
            <p className="text-xs text-muted-foreground">Total tempat tidur</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bed Occupancy Rate (BOR)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">Tingkat hunian</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pasien Pulang Hari Ini</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Rencana pulang</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
            <CardHeader>
            <CardTitle>Okupansi per Kelas</CardTitle>
            <CardDescription>Perbandingan jumlah pasien vs kapasitas bed</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={classData}
                    margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" name="Terisi" stackId="a" fill="#22c55e" />
                    <Bar dataKey="total" name="Kapasitas Total" stackId="b" fill="#e5e7eb" />
                </BarChart>
                </ResponsiveContainer>
            </div>
            </CardContent>
        </Card>
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Distribusi Penjamin</CardTitle>
                <CardDescription>Pasien RI per Penjamin</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={insuranceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {insuranceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom"/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
