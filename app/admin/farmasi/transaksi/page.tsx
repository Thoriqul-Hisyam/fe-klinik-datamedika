"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { dummyFarmasiTransactions, FarmasiTransactionTable } from "@/components/admin/farmasi/transaksi/transaksi-table";

export default function TransaksiFarmasiPage() {
  const [query, setQuery] = useState("");
  const filteredData = dummyFarmasiTransactions.filter(t => 
    t.noInvoice.toLowerCase().includes(query.toLowerCase()) || 
    t.namaPasien.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Transaksi" 
        description="Kelola transaksi di unit Farmasi."
        buttonLabel="Transaksi Baru" 
      />

      <SearchFilter 
        placeholder="Cari invoice atau pasien..." 
        value={query} 
        onChange={setQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <FarmasiTransactionTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
