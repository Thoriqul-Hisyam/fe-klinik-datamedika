"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { dummyStocks } from "@/components/admin/gudang-farmasi/stok/data";
import { StokTable } from "@/components/admin/gudang-farmasi/stok/stok-table";

export default function MedicineStokPage() {
  const [query, setQuery] = useState("");
  const filteredData = dummyStocks.filter(s => 
    s.namaObat.toLowerCase().includes(query.toLowerCase()) || 
    s.kodeObat.toLowerCase().includes(query.toLowerCase())
  );

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
          <StokTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
