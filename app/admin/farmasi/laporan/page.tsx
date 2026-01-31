"use client";

import { ReportsOverview } from "@/components/admin/farmasi/laporan/reports-overview";

export default function LaporanFarmasiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Laporan</h2>
        <p className="text-muted-foreground">
          Laporan unit Farmasi.
        </p>
      </div>

      <ReportsOverview />
    </div>
  );
}
