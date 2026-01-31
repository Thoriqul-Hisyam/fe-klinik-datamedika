"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { dummyAPSTransactions, APSTransactionTable } from "@/components/admin/farmasi/transaksi-aps/aps-table";

export default function TransaksiAPSPage() {
  const [query, setQuery] = useState("");
  const filteredData = dummyAPSTransactions.filter(t => 
    t.noKwitansi.toLowerCase().includes(query.toLowerCase()) || 
    t.pembeli.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Transaksi APS" 
        description="Kelola transaksi Atas Permintaan Sendiri (APS)."
        buttonLabel="Transaksi APS Baru" 
      />

      <SearchFilter 
        placeholder="Cari kwitansi atau pembeli..." 
        value={query} 
        onChange={setQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi APS</CardTitle>
        </CardHeader>
        <CardContent>
          <APSTransactionTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
