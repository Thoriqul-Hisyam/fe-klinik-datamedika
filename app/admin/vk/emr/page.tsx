"use client";

import { EMRList } from "@/components/admin/emr/emr-list";

export default function VKEMRPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold uppercase tracking-tight">EMR Kamar Bersalin (VK)</h1>
          <p className="text-sm text-muted-foreground">
            Daftar pasien persalinan untuk proses Rekam Medis
          </p>
        </div>
      </div>

      <EMRList serviceType="VK" basePath="/admin/vk/emr" />
    </div>
  );
}
