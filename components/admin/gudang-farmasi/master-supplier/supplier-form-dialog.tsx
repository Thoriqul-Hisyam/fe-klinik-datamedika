"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Supplier } from "./data";

interface SupplierFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier?: Supplier | null;
  onSave: (supplier: Supplier) => void;
}

const emptySupplier: Supplier = {
  id: "",
  namaSupplier: "",
  alamat: "",
  telp: ""
};

export function SupplierFormDialog({ open, onOpenChange, supplier, onSave }: SupplierFormDialogProps) {
  const [formData, setFormData] = useState<Supplier>(emptySupplier);

  useEffect(() => {
    if (open) {
      if (supplier) {
        setFormData(supplier);
      } else {
        setFormData({ ...emptySupplier, id: Math.random().toString(36).substr(2, 9) });
      }
    }
  }, [open, supplier]);

  const handleChange = (field: keyof Supplier, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.namaSupplier || !formData.alamat) {
      alert("Nama Supplier dan Alamat wajib diisi.");
      return;
    }
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{supplier ? "Edit Supplier" : "Tambah Supplier Baru"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nama" className="text-right">
              Nama Supplier *
            </Label>
            <Input 
              id="nama" 
              value={formData.namaSupplier} 
              onChange={e => handleChange("namaSupplier", e.target.value)} 
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="alamat" className="text-right mt-2">
              Alamat *
            </Label>
            <Textarea 
              id="alamat" 
              value={formData.alamat} 
              onChange={e => handleChange("alamat", e.target.value)} 
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="telp" className="text-right">
              No. Telp
            </Label>
            <Input 
              id="telp" 
              value={formData.telp} 
              onChange={e => handleChange("telp", e.target.value)} 
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button onClick={handleSave}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
