"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummySuppliers, Supplier } from "@/components/admin/gudang-farmasi/master-supplier/data";
import { SupplierTable } from "@/components/admin/gudang-farmasi/master-supplier/supplier-table";
import { SupplierFormDialog } from "@/components/admin/gudang-farmasi/master-supplier/supplier-form-dialog";

export default function MasterSupplierPage() {
  const [data, setData] = useState<Supplier[]>(dummySuppliers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const handleAdd = () => {
    setSelectedSupplier(null);
    setIsFormOpen(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsFormOpen(true);
  };

  const handleDelete = (supplier: Supplier) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${supplier.namaSupplier}?`)) {
      setData(prev => prev.filter(item => item.id !== supplier.id));
    }
  };

  const saveSupplier = (supplier: Supplier) => {
    if (selectedSupplier && data.find(item => item.id === supplier.id)) {
      // Update existing
      setData(prev => prev.map(item => (item.id === supplier.id ? supplier : item)));
    } else {
      // Add new
      setData(prev => [...prev, supplier]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Master Supplier</h2>
          <p className="text-muted-foreground">
            Kelola data supplier obat dan alat kesehatan.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Data Supplier</CardTitle>
            <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Supplier
            </Button>
        </CardHeader>
        <CardContent>
             <SupplierTable 
                data={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </CardContent>
      </Card>

      <SupplierFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        supplier={selectedSupplier} 
        onSave={saveSupplier} 
      />
    </div>
  );
}
