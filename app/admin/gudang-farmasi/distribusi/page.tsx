"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { dummyDistribusi } from "@/components/admin/gudang-farmasi/distribusi/data";
import { DistribusiTable } from "@/components/admin/gudang-farmasi/distribusi/distribusi-table";

export default function DistribusiObatPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Distribusi Obat</h2>
          <p className="text-muted-foreground">
            Distribusi stok obat antar unit/instalasi farmasi.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Distribusi Baru
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Distribusi</CardTitle>
        </CardHeader>
        <CardContent>
          <DistribusiTable data={dummyDistribusi} />
        </CardContent>
      </Card>
    </div>
  );
}
