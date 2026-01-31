"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, Building2, Tag, Layers, Stethoscope } from "lucide-react";

// Mock master data for specializations
const specializations = [
  "Umum",
  "Gigi & Mulut",
  "Anak (Pediatri)",
  "Kandungan (Obsgyn)",
  "Penyakit Dalam",
  "Mata",
  "THT",
  "Saraf",
  "Kulit & Kelamin",
  "Bedah",
  "Jantung",
  "Gizi",
];

export interface PoliData {
  id?: string;
  nama: string;
  kode: string;
  tipe: string;
  spesialisasi: string[];
}

interface PoliFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PoliData) => void;
  initialData?: PoliData | null;
}

export function PoliFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: PoliFormModalProps) {
  const [formData, setFormData] = useState<PoliData>({
    nama: "",
    kode: "",
    tipe: "reguler",
    spesialisasi: [],
  });

  const [prevOpen, setPrevOpen] = useState(open);
  const [prevInitialData, setPrevInitialData] = useState(initialData);

  if (open !== prevOpen || initialData !== prevInitialData) {
    setPrevOpen(open);
    setPrevInitialData(initialData);
    if (open) {
      setFormData(initialData || {
        nama: "",
        kode: "",
        tipe: "reguler",
        spesialisasi: [],
      });
    }
  }

  const toggleSpecialization = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      spesialisasi: prev.spesialisasi.includes(spec)
        ? prev.spesialisasi.filter((s) => s !== spec)
        : [...prev.spesialisasi, spec],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            {initialData ? "Edit Data Poli" : "Tambah Poli Baru"}
          </DialogTitle>
          <DialogDescription>
            Lengkapi informasi unit poliklinik di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nama" className="flex items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                Nama Poli <span className="text-destructive">*</span>
              </Label>
              <Input
                id="nama"
                placeholder="Contoh: Poli Umum"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kode" className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                Kode Poli <span className="text-destructive">*</span>
              </Label>
              <Input
                id="kode"
                placeholder="Contoh: PL-001"
                value={formData.kode}
                onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipe">Tipe Poli</Label>
            <Select
              value={formData.tipe}
              onValueChange={(value) => setFormData({ ...formData, tipe: value })}
            >
              <SelectTrigger id="tipe">
                <SelectValue placeholder="Pilih tipe poli" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reguler">Reguler</SelectItem>
                <SelectItem value="vip">Executive / VIP</SelectItem>
                <SelectItem value="bpjs">Hanya BPJS</SelectItem>
                <SelectItem value="tindakan">Ruang Tindakan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Stethoscope className="h-3.5 w-3.5 text-muted-foreground" />
              Checklist Spesialisasi Dokter
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {specializations.map((spec) => {
                const isSelected = formData.spesialisasi.includes(spec);
                return (
                  <div
                    key={spec}
                    onClick={() => toggleSpecialization(spec)}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md border text-xs cursor-pointer transition-all active:scale-95",
                      isSelected
                        ? "bg-primary/10 border-primary text-primary font-medium"
                        : "bg-background border-input hover:bg-muted"
                    )}
                  >
                    <span className="truncate mr-1">{spec}</span>
                    <div
                      className={cn(
                        "h-4 w-4 rounded border flex items-center justify-center shrink-0",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-input"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Pilih satu atau lebih spesialisasi yang tersedia di poli ini.
            </p>
          </div>

          <DialogFooter className="sticky bottom-0 bg-background pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit">
              {initialData ? "Simpan Perubahan" : "Simpan Poli"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
