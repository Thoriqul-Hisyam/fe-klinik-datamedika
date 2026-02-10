"use client";

import { EMRList } from "@/components/admin/emr/emr-list";

export default function RawatJalanEMRPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold uppercase tracking-tight">EMR Rawat Jalan</h1>
          <p className="text-sm text-muted-foreground">
            Daftar pasien rawat jalan untuk proses Rekam Medis
          </p>
        </div>
      </div>

      <EMRList serviceType="Rawat Jalan" basePath="/admin/rawat-jalan/emr" />
    </div>
  );
}
