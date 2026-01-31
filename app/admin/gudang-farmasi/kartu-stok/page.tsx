"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { dummyStocks } from "@/components/admin/gudang-farmasi/stok/data";
import { dummyMovements } from "@/components/admin/gudang-farmasi/kartu-stok/data";
import { StockLedger } from "@/components/admin/gudang-farmasi/kartu-stok/ledger-table";

export default function KartuStokPage() {
  const [selectedObat, setSelectedObat] = useState<string>("");

  const movements = selectedObat ? dummyMovements[selectedObat] || [] : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Kartu Stok</h2>
        <p className="text-muted-foreground">
          Histori mutasi stok obat secara detail.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Pencarian</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3 space-y-2">
            <Label htmlFor="obat">Pilih Obat</Label>
            <Select value={selectedObat} onValueChange={setSelectedObat}>
              <SelectTrigger id="obat">
                <SelectValue placeholder="Pilih Obat..." />
              </SelectTrigger>
              <SelectContent>
                {dummyStocks.map(s => (
                  <SelectItem key={s.kodeObat} value={s.kodeObat}>
                    {s.kodeObat} - {s.namaObat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Date range picker would be nice here in a real app */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Mutasi Stok</CardTitle>
        </CardHeader>
        <CardContent>
          <StockLedger data={movements} />
        </CardContent>
      </Card>
    </div>
  );
}
