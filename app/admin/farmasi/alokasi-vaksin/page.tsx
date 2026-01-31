"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { dummyVaksinAllocations, VaksinAllocationTable } from "@/components/admin/farmasi/alokasi-vaksin/alokasi-table";
import { AlokasiVaksinDialog } from "@/components/admin/farmasi/alokasi-vaksin/alokasi-dialog";

export default function AlokasiVaksinPage() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredData = dummyVaksinAllocations.filter(v => 
    v.namaVaksin.toLowerCase().includes(query.toLowerCase()) || 
    v.pasien.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Alokasi Vaksin" 
        description="Kelola alokasi vaksin di unit Farmasi."
        buttonLabel="Alokasi Baru" 
        onButtonClick={() => setIsOpen(true)}
      />

      <AlokasiVaksinDialog open={isOpen} onOpenChange={setIsOpen} />

      <SearchFilter 
        placeholder="Cari vaksin atau pasien..." 
        value={query} 
        onChange={setQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Alokasi Vaksin</CardTitle>
        </CardHeader>
        <CardContent>
          <VaksinAllocationTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
