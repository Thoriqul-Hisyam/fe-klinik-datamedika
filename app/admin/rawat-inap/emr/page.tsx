"use client";

import { EMRList } from "@/components/admin/emr/emr-list";

export default function RawatInapEMRPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold uppercase tracking-tight">EMR Rawat Inap</h1>
          <p className="text-sm text-muted-foreground">
            Daftar pasien rawat inap untuk proses Rekam Medis
          </p>
        </div>
      </div>

      <EMRList serviceType="Rawat Inap" basePath="/admin/rawat-inap/emr" />
    </div>
  );
}
