"use client";

import { KFASearch } from "@/components/admin/gudang-farmasi/master-obat/kfa-search";

export default function KFAPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Kamus KFA</h2>
        <p className="text-muted-foreground">
          Pencarian Kamus Farmasi Alkes (KFA).
        </p>
      </div>
      
      <KFASearch />
    </div>
  );
}
