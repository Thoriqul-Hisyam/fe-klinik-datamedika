"use client";

import { 
  Users, 
  Clock, 
  Pill, 
  CalendarCheck, 
  UserPlus, 
  FileText, 
  ShoppingCart, 
  PieChart, 
  LayoutGrid,
  Settings,
  Check,
  Plus,
  Building2,
  Syringe,
  BarChart3,
  Search,
  FolderOpen,
  CreditCard
} from "lucide-react";
import { StatsCard } from "@/components/admin/dashboard/stats-card";
import { RecentVisitsTable } from "@/components/admin/dashboard/recent-visits-table";
import { PatientTrendChart } from "@/components/admin/dashboard/patient-trend-chart";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ALL_QUICK_ACCESS_ITEMS = [
  { id: "reg-pasien", label: "Registrasi Pasien", icon: UserPlus, href: "/admin/pasien/registrasi", color: "text-blue-600", bg: "bg-blue-50" },
  { id: "antrian", label: "Antrian Hari Ini", icon: CalendarCheck, href: "/admin/antrian", color: "text-green-600", bg: "bg-green-50" },
  { id: "rekam-medis", label: "Rekam Medis", icon: FileText, href: "/admin/emr", color: "text-purple-600", bg: "bg-purple-50" },
  { id: "stok-obat", label: "Stok Obat", icon: Pill, href: "/admin/farmasi/stok", color: "text-orange-600", bg: "bg-orange-50" },
  { id: "kasir", label: "Kasir", icon: CreditCard, href: "/admin/kasir", color: "text-pink-600", bg: "bg-pink-50" },
  { id: "lap-keuangan", label: "Laporan Keuangan", icon: PieChart, href: "/admin/laporan/keuangan", color: "text-indigo-600", bg: "bg-indigo-50" },
  { id: "lap-kunjungan", label: "Laporan Kunjungan", icon: BarChart3, href: "/admin/laporan/kunjungan", color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "daftar-pasien", label: "Daftar Pasien", icon: Users, href: "/admin/pasien", color: "text-cyan-600", bg: "bg-cyan-50" },
  { id: "poli-jadwal", label: "Jadwal Poli", icon: Building2, href: "/admin/poli/jadwal", color: "text-amber-600", bg: "bg-amber-50" },
  { id: "gudang-stok", label: "Stok Gudang", icon: Search, href: "/admin/gudang-farmasi/stok", color: "text-slate-600", bg: "bg-slate-50" },
  { id: "riwayat-kunjungan", label: "Riwayat Kunjungan", icon: FolderOpen, href: "/admin/emr/kunjungan", color: "text-rose-600", bg: "bg-rose-50" },
];

const DEFAULT_ITEMS = ["reg-pasien", "antrian", "rekam-medis", "stok-obat", "kasir", "lap-keuangan"];

export default function AdminDashboard() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("quickAccessPrefs");
    if (saved) {
      setSelectedIds(JSON.parse(saved));
    } else {
      setSelectedIds(DEFAULT_ITEMS);
    }
    setMounted(true);
  }, []);

  const toggleItem = (id: string) => {
    const newIds = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    
    setSelectedIds(newIds);
    localStorage.setItem("quickAccessPrefs", JSON.stringify(newIds));
  };

  const selectedItems = ALL_QUICK_ACCESS_ITEMS.filter((item) => selectedIds.includes(item.id));

  // Avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          {new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date())}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pasien Hari Ini"
          value="48"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Dalam Antrian"
          value="12"
          icon={Clock}
          description="3 sedang diperiksa"
        />
        <StatsCard
          title="Resep Hari Ini"
          value="36"
          icon={Pill}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Appointment"
          value="24"
          icon={CalendarCheck}
          description="6 belum konfirmasi"
        />
      </div>
      
      {/* Quick Access */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" />
            Quick Access
          </h2>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-2">
                <Settings className="h-4 w-4" />
                Atur Menu
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Kustomisasi Quick Access</DialogTitle>
                <DialogDescription>
                  Pilih menu yang ingin Anda tampilkan di halaman depan dashboard.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
                {ALL_QUICK_ACCESS_ITEMS.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left group",
                        isSelected 
                          ? "border-primary bg-primary/5" 
                          : "border-muted bg-transparent hover:border-muted-foreground"
                      )}
                    >
                      <div className={cn("p-2 rounded-lg", item.bg, item.color)}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{item.label}</p>
                      </div>
                      {isSelected ? (
                        <div className="bg-primary rounded-full p-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <Plus className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                      )}
                    </button>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {selectedItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-in fade-in duration-500">
            {selectedItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <Card className="hover:border-primary transition-colors cursor-pointer group h-full">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                    <div className={cn("p-2 rounded-lg transition-colors group-hover:scale-110 duration-200", item.bg, item.color)}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl bg-muted/20">
            <p className="text-muted-foreground text-sm">Belum ada menu Quick Access pilihan Anda.</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" size="sm" className="mt-2">
                  Atur sekarang
                </Button>
              </DialogTrigger>
              {/* This is redundant but ensures a good empty state UX */}
            </Dialog>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Visits Table - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentVisitsTable />
        </div>

        {/* Patient Trend Chart - Takes 1 column */}
        <div className="lg:col-span-1">
          <PatientTrendChart />
        </div>
      </div>
    </div>
  );
}

