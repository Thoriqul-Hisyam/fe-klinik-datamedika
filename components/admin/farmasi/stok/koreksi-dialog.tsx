"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FarmasiStock } from "./stok-table";

interface KoreksiStokDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStock?: FarmasiStock;
}

export function KoreksiStokDialog({ open, onOpenChange, selectedStock }: KoreksiStokDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Koreksi Stok - {selectedStock?.nama || "Pilih Obat"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="stok-jual">Stok Jual Baru</Label>
            <Input id="stok-jual" type="number" defaultValue={selectedStock?.stokJual} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="alasan">Alasan Koreksi</Label>
            <Input id="alasan" placeholder="Contoh: Barang rusak, salah input" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button onClick={() => onOpenChange(false)}>Simpan Perubahan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
