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
import { Textarea } from "@/components/ui/textarea";

export function PaketObatDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Buat Paket Obat Baru</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nama">Nama Paket</Label>
            <Input id="nama" placeholder="Contoh: Paket Flu Ringan" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea id="deskripsi" placeholder="Deskripsi isi paket..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="harga">Harga Paket (IDR)</Label>
            <Input id="harga" type="number" placeholder="0" />
          </div>
          <div className="grid gap-2">
            <Label>Daftar Obat dlm Paket</Label>
            <div className="p-2 border rounded-md bg-muted/20 min-h-[100px] flex items-center justify-center text-muted-foreground text-sm">
              Klik untuk menambah obat...
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button onClick={() => onOpenChange(false)}>Simpan Paket</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
