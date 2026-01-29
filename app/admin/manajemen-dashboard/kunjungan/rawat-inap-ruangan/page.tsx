"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, Users, Home, AlertCircle } from "lucide-react";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const roomData = [
  { name: "Mawar", occupied: 15, capacity: 20 },
  { name: "Melati", occupied: 18, capacity: 20 },
  { name: "Anggrek", occupied: 10, capacity: 15 },
  { name: "Tulip", occupied: 8, capacity: 10 },
  { name: "Sakura", occupied: 28, capacity: 30 },
  { name: "Dahlia", occupied: 5, capacity: 5 },
];

const insuranceData = [
    { name: "BPJS", value: 60, color: "#22c55e" },
    { name: "Umum", value: 25, color: "#3b82f6" },
    { name: "Asuransi Lain", value: 15, color: "#f97316" },
];

export default function RawatInapRuanganPage() {
  const totalOccupied = roomData.reduce((acc, curr) => acc + curr.occupied, 0);
  const totalCapacity = roomData.reduce((acc, curr) => acc + curr.capacity, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Kunjungan Rawat Inap per Ruangan</h1>
          <p className="text-muted-foreground">
            Monitoring tingkat hunian bed per paviliun/ruangan
          </p>
        </div>
        <DashboardFilter />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pasien Dirawat</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOccupied}</div>
            <p className="text-xs text-muted-foreground">Pasien aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ketersediaan Bed</CardTitle>
            <Bed className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity - totalOccupied}</div>
            <p className="text-xs text-muted-foreground">Bed kosong tersedia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ruang Isolasi</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Pasien isolasi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata BOR</CardTitle>
            <Home className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((totalOccupied/totalCapacity)*100)}%</div>
            <p className="text-xs text-muted-foreground">Semua ruangan</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Okupansi per Paviliun</CardTitle>
            <CardDescription>Perbandingan keterisian bed antar ruangan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roomData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="occupied" name="Terisi" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="capacity" name="Kapasitas Total" stackId="b" fill="#e5e7eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Distribusi Penjamin</CardTitle>
                <CardDescription>Proporsi Penjamin RI</CardDescription>
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
                            <Legend verticalAlign="bottom" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
