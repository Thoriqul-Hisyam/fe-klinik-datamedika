"use client";

import {
  TrendingUp,
  Users,
  Activity,
  Clock,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Statistik & Analitik</h1>
          <p className="text-sm text-muted-foreground">
            Visualisasi data performa klinik dan demografi pasien
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              30 Hari Terakhir
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>7 Hari Terakhir</DropdownMenuItem>
            <DropdownMenuItem>30 Hari Terakhir</DropdownMenuItem>
            <DropdownMenuItem>Bulan Ini</DropdownMenuItem>
            <DropdownMenuItem>Tahun Ini</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Kunjungan", value: "3,842", delta: "+12.5%", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Rata-rata Antrian", value: "18 mnt", delta: "-4.2%", icon: Clock, color: "text-green-600", bg: "bg-green-100" },
          { label: "Kepuasan Pasien", value: "4.8/5", delta: "+0.2", icon: Activity, color: "text-purple-600", bg: "bg-purple-100" },
          { label: "Efisiensi Layanan", value: "92%", delta: "+1.5%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-100" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="text-[10px] font-medium border-primary/20 bg-primary/5">
                  {stat.delta}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visit Distribution by Poly */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribusi Kunjungan per Poli</CardTitle>
            <CardDescription>Top 5 poliklinik paling ramai</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Poli Umum", val: 450, color: "bg-blue-500", total: 1000 },
              { name: "Poli Anak", val: 320, color: "bg-green-500", total: 1000 },
              { name: "Poli Gigi", val: 280, color: "bg-purple-500", total: 1000 },
              { name: "Poli Dalam", val: 190, color: "bg-orange-500", total: 1000 },
              { name: "Poli Kandungan", val: 150, color: "bg-pink-500", total: 1000 },
            ].map((poly, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span>{poly.name}</span>
                  <span>{poly.val} Kunjungan</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${poly.color} rounded-full transition-all`}
                    style={{ width: `${(poly.val / 500) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Demografi Pasien</CardTitle>
            <CardDescription>Berdasarkan kelompok usia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-end justify-between gap-2 h-40 pt-4">
              {[
                { label: "0-12", val: 45, color: "bg-green-400" },
                { label: "13-18", val: 25, color: "bg-blue-400" },
                { label: "19-35", val: 85, color: "bg-primary" },
                { label: "36-50", val: 65, color: "bg-orange-400" },
                { label: "51+", val: 40, color: "bg-purple-400" },
              ].map((age, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className={`w-full ${age.color} rounded-t-lg transition-all relative group`}
                    style={{ height: `${age.val}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border whitespace-nowrap z-10">
                      {age.val}%
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">{age.label}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Produktif</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span>Anak</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                <span>Lansia</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peak Visit Hours (Simulated) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Waktu Kunjungan Teramai</CardTitle>
          <CardDescription>Rata-rata kedatangan pasien per jam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full border-b flex items-end gap-1 px-2">
            {Array.from({ length: 12 }).map((_, i) => {
              const hour = i + 8;
              const height = [20, 45, 80, 75, 40, 35, 60, 95, 85, 50, 25, 10][i];
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className={`w-full transition-all group relative rounded-t-sm ${
                      height > 80 ? "bg-primary/80" : "bg-primary/40"
                    }`}
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border whitespace-nowrap z-10">
                      {hour}:00
                    </div>
                  </div>
                  <span className="text-[9px] text-muted-foreground">{hour}:00</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Simple internal Badge component if not imported
function Badge({ children, variant, className }: any) {
  const variants: any = {
    outline: "border text-foreground",
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
  };
  return (
    <div className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${variants[variant || 'default']} ${className}`}>
      {children}
    </div>
  );
}
