"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { dummyTransaksiPaket, TransaksiPaketTable } from "@/components/admin/farmasi/transaksi-paket/paket-table";

export default function TransaksiPaketPage() {
  const [query, setQuery] = useState("");
  const filteredData = dummyTransaksiPaket.filter(t => 
    t.noTransaksi.toLowerCase().includes(query.toLowerCase()) || 
    t.pembeli.toLowerCase().includes(query.toLowerCase()) ||
    t.namaPaket.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Transaksi Paket" 
        description="Kelola transaksi paket di unit Farmasi."
        buttonLabel="Transaksi Paket Baru" 
      />

      <SearchFilter 
        placeholder="Cari transaksi, paket, atau pembeli..." 
        value={query} 
        onChange={setQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Transaksi Paket</CardTitle>
        </CardHeader>
        <CardContent>
          <TransaksiPaketTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
