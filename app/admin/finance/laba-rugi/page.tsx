"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar,
  ArrowRight,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/admin/shared/page-header";
import { FinanceStatCard, FinanceStatsGrid } from "@/components/admin/finance/finance-stats";
import { cn } from "@/lib/utils";

export default function LabaRugiPage() {
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val);
  };

  const revenue = 85450000;
  const expense = 62150000;
  const profit = revenue - expense;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Laba Rugi" 
        description="Ringkasan performa keuangan Faskes (Profit & Loss Statement)."
      />

      <FinanceStatsGrid>
        <FinanceStatCard 
          title="Total Pendapatan"
          value={formatIDR(revenue)}
          trend={{ value: "+12.5%", isUp: true }}
          icon={TrendingUp}
          variant="primary"
        />
        <FinanceStatCard 
          title="Total Pengeluaran"
          value={formatIDR(expense)}
          trend={{ value: "+5.2%", isUp: false }}
          icon={TrendingDown}
          variant="destructive"
        />
        <FinanceStatCard 
          title="Laba Bersih"
          value={formatIDR(profit)}
          trend={{ value: "+22.4%", isUp: true }}
          icon={BarChart3}
          variant="success"
        />
        <FinanceStatCard 
          title="Margin Keuntungan"
          value="27.3%"
          description="Sehat (Standard > 20%)"
          icon={PieChart}
          variant="success"
        />
      </FinanceStatsGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simplified P&L Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Rincian Pendapatan</CardTitle>
            <CardDescription>Berdasarkan kategori sumber pemasukan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Pelayanan Poli Umum</span>
                <span className="font-semibold">{formatIDR(35000000)}</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "41%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Penjualan Farmasi</span>
                <span className="font-semibold">{formatIDR(28450000)}</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "33%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Layanan Laboratorium</span>
                <span className="font-semibold">{formatIDR(12000000)}</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "14%" }} />
              </div>
            </div>
            <div className="pt-4 border-t flex items-center justify-between font-bold">
              <span>Total Pemasukan</span>
              <span className="text-primary text-lg">{formatIDR(revenue)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rincian Pengeluaran</CardTitle>
            <CardDescription>Berdasarkan kategori biaya operasional</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Gaji & Honor Pegawai</span>
                <span className="font-semibold text-destructive">{formatIDR(32000000)}</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: "51%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Pengadaan Obat & Alkes</span>
                <span className="font-semibold text-destructive">{formatIDR(22150000)}</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: "36%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Utilitas & Sewa</span>
                <span className="font-semibold text-destructive">{formatIDR(8000000)}</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: "13%" }} />
              </div>
            </div>
            <div className="pt-4 border-t flex items-center justify-between font-bold">
              <span>Total Pengeluaran</span>
              <span className="text-destructive text-lg">{formatIDR(expense)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Kesimpulan Laba Rugi</h3>
              <p className="text-sm text-muted-foreground">Performa keuangan Faskes bulan ini berada dalam kategori sangat baik.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs uppercase text-muted-foreground font-medium mb-1">EBITDA</p>
                <div className="text-xl font-bold">{formatIDR(profit + 5000000)}</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <Button size="lg" className="font-semibold shadow-lg">
                <Download className="mr-2 h-4 w-4" />
                Download PDF Full Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
