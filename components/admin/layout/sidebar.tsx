"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  UserPlus,
  FileText,
  ClipboardList,
  Building2,
  Stethoscope,
  Pill,
  Shield,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Activity,
  Users,
  Calendar,
  FolderOpen,
  Receipt,
  Syringe,
  FileCheck,
  CreditCard,
  PieChart,
  Bell,
  Lock,
  Database,
  FlaskConical,
  Microscope,
  TrendingUp,
  TrendingDown,
  Skull,
  ClipboardCheck,
  Ambulance,
  ShieldCheck,
  BedDouble,
  DoorOpen,
  Scissors,
  Baby,
  HeartPulse,
  Package,
  Truck,
  ShoppingCart,
  Undo2,
  Search,
  MousePointerClick,
  UserCircle,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SubNavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavItem {
  name: string;
  href?: string;
  icon: LucideIcon;
  subItems?: SubNavItem[];
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    label: "Menu Utama",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  
  {
    label: "Pendaftaran Pasien",
    items: [
      { name: "Daftar Pasien Hari Ini", href: "/admin/pasien", icon: Users },
      { name: "Pendaftaran Baru", href: "/admin/pasien/baru", icon: UserPlus },
      { name: "Antrian Hari Ini", href: "/admin/antrian", icon: Calendar },
    ],
  },
  {
    label: "EMR",
    items: [
      { name: "Rekam Medis", href: "/admin/emr", icon: FileText },
      { name: "Riwayat Kunjungan", href: "/admin/emr/kunjungan", icon: FolderOpen },
      { name: "Dokumen Pasien", href: "/admin/emr/dokumen", icon: FileCheck },
    ],
  },
  {
    label: "Treatment Plan",
    items: [
      { name: "Rencana Perawatan", href: "/admin/treatment", icon: ClipboardList },
      { name: "Tindakan Medis", href: "/admin/treatment/tindakan", icon: Syringe },
    ],
  },
  {
    label: "Poli",
    items: [
      { name: "Daftar Poli", href: "/admin/poli", icon: Building2 },
      { name: "Jadwal Poli", href: "/admin/poli/jadwal", icon: Calendar },
    ],
  },
  {
    label: "Dokter",
    items: [
      { name: "Daftar Dokter", href: "/admin/dokter", icon: Stethoscope },
      { name: "Jadwal Praktek", href: "/admin/dokter/jadwal", icon: Calendar },
    ],
  },
  {
    label: "Farmasi",
    items: [
      { name: "Stok Obat", href: "/admin/farmasi/stok", icon: Pill },
      { name: "Alokasi Vaksin", href: "/admin/farmasi/alokasi-vaksin", icon: Syringe },
      { name: "Paket Obat", href: "/admin/farmasi/paket-obat", icon: Package },
      { name: "Transaksi", href: "/admin/farmasi/transaksi", icon: ShoppingCart },
      { name: "SOAP", href: "/admin/farmasi/soap", icon: FileText },
      { name: "Permintaan ke Gudang", href: "/admin/farmasi/permintaan-gudang", icon: Building2 },
      { name: "Transaksi Paket", href: "/admin/farmasi/transaksi-paket", icon: LayoutDashboard },
      { name: "Retur ke Gudang", href: "/admin/farmasi/retur-gudang", icon: Undo2 },
      { 
        name: "Laporan", 
        icon: BarChart3,
        subItems: [
          { name: "Stok Obat BHP", href: "/admin/farmasi/laporan/stok-bhp", icon: ClipboardList },
          { name: "Slow Moving", href: "/admin/farmasi/laporan/slow-moving", icon: TrendingDown },
          { name: "Persediaan", href: "/admin/farmasi/laporan/persediaan", icon: LayoutDashboard },
          { name: "Rekap Penjualan", href: "/admin/farmasi/laporan/rekap-penjualan", icon: BarChart3 },
          { name: "Rekap Paket Obat", href: "/admin/farmasi/laporan/rekap-paket", icon: Package },
          { name: "Rekap Waktu Tunggu", href: "/admin/farmasi/laporan/waktu-tunggu", icon: MousePointerClick },
          { name: "Rekap Penjualan Per Obat", href: "/admin/farmasi/laporan/penjualan-per-obat", icon: Pill },
          { name: "Laporan Distribusi", href: "/admin/farmasi/laporan/distribusi", icon: Truck },
          { name: "Pembelian Obat", href: "/admin/farmasi/laporan/pembelian", icon: ShoppingCart },
          { name: "Fast Moving", href: "/admin/farmasi/laporan/fast-moving", icon: TrendingUp },
          { name: "Rekap Pembelian", href: "/admin/farmasi/laporan/rekap-pembelian", icon: FileText },
          { name: "Stok Opname", href: "/admin/farmasi/laporan/stok-opname", icon: ClipboardCheck },
          { name: "Kartu Stok", href: "/admin/farmasi/laporan/kartu-stok", icon: LayoutDashboard },
          { name: "History Obat Pasien", href: "/admin/farmasi/laporan/history-pasien", icon: UserCircle },
        ]
      },
      { name: "Pemakaian Biaya Item", href: "/admin/farmasi/pemakaian-biaya", icon: CreditCard },
      { name: "Transaksi APS", href: "/admin/farmasi/transaksi-aps", icon: UserPlus },
      { name: "Stok Opname", href: "/admin/farmasi/stok-opname", icon: ClipboardCheck },
      { name: "Persetujuan Stok Opname", href: "/admin/farmasi/approve-stok-opname", icon: FileCheck },
    ],
  },
  {
    label: "Finance",
    items: [
      { name: "Pendapatan", href: "/admin/finance/pendapatan", icon: Wallet },
      { name: "Pengeluaran", href: "/admin/finance/pengeluaran", icon: Receipt },
      { name: "Laba Rugi", href: "/admin/finance/laba-rugi", icon: BarChart3 },
    ],
  },
  {
    label: "BPJS",
    items: [
      { name: "Integrasi BPJS", href: "/admin/bpjs", icon: Shield },
      { name: "Klaim BPJS", href: "/admin/bpjs/klaim", icon: CreditCard },
      { name: "Laporan BPJS", href: "/admin/bpjs/laporan", icon: FileCheck },
    ],
  },
  {
    label: "Laporan",
    items: [
      { name: "Laporan Kunjungan", href: "/admin/laporan/kunjungan", icon: BarChart3 },
      { name: "Laporan Keuangan", href: "/admin/laporan/keuangan", icon: PieChart },
      { name: "Statistik", href: "/admin/laporan/statistik", icon: Activity },
    ],
  },
  {
    label: "Master Data",
    items: [
      { name: "Master Laboratorium", href: "/admin/master/laboratorium", icon: Microscope },
      { name: "Master Radiologi", href: "/admin/master/radiologi", icon: FlaskConical },
    ],
  },
  {
    label: "Manajemen Dashboard",
    items: [
      {
        name: "Kunjungan",
        icon: Activity,
        subItems: [
          { name: "Rawat Jalan", href: "/admin/manajemen-dashboard/kunjungan/rawat-jalan", icon: Users },
          { name: "IGD", href: "/admin/manajemen-dashboard/kunjungan/igd", icon: Ambulance },
          { name: "Penjamin", href: "/admin/manajemen-dashboard/kunjungan/penjamin", icon: ShieldCheck },
          { name: "Rawat Inap Kelas", href: "/admin/manajemen-dashboard/kunjungan/rawat-inap-kelas", icon: BedDouble },
          { name: "Rawat Inap Ruangan", href: "/admin/manajemen-dashboard/kunjungan/rawat-inap-ruangan", icon: DoorOpen },
          { name: "Kunjungan OK", href: "/admin/manajemen-dashboard/kunjungan/ok", icon: Scissors },
          { name: "Kunjungan VK", href: "/admin/manajemen-dashboard/kunjungan/vk", icon: Baby },
        ],
      },
      {
        name: "Penunjang Medis",
        icon: HeartPulse,
        subItems: [
          { name: "Laboratorium", href: "/admin/manajemen-dashboard/penunjang-medis/laboratorium", icon: Microscope },
          { name: "Radiologi", href: "/admin/manajemen-dashboard/penunjang-medis/radiologi", icon: FlaskConical },
        ],
      },
      { name: "Morbiditas Pasien", href: "/admin/manajemen-dashboard/morbiditas", icon: ClipboardCheck },
      {
        name: "Data Obat/Alkes",
        icon: Package,
        subItems: [
          { name: "Fast Moving", href: "/admin/manajemen-dashboard/obat-alkes/fast-moving", icon: TrendingUp },
          { name: "Slow Moving", href: "/admin/manajemen-dashboard/obat-alkes/slow-moving", icon: TrendingDown },
          { name: "Death Moving", href: "/admin/manajemen-dashboard/obat-alkes/death-moving", icon: Skull },
          { name: "Kartu Stock", href: "/admin/manajemen-dashboard/obat-alkes/kartu-stock", icon: ClipboardList },
        ],
      },
    ],
  },
  {
    label: "Pengaturan",
    items: [
      { name: "Pengaturan Umum", href: "/admin/pengaturan", icon: Settings },
      { name: "Manajemen User", href: "/admin/pengaturan/users", icon: Users },
      { name: "Hak Akses", href: "/admin/pengaturan/roles", icon: Lock },
      { name: "Notifikasi", href: "/admin/pengaturan/notifikasi", icon: Bell },
      { name: "Backup Data", href: "/admin/pengaturan/backup", icon: Database },
    ],
  },
  {
    label: "Gudang Farmasi",
    items: [
      { 
        name: "Master Obat", 
        href: "/admin/gudang-farmasi/master-obat", 
        icon: Pill 
      },
      { 
        name: "Kamus KFA", 
        href: "/admin/gudang-farmasi/kfa", 
        icon: Search 
      },
      { 
        name: "Master Supplier", 
        href: "/admin/gudang-farmasi/master-supplier", 
        icon: Truck 
      },
      { 
        name: "Medicine Stok", 
        href: "/admin/gudang-farmasi/stok", 
        icon: Package 
      },
      { 
        name: "Pembelian Obat", 
        href: "/admin/gudang-farmasi/pembelian", 
        icon: ShoppingCart 
      },
      { 
        name: "Distribusi Obat", 
        href: "/admin/gudang-farmasi/distribusi", 
        icon: Truck 
      },
      { 
        name: "Retur", 
        href: "/admin/gudang-farmasi/retur", 
        icon: Undo2 
      },
      { 
        name: "Kartu Stok", 
        href: "/admin/gudang-farmasi/kartu-stok", 
        icon: ClipboardList 
      },
    ],
  },
  {
    label: "Dashboard Dinkes",
    items: [
      { name: "Monitoring Faskes", href: "/admin/dinkes", icon: Building2 },
      { name: "Finance Monitoring", href: "/admin/dinkes/finance", icon: Wallet },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Helper component for rendering nav items with submenus
function NavItemWithSubMenu({ 
  item, 
  pathname 
}: { 
  item: NavItem; 
  pathname: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Check if any subitem is active
  const hasActiveSubItem = item.subItems?.some(sub => 
    pathname === sub.href || pathname.startsWith(sub.href + "/")
  );
  
  // Auto-expand if a sub-item is active
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (hasActiveSubItem && !isExpanded) {
      setIsExpanded(true);
    }
  }

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "group relative flex w-full items-center justify-between gap-3 rounded-md px-2.5 py-2 text-sm transition-colors",
          hasActiveSubItem
            ? "bg-primary/5 text-primary font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4 shrink-0" />
          <span>{item.name}</span>
        </div>
        <ChevronDown 
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isExpanded && "rotate-180"
          )} 
        />
      </button>
      
      {isExpanded && item.subItems && (
        <div className="ml-4 mt-1 space-y-0.5 border-l border-muted pl-3">
          {item.subItems.map((subItem) => {
            const isSubActive = pathname === subItem.href || pathname.startsWith(subItem.href + "/");
            
            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  isSubActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {isSubActive && (
                  <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r bg-primary" />
                )}
                <subItem.icon className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs">{subItem.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ collapsed, onToggle, open, onOpenChange }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (open && onOpenChange && window.innerWidth < 1024) {
      onOpenChange(false);
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile/Desktop Backdrop when open as overlay? 
          Actually on desktop we want it to push content, so no backdrop there.
      */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-transparent lg:hidden"
          onClick={() => onOpenChange?.(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen border-r bg-card transition-all duration-300 ease-in-out w-64",
          !open && "-translate-x-full"
        )}
      >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-48 items-center justify-between border-b px-4">
             <Link href="/admin" className="flex items-center gap-2">
                 <img 
                    src="/images/logo.png" 
                    alt="DataMedika" 
                    className="h-48 w-auto object-contain"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const fallback = (e.target as HTMLImageElement).parentElement?.querySelector('.logo-fallback');
                        if (fallback) (fallback as HTMLElement).style.display = 'block';
                    }}
                 />
                 <span className="logo-fallback hidden font-semibold text-lg text-primary">DataMedika</span>
             </Link>
             
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3">
          {navigation.map((group, groupIndex) => (
            <div key={group.label} className={cn(groupIndex > 0 && "mt-4")}>
              <div className="mb-1.5 px-4">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </span>
              </div>

              <div className="space-y-0.5 px-2">
                {group.items.map((item) => {
                  // If item has subItems, render with submenu
                  if (item.subItems && item.subItems.length > 0) {
                    return (
                      <NavItemWithSubMenu 
                        key={item.name} 
                        item={item} 
                        pathname={pathname} 
                      />
                    );
                  }
                  
                  // Otherwise render as regular link
                  const isActive = pathname === item.href || 
                    (item.href && item.href !== "/admin" && pathname.startsWith(item.href + "/"));

                  return (
                    <Link
                      key={item.href || item.name}
                      href={item.href || "#"}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-primary" />
                      )}
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Close Button */}
        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange?.(false)}
            className="w-full h-9 justify-start"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="ml-2 text-sm">Tutup Sidebar</span>
          </Button>
        </div>
      </div>
    </aside>
    </>
  );
}
