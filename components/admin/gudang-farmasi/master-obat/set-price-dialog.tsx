"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Obat, TipeHarga } from "./data";

interface SetPriceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  obat: Obat | null;
  onSave: (updatedObat: Obat) => void;
}

export function SetPriceDialog({ open, onOpenChange, obat, onSave }: SetPriceDialogProps) {
  const [tipeHarga, setTipeHarga] = useState<TipeHarga>("Default");
  const [hargaJualFix, setHargaJualFix] = useState<string>("");
  const [marginPersentase, setMarginPersentase] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");

  useEffect(() => {
    if (obat) {
      setTipeHarga(obat.tipeHarga);
      setHargaJualFix(obat.hargaJualFix?.toString() || "");
      setMarginPersentase(obat.marginPersentase?.toString() || "");
      setStatus(obat.status === "Show" ? "Active" : "Nonaktif");
    }
  }, [obat]);

  const handleSave = () => {
    if (!obat) return;

    const updated: Obat = {
      ...obat,
      tipeHarga,
      hargaJualFix: tipeHarga === "Fix" ? parseFloat(hargaJualFix) : undefined,
      marginPersentase: tipeHarga === "Persentase" ? parseFloat(marginPersentase) : undefined,
      status: status === "Active" ? "Show" : "Hide"
    };

    onSave(updated);
    onOpenChange(false);
  };

  if (!obat) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Set Price Obat</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="kode" className="text-right">
              Kode Obat
            </Label>
            <Input id="kode" value={obat.kodeObat} disabled className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nama" className="text-right">
              Nama Obat
            </Label>
            <Input id="nama" value={obat.namaObat} disabled className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hargaBeli" className="text-right">
              Harga Beli
            </Label>
            <Input 
              id="hargaBeli" 
              value={new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(obat.hargaBeli)} 
              disabled 
              className="col-span-3" 
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">Tipe Harga</Label>
            <RadioGroup 
              value={tipeHarga} 
              onValueChange={(v) => setTipeHarga(v as TipeHarga)}
              className="col-span-3 flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Default" id="r1" />
                <Label htmlFor="r1">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Fix" id="r2" />
                <Label htmlFor="r2">Fix</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Persentase" id="r3" />
                <Label htmlFor="r3">Persentase</Label>
              </div>
            </RadioGroup>
          </div>

          {tipeHarga === "Fix" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fixPrice" className="text-right">
                Harga Jual (Rp)
              </Label>
              <Input 
                id="fixPrice" 
                type="number"
                value={hargaJualFix}
                onChange={(e) => setHargaJualFix(e.target.value)}
                className="col-span-3" 
                placeholder="0"
              />
            </div>
          )}

          {tipeHarga === "Persentase" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="margin" className="text-right">
                Margin (%)
              </Label>
              <Input 
                id="margin" 
                type="number"
                value={marginPersentase}
                onChange={(e) => setMarginPersentase(e.target.value)}
                className="col-span-3" 
                placeholder="0"
              />
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Nonaktif">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Simpan Perubahan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
