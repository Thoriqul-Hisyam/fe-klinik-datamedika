"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ambulance, AlertTriangle, Users, Clock, Siren } from "lucide-react";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const triageData = [
  { name: "Merah", value: 5, color: "#ef4444" },
  { name: "Kuning", value: 12, color: "#eab308" },
  { name: "Hijau", value: 25, color: "#22c55e" },
  { name: "Hitam", value: 1, color: "#1f2937" },
];

const hourlyCases = [
  { name: "00-04", cases: 5 },
  { name: "04-08", cases: 8 },
  { name: "08-12", cases: 15 },
  { name: "12-16", cases: 20 },
  { name: "16-20", cases: 18 },
  { name: "20-24", cases: 10 },
];

const insuranceData = [
    { name: "BPJS", value: 30, color: "#22c55e" },
    { name: "Umum", value: 10, color: "#3b82f6" },
    { name: "Jasa Raharja", value: 3, color: "#ef4444" },
];

export default function IGDPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Kunjungan IGD</h1>
          <p className="text-muted-foreground">
            Analisis dan statistik kunjungan pasien Instalasi Gawat Darurat
          </p>
        </div>
        <DashboardFilter />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kunjungan IGD Hari Ini</CardTitle>
            <Ambulance className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">+12% dari minggu lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Respon Time &lt; 5 Menit</CardTitle>
            <Siren className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Target tercapai</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pasien Dirujuk</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Rujukan ke RS lain</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bed Occupancy IGD</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">13 dari 20 Bed Terisi</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribusi Triage</CardTitle>
            <CardDescription>Klasifikasi tingkat kegawatdaruratan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={triageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {triageData.map((entry, index) => (
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
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Distribusi Penjamin</CardTitle>
                <CardDescription>Jenis pembayaran pasien IGD</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
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
        <Card className="col-span-1 md:col-span-3 lg:col-span-1">
          <CardHeader>
            <CardTitle>Waktu Kedatangan</CardTitle>
            <CardDescription>Distribusi kunjungan berdasarkan jam</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyCases} layout="vertical" margin={{left: -20}}>
                   <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" width={40} style={{fontSize: '11px'}} />
                   <Tooltip cursor={{fill: 'transparent'}} />
                   <Bar dataKey="cases" fill="#f97316" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
