"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { dummyFarmasiStocks, FarmasiStockTable } from "@/components/admin/farmasi/stok/stok-table";
import { KoreksiStokDialog } from "@/components/admin/farmasi/stok/koreksi-dialog";

export default function StokObatFarmasiPage() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const filteredData = dummyFarmasiStocks.filter(s => 
    s.nama.toLowerCase().includes(query.toLowerCase()) || 
    s.kode.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Stok Obat" 
        description="Kelola stok obat di unit Farmasi."
        buttonLabel="Koreksi Stok" 
        onButtonClick={() => setIsOpen(true)}
      />

      <KoreksiStokDialog open={isOpen} onOpenChange={setIsOpen} />

      <SearchFilter 
        placeholder="Cari obat..." 
        value={query} 
        onChange={setQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Stok Obat</CardTitle>
        </CardHeader>
        <CardContent>
          <FarmasiStockTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
