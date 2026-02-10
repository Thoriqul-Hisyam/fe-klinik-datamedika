"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { dummyDistribusi } from "@/components/admin/gudang-farmasi/distribusi/data";
import { DistribusiTable } from "@/components/admin/gudang-farmasi/distribusi/distribusi-table";

export default function DistribusiObatPage() {
  const { data: distribusis = [], isLoading } = useQuery({
    queryKey: ["gudang-distribusi"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return dummyDistribusi;
    },
  });

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
          {isLoading ? (
            <div className="flex h-24 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">Memuat data distribusi...</span>
            </div>
          ) : (
            <DistribusiTable data={distribusis} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
