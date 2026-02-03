"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Activity, TrendingUp, AlertCircle } from "lucide-react";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const diseaseData = [
  { name: "ISPA", cases: 245 },
  { name: "Hipertensi", cases: 180 },
  { name: "Diabetes", cases: 156 },
  { name: "Gastritis", cases: 132 },
  { name: "Diare", cases: 98 },
  { name: "Demam Tifoid", cases: 85 },
  { name: "Myalgia", cases: 76 },
  { name: "Cephalgia", cases: 65 },
  { name: "Dermatitis", cases: 54 },
  { name: "Asma", cases: 42 },
];

export default function MorbiditasPage() {
  const handleFilter = (from: Date | undefined, to: Date | undefined) => {
    console.log("Filtering Morbiditas data from:", from, "to:", to);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Morbiditas Pasien</h1>
          <p className="text-muted-foreground">
            Analisis pola penyakit dan morbiditas pasien (10 Penyakit Terbanyak)
          </p>
        </div>
        <DashboardFilter onFilter={handleFilter} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kasus</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">Kasus bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penyakit Tertinggi</CardTitle>
            <Activity className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ISPA</div>
            <p className="text-xs text-muted-foreground">245 Kasus (19.6%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kasus Baru</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15%</div>
            <p className="text-xs text-muted-foreground">Kenaikan vs bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penyakit Menular</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320</div>
            <p className="text-xs text-muted-foreground">Perlu pengawasan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>10 Besar Penyakit (Top 10 Diseases)</CardTitle>
          <CardDescription>Distribusi diagnosis penyakit tertinggi bulan ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diseaseData} layout="vertical" margin={{ left: 60, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="cases" name="Jumlah Kasus" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
