"use client";

import { EMRList } from "@/components/admin/emr/emr-list";

export default function OKEMRPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold uppercase tracking-tight">EMR Kamar Operasi (OK)</h1>
          <p className="text-sm text-muted-foreground">
            Daftar pasien operasi untuk proses Rekam Medis
          </p>
        </div>
      </div>

      <EMRList serviceType="OK" basePath="/admin/ok/emr" />
    </div>
  );
}
