"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Obat, TipeHarga, TipeBarang, StatusObat, BooleanString } from "./data";

interface ObatFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  obat?: Obat | null; // If null, it's add mode
  onSave: (obat: Obat) => void;
}

const emptyObat: Obat = {
  id: "",
  kodeObat: "",
  namaObat: "",
  kfa: "",
  namaAlias: "",
  hargaBeli: 0,
  tipeHarga: "Default",
  tipeBarang: "Obat",
  jenisObat: "",
  satuanJual: "",
  zatAktif: "",
  isiDosis: "",
  ukuranDosis: "",
  formulariumNasional: "Tidak",
  formulariumRS: "Tidak",
  manufaktur: "",
  status: "Show"
};

export function ObatFormDialog({ open, onOpenChange, obat, onSave }: ObatFormDialogProps) {
  const [formData, setFormData] = useState<Obat>(emptyObat);

  const [prevOpen, setPrevOpen] = useState(open);
  const [prevObat, setPrevObat] = useState(obat);

  if (open !== prevOpen || obat !== prevObat) {
    setPrevOpen(open);
    setPrevObat(obat);
    if (open) {
      if (obat) {
        setFormData(obat);
      } else {
        setFormData({ ...emptyObat, id: Math.random().toString(36).substring(2, 11) });
      }
    }
  }

  const handleChange = <K extends keyof Obat>(field: K, value: Obat[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{obat ? "Edit Obat" : "Tambah Obat Baru"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="kodeObat">Kode Obat</Label>
            <Input id="kodeObat" value={formData.kodeObat} onChange={e => handleChange("kodeObat", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="namaObat">Nama Obat</Label>
            <Input id="namaObat" value={formData.namaObat} onChange={e => handleChange("namaObat", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kfa">KFA</Label>
            <Input id="kfa" value={formData.kfa} onChange={e => handleChange("kfa", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="namaAlias">Nama Alias</Label>
            <Input id="namaAlias" value={formData.namaAlias || ""} onChange={e => handleChange("namaAlias", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hargaBeli">Harga Beli</Label>
            <Input 
              id="hargaBeli" 
              type="number" 
              value={formData.hargaBeli} 
              onChange={e => handleChange("hargaBeli", parseFloat(e.target.value) || 0)} 
            />
          </div>
          <div className="space-y-2">
            <Label>Tipe Harga</Label>
            <Select value={formData.tipeHarga} onValueChange={(v) => handleChange("tipeHarga", v as TipeHarga)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">Default</SelectItem>
                <SelectItem value="Fix">Fix</SelectItem>
                <SelectItem value="Persentase">Persentase</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Conditional Price Fields could go here, but prompt separates them into 'Edit Set Price'. 
              I'll include basic numeric fields if needed, but per requirements CRUD lists basic fields.
              I will add Tipe Barang etc.
          */}
           <div className="space-y-2">
            <Label>Tipe Barang</Label>
            <Select value={formData.tipeBarang} onValueChange={(v) => handleChange("tipeBarang", v as TipeBarang)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Obat">Obat</SelectItem>
                <SelectItem value="Alkes">Alkes</SelectItem>
                <SelectItem value="BMHP">BMHP</SelectItem>
                <SelectItem value="Selain Obat">Selain Obat</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="space-y-2">
            <Label htmlFor="jenisObat">Jenis Obat</Label>
            <Input id="jenisObat" value={formData.jenisObat} onChange={e => handleChange("jenisObat", e.target.value)} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="satuanJual">Satuan Jual</Label>
            <Input id="satuanJual" value={formData.satuanJual} onChange={e => handleChange("satuanJual", e.target.value)} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="zatAktif">Zat Aktif</Label>
            <Input id="zatAktif" value={formData.zatAktif || ""} onChange={e => handleChange("zatAktif", e.target.value)} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="isiDosis">Isi Dosis</Label>
            <Input id="isiDosis" value={formData.isiDosis || ""} onChange={e => handleChange("isiDosis", e.target.value)} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="ukuranDosis">Ukuran Dosis</Label>
            <Input id="ukuranDosis" value={formData.ukuranDosis || ""} onChange={e => handleChange("ukuranDosis", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Formularium Nasional</Label>
            <Select value={formData.formulariumNasional} onValueChange={(v) => handleChange("formulariumNasional", v as BooleanString)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ya">Ya</SelectItem>
                <SelectItem value="Tidak">Tidak</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Formularium RS</Label>
            <Select value={formData.formulariumRS} onValueChange={(v) => handleChange("formulariumRS", v as BooleanString)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ya">Ya</SelectItem>
                <SelectItem value="Tidak">Tidak</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="manufaktur">Manufaktur</Label>
            <Input id="manufaktur" value={formData.manufaktur || ""} onChange={e => handleChange("manufaktur", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(v) => handleChange("status", v as StatusObat)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Show">Show</SelectItem>
                <SelectItem value="Hide">Hide</SelectItem>
              </SelectContent>
            </Select>
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
