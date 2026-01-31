"use client";

import { useState, useEffect, useRef } from "react";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  User, 
  Stethoscope, 
  Phone, 
  IdCard, 
  Key, 
  Camera, 
  Image as ImageIcon, 
  PenTool,
  Check,
  X,
  Activity,
  PhoneCall
} from "lucide-react";

export interface DoctorData {
  id?: string;
  nama: string;
  spesialis: string;
  namaDisplay: string;
  jabatanDisplay: string;
  nip: string;
  telp: string;
  keyword: string;
  status: "aktif" | "nonaktif";
  operasi: boolean;
  onCall: boolean;
  foto?: string;
  thumbnail?: string;
  tandaTangan?: string;
}

interface DoctorFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: DoctorData) => void;
  initialData?: DoctorData | null;
}

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
];

export function DoctorFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: DoctorFormModalProps) {
  const [formData, setFormData] = useState<DoctorData>({
    nama: "",
    spesialis: "Umum",
    namaDisplay: "",
    jabatanDisplay: "",
    nip: "",
    telp: "",
    keyword: "",
    status: "aktif",
    operasi: false,
    onCall: false,
  });

  const [files, setFiles] = useState<{
    foto: File | null;
    thumbnail: File | null;
    tandaTangan: File | null;
  }>({
    foto: null,
    thumbnail: null,
    tandaTangan: null,
  });

  const [prevOpen, setPrevOpen] = useState(open);
  const [prevInitialData, setPrevInitialData] = useState(initialData);

  if (open !== prevOpen || initialData !== prevInitialData) {
    setPrevOpen(open);
    setPrevInitialData(initialData);
    if (open) {
      setFormData(initialData || {
        nama: "",
        spesialis: "Umum",
        namaDisplay: "",
        jabatanDisplay: "",
        nip: "",
        telp: "",
        keyword: "",
        status: "aktif",
        operasi: false,
        onCall: false,
      });
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  const handleFileChange = (field: keyof typeof files, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            {initialData ? "Edit Data Dokter" : "Tambah Dokter Baru"}
          </DialogTitle>
          <DialogDescription>
            Masukkan informasi detail dokter dan unggah berkas yang diperlukan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap Dokter <span className="text-destructive">*</span></Label>
              <Input
                id="nama"
                placeholder="Contoh: dr. Ahmad Subarjo"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spesialis">Spesialisasi <span className="text-destructive">*</span></Label>
              <Select
                value={formData.spesialis}
                onValueChange={(value) => setFormData({ ...formData, spesialis: value })}
              >
                <SelectTrigger id="spesialis">
                  <SelectValue placeholder="Pilih spesialisasi" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="namaDisplay">Nama Display (Gelar)</Label>
              <Input
                id="namaDisplay"
                placeholder="Contoh: dr. Ahmad S."
                value={formData.namaDisplay}
                onChange={(e) => setFormData({ ...formData, namaDisplay: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jabatanDisplay">Jabatan Display</Label>
              <Input
                id="jabatanDisplay"
                placeholder="Contoh: Dokter Spesialis Anak"
                value={formData.jabatanDisplay}
                onChange={(e) => setFormData({ ...formData, jabatanDisplay: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nip">NIP / No. Registrasi</Label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="nip"
                  className="pl-9"
                  placeholder="Masukkan NIP"
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="telp">No. Telepon <span className="text-destructive">*</span></Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="telp"
                  className="pl-9"
                  placeholder="0812xxxx"
                  value={formData.telp}
                  onChange={(e) => setFormData({ ...formData, telp: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyword">Keyword Search</Label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="keyword"
                className="pl-9"
                placeholder="Contoh: anak, pediatric, gigi"
                value={formData.keyword}
                onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
              />
            </div>
          </div>

          <Separator />

          {/* File Uploads Section */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold">Dokumen & Foto</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Foto Utama</Label>
                <div 
                  className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden h-32"
                  onClick={() => document.getElementById('foto-upload')?.click()}
                >
                  {files.foto ? (
                    <div className="text-center">
                      <Check className="h-6 w-6 text-green-500 mx-auto" />
                      <span className="text-[10px] truncate max-w-[100px] block">{files.foto.name}</span>
                    </div>
                  ) : (
                    <>
                      <Camera className="h-6 w-6 text-muted-foreground" />
                      <span className="text-[10px] text-center">Pilih Foto</span>
                    </>
                  )}
                  <input id="foto-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange('foto', e)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Thumbnail</Label>
                <div 
                  className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden h-32"
                  onClick={() => document.getElementById('thumb-upload')?.click()}
                >
                  {files.thumbnail ? (
                    <div className="text-center">
                      <Check className="h-6 w-6 text-green-500 mx-auto" />
                      <span className="text-[10px] truncate max-w-[100px] block">{files.thumbnail.name}</span>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      <span className="text-[10px] text-center">Pilih Thumb</span>
                    </>
                  )}
                  <input id="thumb-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange('thumbnail', e)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Tanda Tangan</Label>
                <div 
                  className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden h-32"
                  onClick={() => document.getElementById('ttd-upload')?.click()}
                >
                  {files.tandaTangan ? (
                    <div className="text-center">
                      <Check className="h-6 w-6 text-green-500 mx-auto" />
                      <span className="text-[10px] truncate max-w-[100px] block">{files.tandaTangan.name}</span>
                    </div>
                  ) : (
                    <>
                      <PenTool className="h-6 w-6 text-muted-foreground" />
                      <span className="text-[10px] text-center">Pilih TTD</span>
                    </>
                  )}
                  <input id="ttd-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange('tandaTangan', e)} />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Status & Options */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold">Status & Pengaturan Operasional</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Status Aktif</span>
                  <span className="text-[11px] text-muted-foreground">Tentukan apakah dokter aktif berpraktek</span>
                </div>
                <div 
                  className={cn(
                    "w-12 h-6 rounded-full relative cursor-pointer transition-colors p-1",
                    formData.status === "aktif" ? "bg-green-500" : "bg-muted"
                  )}
                  onClick={() => setFormData(prev => ({ ...prev, status: prev.status === "aktif" ? "nonaktif" : "aktif" }))}
                >
                  <div className={cn("w-4 h-4 rounded-full bg-white transition-all shadow-sm", formData.status === "aktif" ? "translate-x-6" : "translate-x-0")} />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500/10 rounded-md text-blue-600">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Menangani Operasi</span>
                    <span className="text-[11px] text-muted-foreground">Aktifkan jika dokter melakukan tindakan bedah</span>
                  </div>
                </div>
                <div 
                  className={cn(
                    "w-12 h-6 rounded-full relative cursor-pointer transition-colors p-1",
                    formData.operasi ? "bg-primary" : "bg-muted"
                  )}
                  onClick={() => setFormData(prev => ({ ...prev, operasi: !prev.operasi }))}
                >
                  <div className={cn("w-4 h-4 rounded-full bg-white transition-all shadow-sm", formData.operasi ? "translate-x-6" : "translate-x-0")} />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 rounded-md text-amber-600">
                    <PhoneCall className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Layanan On Call</span>
                    <span className="text-[11px] text-muted-foreground">Status ketersediaan panggilan darurat</span>
                  </div>
                </div>
                <div 
                  className={cn(
                    "w-12 h-6 rounded-full relative cursor-pointer transition-colors p-1",
                    formData.onCall ? "bg-amber-500" : "bg-muted"
                  )}
                  onClick={() => setFormData(prev => ({ ...prev, onCall: !prev.onCall }))}
                >
                  <div className={cn("w-4 h-4 rounded-full bg-white transition-all shadow-sm", formData.onCall ? "translate-x-6" : "translate-x-0")} />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-background pt-4 border-t gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batalkan
            </Button>
            <Button type="submit">
              {initialData ? "Simpan Perubahan" : "Daftarkan Dokter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
