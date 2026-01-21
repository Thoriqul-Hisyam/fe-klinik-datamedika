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
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
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
    label: "Pharmacy & E-Resep",
    items: [
      { name: "Stok Obat", href: "/admin/farmasi", icon: Pill },
      { name: "E-Resep", href: "/admin/farmasi/resep", icon: Receipt },
      { name: "Riwayat Resep", href: "/admin/farmasi/riwayat", icon: FileText },
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
    label: "Pengaturan",
    items: [
      { name: "Pengaturan Umum", href: "/admin/pengaturan", icon: Settings },
      { name: "Manajemen User", href: "/admin/pengaturan/users", icon: Users },
      { name: "Hak Akses", href: "/admin/pengaturan/roles", icon: Lock },
      { name: "Notifikasi", href: "/admin/pengaturan/notifikasi", icon: Bell },
      { name: "Backup Data", href: "/admin/pengaturan/backup", icon: Database },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Sidebar({ collapsed, onToggle, open, onOpenChange }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (open && onOpenChange) {
      onOpenChange(false);
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => onOpenChange?.(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen border-r bg-card transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          // Mobile classes
          "max-lg:fixed",
          open ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
        )}
      >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-48 items-center border-b px-3">
            {!collapsed ? (
               <Link href="/admin" className="flex items-center gap-2 px-2">
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
            ) : (
                <Link href="/admin" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 mx-auto overflow-hidden">
                   <img 
                    src="/images/logo.png" 
                    alt="DataMedika" 
                    className="h-8 w-auto min-w-[120px] object-left object-contain"
                   />
                </Link>
            )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3">
          {(() => {
            // Find all items that match the current pathname
            const allItems = navigation.flatMap(g => g.items);
            const matches = allItems.filter(item => 
              pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href + "/"))
            );
            
            // The best match is the one with the longest href
            const bestMatch = matches.sort((a, b) => b.href.length - a.href.length)[0];

            return navigation.map((group, groupIndex) => (
              <div key={group.label} className={cn(groupIndex > 0 && "mt-4")}>
                {!collapsed && (
                  <div className="mb-1.5 px-4">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {group.label}
                    </span>
                  </div>
                )}
                {collapsed && groupIndex > 0 && (
                  <div className="mx-2 mb-2 border-t" />
                )}

                <div className="space-y-0.5 px-2">
                  {group.items.map((item) => {
                    const isActive = bestMatch?.href === item.href || pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={collapsed ? item.name : undefined}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-primary" />
                        )}
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.name}</span>}
                        {collapsed && (
                          <span className="absolute left-full ml-2 hidden rounded-md bg-foreground px-2 py-1 text-xs text-background group-hover:block whitespace-nowrap z-50">
                            {item.name}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ));
          })()}
        </nav>

        {/* Collapse Button */}
        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn("w-full h-9", collapsed ? "px-0" : "justify-start")}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                collapsed && "rotate-180"
              )}
            />
            {!collapsed && <span className="ml-2 text-sm">Tutup Sidebar</span>}
          </Button>
        </div>
      </div>
    </aside>
    </>
  );
}
