"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { dummyReturGudang, ReturGudangTable } from "@/components/admin/farmasi/retur-gudang/retur-table";

export default function ReturGudangPage() {
  const [query, setQuery] = useState("");
  const filteredData = dummyReturGudang.filter(r => 
    r.noRetur.toLowerCase().includes(query.toLowerCase()) || 
    r.unitAsal.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Retur ke Gudang" 
        description="Kelola retur barang ke gudang."
        buttonLabel="Buat Retur" 
      />

      <SearchFilter 
        placeholder="Cari nomor retur atau unit..." 
        value={query} 
        onChange={setQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Retur</CardTitle>
        </CardHeader>
        <CardContent>
          <ReturGudangTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
