"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { dummyStocks } from "@/components/admin/gudang-farmasi/stok/data";
import { StokTable } from "@/components/admin/gudang-farmasi/stok/stok-table";

export default function MedicineStokPage() {
  const [query, setQuery] = useState("");

  const { data: stocks = [], isLoading } = useQuery({
    queryKey: ["gudang-stok", query],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return dummyStocks.filter(s => 
        s.namaObat.toLowerCase().includes(query.toLowerCase()) || 
        s.kodeObat.toLowerCase().includes(query.toLowerCase())
      );
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Medicine Stok</h2>
        <p className="text-muted-foreground">
          Monitoring stok obat di Gudang dan Farmasi.
        </p>
      </div>

      <div className="flex items-center space-x-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Cari obat..." 
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Stok</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-24 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">Memuat data stok...</span>
            </div>
          ) : (
            <StokTable data={stocks} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
