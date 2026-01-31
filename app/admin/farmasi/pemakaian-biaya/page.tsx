"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { dummyCostUsage, CostUsageTable } from "@/components/admin/farmasi/pemakaian-biaya/usage-table";

export default function PemakaianBiayaPage() {
  const [query, setQuery] = useState("");
  const filteredData = dummyCostUsage.filter(c => 
    c.item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Pemakaian Biaya Item" 
        description="Kelola pemakaian biaya item."
        buttonLabel="Catat Pemakaian" 
      />

      <SearchFilter 
        placeholder="Cari item..." 
        value={query} 
        onChange={setQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Detail Pemakaian Biaya</CardTitle>
        </CardHeader>
        <CardContent>
          <CostUsageTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
