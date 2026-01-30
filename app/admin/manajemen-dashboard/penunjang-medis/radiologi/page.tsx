"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, FileImage, TrendingUp, Clock } from "lucide-react";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const radData = [
  { name: "X-Ray", value: 45, color: "#3b82f6" },
  { name: "USG", value: 30, color: "#22c55e" },
  { name: "CT-Scan", value: 15, color: "#ef4444" },
  { name: "MRI", value: 10, color: "#a855f7" },
];

export default function RadiologiDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Penunjang Medis - Radiologi</h1>
          <p className="text-muted-foreground">
            Analisis dan statistik layanan radiologi
          </p>
        </div>
        <DashboardFilter />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pemeriksaan Hari Ini</CardTitle>
            <FlaskConical className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">Pasien radiologi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Respon</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 min</div>
            <p className="text-xs text-muted-foreground">Reading time dokter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pemeriksaan Bulan Ini</CardTitle>
            <FileImage className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">650</div>
            <p className="text-xs text-muted-foreground">Total imaging</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pertumbuhan</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+8%</div>
            <p className="text-xs text-muted-foreground">vs bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribusi Modalitas</CardTitle>
          <CardDescription>Jenis pemeriksaan radiologi yang dilakukan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={radData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {radData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
