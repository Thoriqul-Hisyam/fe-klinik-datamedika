"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { dummyStokOpname, StokOpnameTable } from "@/components/admin/farmasi/stok-opname/opname-table";

export default function StokOpnameFarmasiPage() {
  const [query, setQuery] = useState("");
  const filteredData = dummyStokOpname.filter(s => 
    s.noOpname.toLowerCase().includes(query.toLowerCase()) || 
    s.unit.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Stok Opname" 
        description="Kelola stok opname di unit Farmasi."
        buttonLabel="Mulai Stok Opname" 
      />

      <SearchFilter 
        placeholder="Cari nomor opname atau unit..." 
        value={query} 
        onChange={setQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Stok Opname</CardTitle>
        </CardHeader>
        <CardContent>
          <StokOpnameTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
