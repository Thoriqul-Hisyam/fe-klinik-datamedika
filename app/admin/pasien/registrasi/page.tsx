"use client";

import { useState } from "react";
import {
  Search,
  User,
  Calendar as CalendarIcon,
  Stethoscope,
  Building2,
  CreditCard,
  ArrowLeft,
  Save,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock data for existing patients
const mockPatients = [
  { id: "P001", noRM: "RM-2024-001", nama: "Ahmad Rizki", nik: "3201234567890001", gender: "L", tglLahir: "1990-05-15" },
  { id: "P002", noRM: "RM-2024-015", nama: "Siti Nurhaliza", nik: "3201234567890002", gender: "P", tglLahir: "1995-08-22" },
  { id: "P003", noRM: "RM-2024-023", nama: "Dewi Lestari", nik: "3201234567890003", gender: "P", tglLahir: "1988-12-10" },
];

export default function ExistingPatientRegistration() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Form State
  const [visitData, setVisitData] = useState({
    poli: "",
    dokter: "",
    penjamin1: "",
    penjamin2: "",
    penjamin3: "",
    jenisKunjungan: "control", // Default to control for existing as requested (control or new)
  });

  const handleInputChange = (field: string, value: string) => {
    setVisitData(prev => ({ ...prev, [field]: value }));
  };

  const filteredPatients = mockPatients.filter(p => 
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.noRM.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.nik.includes(searchTerm)
  );

  const handleSelectPatient = (patient: typeof mockPatients[0]) => {
    setSelectedPatient(patient);
    setSearchTerm("");
  };

  const handleSave = () => {
    if (!selectedPatient || !visitData.poli || !visitData.dokter || !visitData.penjamin1) {
      alert("Mohon lengkapi poli, dokter, dan penjamin utama.");
      return;
    }
    setShowConfirm(true);
  };

  const handleSubmit = () => {
    setShowConfirm(false);
    router.push("/admin/pasien");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/pasien">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pendaftaran Pasien Terdaftar</h1>
            <p className="text-sm text-muted-foreground">Cari dan daftarkan kunjungan pasien lama.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/pasien">Batal</Link>
          </Button>
          <Button 
            className="gap-2" 
            disabled={!selectedPatient}
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            Simpan & Daftarkan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Patient Search & Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="bg-slate-50 py-3 border-b dark:bg-slate-900/50">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" />
                Cari Pasien
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Nama / No. RM / NIK" 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {searchTerm && (
                <div className="border rounded-md divide-y overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map(p => (
                      <div 
                        key={p.id}
                        className="p-3 hover:bg-muted cursor-pointer transition-colors flex flex-col gap-1"
                        onClick={() => handleSelectPatient(p)}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-sm">{p.nama}</span>
                          <span className="text-[10px] font-mono bg-primary/10 text-primary px-1.5 rounded">{p.noRM}</span>
                        </div>
                        <span className="text-xs text-muted-foreground italic">NIK: {p.nik}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-muted-foreground">Tidak ditemukan</div>
                  )}
                </div>
              )}

              {selectedPatient && (
                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{selectedPatient.nama}</h3>
                      <p className="text-xs text-muted-foreground">{selectedPatient.noRM}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Jenis Kelamin:</span>
                      <span className="font-medium">{selectedPatient.gender === "L" ? "Laki-laki" : "Perempuan"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tgl Lahir:</span>
                      <span className="font-medium">{selectedPatient.tglLahir}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Kategori:</span>
                      <Badge variant="outline" className="text-[10px] h-4">Umum</Badge>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 h-7 text-[10px] text-destructive hover:bg-destructive/10"
                    onClick={() => setSelectedPatient(null)}
                  >
                    Ganti Pasien
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Visit Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className={cn(!selectedPatient && "opacity-50 pointer-events-none")}>
            <CardHeader className="bg-slate-50 py-4 border-b dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <CardTitle className="text-base font-semibold">Rencana Kunjungan</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="space-y-3">
                <Label>Jenis Kunjungan</Label>
                <RadioGroup 
                  defaultValue="control" 
                  className="flex gap-4"
                  onValueChange={(v: string) => handleInputChange("jenisKunjungan", v)}
                >
                  <div className="flex items-center space-x-2 bg-muted/30 px-3 py-2 rounded-md border flex-1 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="new" id="new-visit" />
                    <Label htmlFor="new-visit" className="cursor-pointer font-medium">Kunjungan Baru</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-muted/30 px-3 py-2 rounded-md border flex-1 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="control" id="control-visit" />
                    <Label htmlFor="control-visit" className="cursor-pointer font-medium">Kontrol / Lama</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visit-poli">Pilih Poli <span className="text-destructive">*</span></Label>
                  <Select onValueChange={(v: string) => handleInputChange("poli", v)}>
                    <SelectTrigger id="visit-poli">
                      <SelectValue placeholder="Pilih poli tujuan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="umum">Poli Umum</SelectItem>
                      <SelectItem value="gigi">Poli Gigi</SelectItem>
                      <SelectItem value="anak">Poli Anak</SelectItem>
                      <SelectItem value="kandungan">Poli Kandungan</SelectItem>
                      <SelectItem value="dalam">Poli Penyakit Dalam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visit-dokter">Dokter <span className="text-destructive">*</span></Label>
                  <Select onValueChange={(v: string) => handleInputChange("dokter", v)}>
                    <SelectTrigger id="visit-dokter">
                      <SelectValue placeholder="Pilih dokter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-sarah">dr. Sarah Amalia</SelectItem>
                      <SelectItem value="dr-budi">dr. Budi Santoso</SelectItem>
                      <SelectItem value="dr-rina">dr. Rina Wijaya, Sp.A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Metode Penjamin / Pembayaran
                </Label>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="penjamin-1" className="text-xs text-muted-foreground">Penjamin Utama (1)</Label>
                    <Select onValueChange={(v: string) => handleInputChange("penjamin1", v)}>
                      <SelectTrigger id="penjamin-1">
                        <SelectValue placeholder="Pilih penjamin utama" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="umum">Umum / Pribadi</SelectItem>
                        <SelectItem value="bpjs">BPJS Kesehatan</SelectItem>
                        <SelectItem value="asuransi-a">Asuransi Mandiri</SelectItem>
                        <SelectItem value="asuransi-b">Asuransi Prudential</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="penjamin-2" className="text-xs text-muted-foreground">Penjamin 2</Label>
                      <Select onValueChange={(v: string) => handleInputChange("penjamin2", v)}>
                        <SelectTrigger id="penjamin-2">
                          <SelectValue placeholder="Opsional" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Tidak ada</SelectItem>
                          <SelectItem value="asuransi-a">Asuransi Tambahan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="penjamin-3" className="text-xs text-muted-foreground">Penjamin 3</Label>
                      <Select onValueChange={(v: string) => handleInputChange("penjamin3", v)}>
                        <SelectTrigger id="penjamin-3">
                          <SelectValue placeholder="Opsional" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Tidak ada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Konfirmasi Pendaftaran
            </DialogTitle>
            <DialogDescription>
              Mohon verifikasi data pendaftaran kunjungan berikut.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted/30 rounded-lg p-4 space-y-4">
            <div className="flex flex-col gap-1 items-center justify-center py-2 border-b border-muted">
               <span className="text-xs text-muted-foreground uppercase tracking-widest">Pasien Terdaftar</span>
               <span className="font-bold text-lg">{selectedPatient?.nama}</span>
               <span className="text-xs font-mono bg-primary/10 text-primary px-2 rounded-full">{selectedPatient?.noRM}</span>
            </div>

            <div className="grid grid-cols-2 gap-y-3 text-sm pt-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                <span>Poli:</span>
              </div>
              <span className="font-medium text-right capitalize">{visitData.poli}</span>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Stethoscope className="h-3.5 w-3.5" />
                <span>Dokter:</span>
              </div>
              <span className="font-medium text-right">{visitData.dokter}</span>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-3.5 w-3.5" />
                <span>Penjamin 1:</span>
              </div>
              <span className="font-medium text-right uppercase">{visitData.penjamin1}</span>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Jenis Kunjungan:</span>
              </div>
              <span className="font-medium text-right">
                {visitData.jenisKunjungan === "new" ? (
                  <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">Kunjungan Baru</Badge>
                ) : (
                  <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200">Kontrol / Lama</Badge>
                )}
              </span>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Ubah Data
            </Button>
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
              Konfirmasi & Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
