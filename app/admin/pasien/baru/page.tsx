"use client";

import { useState } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Flag,
  Calendar as CalendarIcon,
  Briefcase,
  GraduationCap,
  Heart,
  Users,
  AlertTriangle,
  ArrowLeft,
  IdCard,
  CreditCard,
  ChevronRight,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewPatientPage() {
  const router = useRouter();
  const [isWNA, setIsWNA] = useState(false);
  const [kategori, setKategori] = useState<"reguler" | "vip">("reguler");
  const [isRedflag, setIsRedflag] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    nama: "",
    gender: "",
    tempatLahir: "",
    tanggalLahir: "",
    hp: "",
    poli: "",
    dokter: "",
    penjamin1: "",
    penjamin2: "",
    penjamin3: "",
    jenisKunjungan: "new", // "new" or "control"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setShowConfirm(true);
  };

  const handleSubmit = () => {
    // Logic to save patient and registration
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
            <h1 className="text-2xl font-bold tracking-tight">Pendaftaran Pasien Baru</h1>
            <p className="text-sm text-muted-foreground">Silakan lengkapi data pasien di bawah ini.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/pasien">Batal</Link>
          </Button>
          <Button className="gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Simpan & Daftarkan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Core Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/10">
            <CardHeader className="bg-primary/5 py-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Identitas Pasien</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap <span className="text-destructive">*</span></Label>
                  <Input id="nama" placeholder="Masukkan nama lengkap sesuai identitas" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Jenis Kelamin <span className="text-destructive">*</span></Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Laki-laki</SelectItem>
                      <SelectItem value="P">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tempat-lahir">Tempat Lahir</Label>
                  <Input id="tempat-lahir" placeholder="Contoh: Jakarta" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggal-lahir">Tanggal Lahir <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input id="tanggal-lahir" type="date" className="pl-9" />
                  </div>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pekerjaan">Pekerjaan</Label>
                  <Input id="pekerjaan" placeholder="Contoh: Karyawan Swasta" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agama">Agama</Label>
                  <Select>
                    <SelectTrigger id="agama">
                      <SelectValue placeholder="Pilih agama" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="islam">Islam</SelectItem>
                      <SelectItem value="kristen">Kristen</SelectItem>
                      <SelectItem value="katolik">Katolik</SelectItem>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="budha">Budha</SelectItem>
                      <SelectItem value="konghucu">Konghucu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status-nikah">Status Nikah</Label>
                  <Select>
                    <SelectTrigger id="status-nikah">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lajang">Lajang</SelectItem>
                      <SelectItem value="menikah">Menikah</SelectItem>
                      <SelectItem value="cerai-hidup">Cerai Hidup</SelectItem>
                      <SelectItem value="cerai-mati">Cerai Mati</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edukasi">Edukasi Terakhir</Label>
                  <Select>
                    <SelectTrigger id="edukasi">
                      <SelectValue placeholder="Pilih pendidikan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sd">SD</SelectItem>
                      <SelectItem value="smp">SMP</SelectItem>
                      <SelectItem value="sma">SMA/SMK</SelectItem>
                      <SelectItem value="d3">Diploma III</SelectItem>
                      <SelectItem value="s1">Sarjana (S1)</SelectItem>
                      <SelectItem value="s2">Magister (S2)</SelectItem>
                      <SelectItem value="s3">Doktor (S3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nip">NIP / NPP (Jika ada)</Label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input id="nip" placeholder="Masukkan NIP atau NPP karyawan" className="pl-9" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-slate-50 py-4 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <CardTitle className="text-base">Alamat & Kontak</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat Jalan</Label>
                <Textarea id="alamat" placeholder="Masukkan alamat lengkap" className="min-h-[80px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provinsi">Provinsi</Label>
                  <Input id="provinsi" placeholder="Provinsi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kota">Kota/Kabupaten</Label>
                  <Input id="kota" placeholder="Kota" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kecamatan">Kecamatan</Label>
                  <Input id="kecamatan" placeholder="Kecamatan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kelurahan">Kelurahan/Desa</Label>
                  <Input id="kelurahan" placeholder="Kelurahan" />
                </div>
              </div>

              <Separator className="my-2" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hp">No. Handphone <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input id="hp" placeholder="08xxxxxxxxxx" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input id="email" type="email" placeholder="example@mail.com" className="pl-9" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referrer">Referrer (Referral)</Label>
                <Input id="referrer" placeholder="Direkomendasikan oleh siapa?" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Status & Category & Emergency */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-slate-50 py-4 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-orange-500" />
                <CardTitle className="text-base">Kategori & Kewarganegaraan</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Kategori Pasien</Label>
                  <div className="flex gap-2">
                    <Button 
                      type="button"
                      variant={kategori === "reguler" ? "default" : "outline"} 
                      className="flex-1"
                      onClick={() => setKategori("reguler")}
                    >
                      Reguler
                    </Button>
                    <Button 
                      type="button"
                      variant={kategori === "vip" ? "warning" as any : "outline"} 
                      className={cn("flex-1", kategori === "vip" && "bg-amber-500 hover:bg-amber-600 text-white")}
                      onClick={() => setKategori("vip")}
                    >
                      <Star className={cn("h-4 w-4 mr-1", kategori === "vip" && "fill-current")} />
                      VIP
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Kewarganegaraan</Label>
                  <Select onValueChange={(value) => setIsWNA(value === "WNA")} defaultValue="WNI">
                    <SelectTrigger>
                      <Globe className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Pilih kewarganegaraan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WNI">WNI (Warga Negara Indonesia)</SelectItem>
                      <SelectItem value="WNA">WNA (Warga Negara Asing)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {!isWNA ? (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <Label htmlFor="ktp">No. KTP (NIK) <span className="text-destructive">*</span></Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input id="ktp" placeholder="Masukkan 16 digit NIK" className="pl-9" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="space-y-2">
                      <Label htmlFor="negara">Negara Asal</Label>
                      <Input id="negara" placeholder="Contoh: Malaysia, USA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passport">No. Passport <span className="text-destructive">*</span></Label>
                      <Input id="passport" placeholder="Masukkan nomor passport" />
                    </div>
                  </div>
                )}
                
                <div className="pt-2">
                  <div 
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer",
                      isRedflag ? "bg-destructive/10 border-destructive text-destructive" : "bg-muted/50 border-input hover:bg-muted"
                    )}
                    onClick={() => setIsRedflag(!isRedflag)}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={cn("h-4 w-4", isRedflag ? "text-destructive" : "text-muted-foreground")} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Status Redflag</span>
                        <span className="text-[11px] opacity-70">Tandai jika pasien butuh perhatian khusus</span>
                      </div>
                    </div>
                    <div className={cn(
                      "h-5 w-10 rounded-full flex items-center p-1 transition-colors",
                      isRedflag ? "bg-destructive" : "bg-input"
                    )}>
                      <div className={cn(
                        "h-3 w-3 rounded-full bg-white transition-transform",
                        isRedflag ? "translate-x-5" : "translate-x-0"
                      )} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-100 dark:border-red-900/30">
            <CardHeader className="bg-red-50 py-4 dark:bg-red-900/10">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-red-500" />
                <CardTitle className="text-base">Kontak Darurat</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergency-nama">Nama Kontak</Label>
                <Input id="emergency-nama" placeholder="Nama orang yang bisa dihubungi" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency-hubungan">Hubungan</Label>
                <Select>
                  <SelectTrigger id="emergency-hubungan">
                    <SelectValue placeholder="Pilih hubungan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orang-tua">Orang Tua</SelectItem>
                    <SelectItem value="suami-istri">Suami / Istri</SelectItem>
                    <SelectItem value="anak">Anak</SelectItem>
                    <SelectItem value="saudara">Saudara Kandung</SelectItem>
                    <SelectItem value="wali">Wali / Kerabat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency-hp">No. Handphone HP</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input id="emergency-hp" placeholder="08xxxxxxxxxx" className="pl-9" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-sm overflow-hidden">
            <CardHeader className="bg-primary/5 py-4 border-b">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <CardTitle className="text-base font-semibold text-primary">Rencana Kunjungan</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="space-y-3">
                <Label>Jenis Kunjungan</Label>
                <RadioGroup 
                  defaultValue="new" 
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
                      <Select>
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
                      <Select>
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
              <Users className="h-5 w-5 text-primary" />
              Konfirmasi Pendaftaran
            </DialogTitle>
            <DialogDescription>
              Silakan periksa kembali data pendaftaran sebelum disimpan ke sistem.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted/30 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Nama Pasien:</span>
              <span className="font-medium text-right">{formData.nama || "-"}</span>
              
              <span className="text-muted-foreground">Poli Tujuan:</span>
              <span className="font-medium text-right capitalize">{formData.poli || "-"}</span>
              
              <span className="text-muted-foreground">Dokter:</span>
              <span className="font-medium text-right">{formData.dokter || "-"}</span>
              
              <span className="text-muted-foreground">Penjamin:</span>
              <span className="font-medium text-right uppercase">{formData.penjamin1 || "-"}</span>
              
              <span className="text-muted-foreground">Jenis Visit:</span>
              <span className="font-medium text-right">
                {formData.jenisKunjungan === "new" ? (
                  <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">Kunjungan Baru</Badge>
                ) : (
                  <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200">Kontrol / Lama</Badge>
                )}
              </span>
            </div>
            
            <Separator />
            
            <div className="flex items-center gap-3 py-1">
              <div className={cn(
                "h-2 w-2 rounded-full",
                kategori === "vip" ? "bg-amber-500" : "bg-blue-500"
              )} />
              <span className="text-xs font-medium uppercase tracking-wider">
                Pasien {kategori} {isRedflag && <span className="text-destructive ml-1">(REDFLAG)</span>}
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


