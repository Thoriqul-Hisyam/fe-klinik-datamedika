"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { dummyPaketObat, PaketObatTable } from "@/components/admin/farmasi/paket-obat/paket-table";
import { PaketObatDialog } from "@/components/admin/farmasi/paket-obat/paket-dialog";

export default function PaketObatPage() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredData = dummyPaketObat.filter(p => 
    p.namaPaket.toLowerCase().includes(query.toLowerCase()) || 
    p.deskripsi.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Paket Obat" 
        description="Kelola paket obat di unit Farmasi."
        buttonLabel="Paket Baru" 
        onButtonClick={() => setIsOpen(true)}
      />

      <PaketObatDialog open={isOpen} onOpenChange={setIsOpen} />

      <SearchFilter 
        placeholder="Cari paket..." 
        value={query} 
        onChange={setQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Paket Obat</CardTitle>
        </CardHeader>
        <CardContent>
          <PaketObatTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
