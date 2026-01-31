"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ClipboardList, TrendingDown, LayoutDashboard, BarChart3, Package, MousePointerClick, Pill, Truck, ShoppingCart, TrendingUp, FileText, ClipboardCheck, UserCircle } from "lucide-react";
import { dummyReportData } from "@/components/admin/farmasi/laporan/data";
import { ReportTable } from "@/components/admin/farmasi/laporan/report-table";

const reportsMap: Record<string, { name: string, desc: string, icon: any }> = {
  "stok-bhp": { name: "Stok Obat BHP", desc: "Laporan stok bahan habis pakai.", icon: ClipboardList },
  "slow-moving": { name: "Slow Moving", desc: "Daftar obat dengan perputaran lambat.", icon: TrendingDown },
  "persediaan": { name: "Persediaan", desc: "Ringkasan nilai persediaan obat.", icon: LayoutDashboard },
  "rekap-penjualan": { name: "Rekap Penjualan", desc: "Total rekapitulasi penjualan harian/bulanan.", icon: BarChart3 },
  "rekap-paket": { name: "Rekap Paket Obat", desc: "Laporan penggunaan paket obat.", icon: Package },
  "waktu-tunggu": { name: "Rekap Waktu Tunggu", desc: "Analisis kecepatan pelayanan resep.", icon: MousePointerClick },
  "penjualan-per-obat": { name: "Rekap Penjualan Per Obat", desc: "Detail penjualan berdasarkan item obat.", icon: Pill },
  "distribusi": { name: "Laporan Distribusi", desc: "Mutasi barang antar unit farmasi.", icon: Truck },
  "pembelian": { name: "Pembelian Obat", desc: "Daftar pengadaan obat dari supplier.", icon: ShoppingCart },
  "fast-moving": { name: "Fast Moving", desc: "Daftar obat dengan perputaran cepat.", icon: TrendingUp },
  "rekap-pembelian": { name: "Rekap Pembelian", desc: "Total rekapitulasi nilai pembelian.", icon: FileText },
  "stok-opname": { name: "Stok Opname", desc: "Laporan hasil perhitungan fisik stok.", icon: ClipboardCheck },
  "kartu-stok": { name: "Kartu Stok", icon: LayoutDashboard, desc: "Histori mutasi stok per item." },
  "history-pasien": { name: "History Obat Pasien", desc: "Riwayat penggunaan obat per pasien.", icon: UserCircle },
};

export default function LaporanDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const report = reportsMap[slug];
  
  const [loading, setLoading] = useState(true);
  const data = dummyReportData[slug] || [];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!report) {
    return <div className="p-8 text-center">Laporan tidak ditemukan.</div>;
  }

  const Icon = report.icon;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{report.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{report.desc}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-20 grayscale opacity-40">
              <Activity className="h-12 w-12 text-primary animate-pulse" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Memuat Data Laporan...</h3>
                <p className="text-sm text-muted-foreground">Sistem sedang menarik data terbaru.</p>
              </div>
            </div>
          ) : (
            <ReportTable data={data} slug={slug} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
