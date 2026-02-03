"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Scissors, Search } from "lucide-react";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const operationData = [
  { date: "1 Jan", mayor: 2, minor: 5 },
  { date: "2 Jan", mayor: 3, minor: 4 },
  { date: "3 Jan", mayor: 1, minor: 6 },
  { date: "4 Jan", mayor: 4, minor: 3 },
  { date: "5 Jan", mayor: 2, minor: 5 },
  { date: "6 Jan", mayor: 3, minor: 4 },
  { date: "7 Jan", mayor: 2, minor: 2 },
];

const insuranceData = [
    { name: "BPJS", value: 70, color: "#22c55e" },
    { name: "Umum", value: 20, color: "#3b82f6" },
    { name: "Asuransi Lain", value: 10, color: "#f97316" },
];

export default function OKPage() {
  const handleFilter = (from: Date | undefined, to: Date | undefined) => {
    console.log("Filtering OK data from:", from, "to:", to);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Kamar Operasi (OK)</h1>
          <p className="text-muted-foreground">
            Statistik pelaksanaan operasi Mayor, Minor, dan Elektif
          </p>
        </div>
        <DashboardFilter onFilter={handleFilter} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operasi Hari Ini</CardTitle>
            <Scissors className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 Mayor, 5 Minor</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operasi Bulan Ini</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">Total tindakan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Durasi</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5 Jam</div>
            <p className="text-xs text-muted-foreground">Per operasi</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisasi Ruangan</CardTitle>
            <Search className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">Efisiensi penggunaan OK</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Tren Operasi Mingguan</CardTitle>
            <CardDescription>Jumlah operasi Mayor vs Minor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={operationData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mayor" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="minor" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Distribusi Penjamin</CardTitle>
                <CardDescription>Jenis Penjamin Pasien OK</CardDescription>
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
