"use client";

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

export function PermintaanGudangDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Permintaan ke Gudang</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="unit">Unit Peminta</Label>
            <Input id="unit" defaultValue="Farmasi Rawat Jalan" readOnly />
          </div>
          <div className="grid gap-2">
            <Label>Daftar Barang (Pencarian)</Label>
            <Input placeholder="Cari obat dari gudang utama..." />
          </div>
          <div className="p-2 border rounded-md bg-muted/20 min-h-[80px] text-xs text-muted-foreground italic flex items-center justify-center">
            Pilih item melalui pencarian di atas...
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button onClick={() => onOpenChange(false)}>Kirim Permintaan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
