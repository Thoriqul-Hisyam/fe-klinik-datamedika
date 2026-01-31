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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AlokasiVaksinDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alokasi Vaksin Baru</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="vaksin">Pilih Vaksin</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Vaksin..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sinovac">Sinovac</SelectItem>
                <SelectItem value="astra">AstraZeneca</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pasien">Nama Pasien</Label>
            <Input id="pasien" placeholder="Masukkan nama pasien" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jumlah">Jumlah</Label>
            <Input id="jumlah" type="number" defaultValue={1} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button onClick={() => onOpenChange(false)}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
