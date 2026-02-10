"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, CreditCard, Users, PieChart as PieChartIcon, Building, Loader2 } from "lucide-react";
import { DashboardFilter } from "@/components/admin/dashboard/dashboard-filter";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const mockInsuranceDist = [
  { name: "BPJS Kesehatan", value: 65, color: "#16a34a" },
  { name: "Asuransi Swasta", value: 15, color: "#2563eb" },
  { name: "Umum / Pribadi", value: 18, color: "#9333ea" },
  { name: "Perusahaan", value: 2, color: "#ea580c" },
];

const mockRevenueByInsurance = [
  { name: "BPJS", amount: 45000000 },
  { name: "Swasta", amount: 28000000 },
  { name: "Umum", amount: 15000000 },
  { name: "Perusahaan", amount: 5000000 },
];

// Helper to format currency
const formatIDR = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
};

export default function PenjaminPage() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboard-penjamin"],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        insuranceDist: mockInsuranceDist,
        revenueByInsurance: mockRevenueByInsurance,
        stats: {
          bpjs: { total: "1,240", percent: "65%" },
          private: { total: "345", note: "Admedika, Prudential, dll" },
          general: { total: "412", note: "Pembayaran Tunai/QRIS" },
          corporate: { total: "45", note: "Kontrak korporat" }
        }
      };
    }
  });

  const handleFilter = (from: Date | undefined, to: Date | undefined) => {
    console.log("Filtering Penjamin data from:", from, "to:", to);
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground font-medium">Memuat data dashboard...</span>
      </div>
    );
  }

  const { insuranceDist, revenueByInsurance, stats } = dashboardData!;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Kunjungan per Penjamin</h1>
          <p className="text-muted-foreground">
            Analisis kunjungan berdasarkan jenis penjamin (BPJS, Asuransi, Umum, dll)
          </p>
        </div>
        <DashboardFilter onFilter={handleFilter} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BPJS Kesehatan</CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bpjs.total}</div>
            <p className="text-xs text-muted-foreground">{stats.bpjs.percent} dari total kunjungan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asuransi Swasta</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.private.total}</div>
            <p className="text-xs text-muted-foreground">{stats.private.note}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pasien Umum</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.general.total}</div>
            <p className="text-xs text-muted-foreground">{stats.general.note}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kerjasama Perusahaan</CardTitle>
            <Building className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.corporate.total}</div>
            <p className="text-xs text-muted-foreground">{stats.corporate.note}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Persentase Kunjungan</CardTitle>
            <CardDescription>Proporsi kunjungan berdasarkan penjamin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={insuranceDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {insuranceDist.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Estimasi Pendapatan</CardTitle>
            <CardDescription>Pendapatan gross berdasarkan jenis penjamin</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByInsurance} layout="vertical">
                   <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" width={80} />
                   <Tooltip formatter={(value) => formatIDR(Number(value))} />
                   <Bar dataKey="amount" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                      {revenueByInsurance.map((entry: any, index: number) => (
                           <Cell key={`cell-${index}`} fill={insuranceDist[index % insuranceDist.length].color} />
                      ))}
                   </Bar>
                </BarChart>
              </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
