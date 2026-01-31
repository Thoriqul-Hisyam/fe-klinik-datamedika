"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { dummyPembelian } from "@/components/admin/gudang-farmasi/pembelian/data";
import { PembelianTable } from "@/components/admin/gudang-farmasi/pembelian/pembelian-table";

export default function PembelianObatPage() {
  const [query, setQuery] = useState("");
  const filteredData = dummyPembelian.filter(p => 
    p.noPO.toLowerCase().includes(query.toLowerCase()) || 
    p.supplier.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pembelian Obat</h2>
          <p className="text-muted-foreground">
            Pengelolaan Purchase Order (PO) ke Supplier.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Buat PO Baru
        </Button>
      </div>

      <div className="flex items-center space-x-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Cari PO atau Supplier..." 
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pembelian</CardTitle>
        </CardHeader>
        <CardContent>
          <PembelianTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
