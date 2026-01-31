"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { dummyObat, Obat } from "@/components/admin/gudang-farmasi/master-obat/data";
import { ObatTable } from "@/components/admin/gudang-farmasi/master-obat/obat-table";
import { ObatFormDialog } from "@/components/admin/gudang-farmasi/master-obat/obat-form-dialog";
import { SetPriceDialog } from "@/components/admin/gudang-farmasi/master-obat/set-price-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MasterObatPage() {
  const [data, setData] = useState<Obat[]>(dummyObat);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [selectedObat, setSelectedObat] = useState<Obat | null>(null);

  const handleAdd = () => {
    setSelectedObat(null);
    setIsFormOpen(true);
  };

  const handleEdit = (obat: Obat) => {
    setSelectedObat(obat);
    setIsFormOpen(true);
  };

  const handleDelete = (obat: Obat) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${obat.namaObat}?`)) {
      setData(prev => prev.filter(item => item.id !== obat.id));
    }
  };

  const handleSetPrice = (obat: Obat) => {
    setSelectedObat(obat);
    setIsPriceOpen(true);
  };

  const saveObat = (obat: Obat) => {
    if (selectedObat && data.find(item => item.id === obat.id)) {
      // Update existing
      setData(prev => prev.map(item => (item.id === obat.id ? obat : item)));
    } else {
      // Add new
      setData(prev => [...prev, obat]);
    }
    // Close dialog implies success
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Master Obat</h2>
          <p className="text-muted-foreground">
            Kelola data obat, update harga, dan pencarian KFA.
          </p>
        </div>
        <div className="flex items-center space-x-2">
            {/* Action buttons could go here */}
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Data Obat</CardTitle>
            <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Obat
            </Button>
        </CardHeader>
        <CardContent>
             <ObatTable 
                data={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSetPrice={handleSetPrice}
            />
        </CardContent>
      </Card>

      <ObatFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        obat={selectedObat} 
        onSave={saveObat} 
      />

      <SetPriceDialog
        open={isPriceOpen}
        onOpenChange={setIsPriceOpen}
        obat={selectedObat}
        onSave={saveObat}
      />
    </div>
  );
}
