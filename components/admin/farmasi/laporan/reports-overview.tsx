"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ClipboardList, 
  Package, 
  MousePointerClick, 
  Pill, 
  Truck, 
  ShoppingCart, 
  FileText, 
  ClipboardCheck, 
  LayoutDashboard, 
  UserCircle 
} from "lucide-react";

export function ReportsOverview() {
  const reports = [
    { name: "Stok Obat BHP", slug: "stok-bhp", icon: ClipboardList, desc: "Laporan stok bahan habis pakai." },
    { name: "Slow Moving", slug: "slow-moving", icon: TrendingDown, desc: "Daftar obat dengan perputaran lambat." },
    { name: "Persediaan", slug: "persediaan", icon: LayoutDashboard, desc: "Ringkasan nilai persediaan obat." },
    { name: "Rekap Penjualan", slug: "rekap-penjualan", icon: BarChart3, desc: "Total rekapitulasi penjualan harian/bulanan." },
    { name: "Rekap Paket Obat", slug: "rekap-paket", icon: Package, desc: "Laporan penggunaan paket obat." },
    { name: "Rekap Waktu Tunggu", slug: "waktu-tunggu", icon: MousePointerClick, desc: "Analisis kecepatan pelayanan resep." },
    { name: "Rekap Penjualan Per Obat", slug: "penjualan-per-obat", icon: Pill, desc: "Detail penjualan berdasarkan item obat." },
    { name: "Laporan Distribusi", slug: "distribusi", icon: Truck, desc: "Mutasi barang antar unit farmasi." },
    { name: "Pembelian Obat", slug: "pembelian", icon: ShoppingCart, desc: "Daftar pengadaan obat dari supplier." },
    { name: "Fast Moving", slug: "fast-moving", icon: TrendingUp, desc: "Daftar obat dengan perputaran cepat." },
    { name: "Rekap Pembelian", slug: "rekap-pembelian", icon: FileText, desc: "Total rekapitulasi nilai pembelian." },
    { name: "Stok Opname", slug: "stok-opname", icon: ClipboardCheck, desc: "Laporan hasil perhitungan fisik stok." },
    { name: "Kartu Stok", slug: "kartu-stok", icon: LayoutDashboard, desc: "Histori mutasi stok per item." },
    { name: "History Obat Pasien", slug: "history-pasien", icon: UserCircle, desc: "Riwayat penggunaan obat per pasien." },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reports.map((r, i) => (
        <Link key={i} href={`/admin/farmasi/laporan/${r.slug}`}>
          <Card className="h-full hover:bg-muted/50 cursor-pointer transition-colors group">
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20">
                <r.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{r.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
