"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { dummyRequisitions, RequisitionTable } from "@/components/admin/farmasi/permintaan-gudang/permintaan-table";
import { PermintaanGudangDialog } from "@/components/admin/farmasi/permintaan-gudang/permintaan-dialog";

export default function PermintaanGudangPage() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredData = dummyRequisitions.filter(r => 
    r.noPermintaan.toLowerCase().includes(query.toLowerCase()) || 
    r.unitAsal.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Permintaan ke Gudang" 
        description="Kelola permintaan stok ke gudang."
        buttonLabel="Buat Permintaan" 
        onButtonClick={() => setIsOpen(true)}
      />

      <PermintaanGudangDialog open={isOpen} onOpenChange={setIsOpen} />

      <SearchFilter 
        placeholder="Cari nomor permintaan atau unit..." 
        value={query} 
        onChange={setQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Daftar Permintaan</CardTitle>
        </CardHeader>
        <CardContent>
          <RequisitionTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
