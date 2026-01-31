"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { dummyFarmasiSOAP, FarmasiSOAPTable } from "@/components/admin/farmasi/soap/soap-table";

export default function SOAPFarmasiPage() {
  const [query, setQuery] = useState("");
  const filteredData = dummyFarmasiSOAP.filter(s => 
    s.pasien.toLowerCase().includes(query.toLowerCase()) || 
    s.petugas.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="SOAP" 
        description="Kelola SOAP di unit Farmasi."
        buttonLabel="Buat SOAP Baru" 
      />

      <SearchFilter 
        placeholder="Cari pasien atau petugas..." 
        value={query} 
        onChange={setQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Daftar SOAP (Konseling & Verifikasi)</CardTitle>
        </CardHeader>
        <CardContent>
          <FarmasiSOAPTable data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
}
