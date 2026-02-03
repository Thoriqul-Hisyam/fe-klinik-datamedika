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
  Printer,
  FileText,
  Activity,
  CreditCard as CardIcon,
  Mic,
  Repeat,
  RotateCw,
  Edit,
  History,
  Filter,
  UserPlus,
  UserCheck,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Flag,
  Briefcase,
  GraduationCap,
  Heart,
  AlertTriangle,
  IdCard,
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

// Mock data for existing patients
const mockPatients = [
  { 
    id: "P001", 
    noRM: "RM-2024-001", 
    nama: "Ahmad Rizki", 
    nik: "3201234567890001", 
    gender: "L", 
    tglLahir: "1990-05-15", 
    tempatLahir: "Jakarta",
    bpjs: "0001234567891",
    hp: "081234567890",
    alamat: "Jl. Merdeka No. 10",
    provinsi: "DKI Jakarta",
    kota: "Jakarta Pusat",
    kecamatan: "Menteng",
    kelurahan: "Cikini",
    agama: "islam",
    statusNikah: "menikah",
    pekerjaan: "Karyawan Swasta",
    kategori: "umum",
    kategoriPasien: "reguler",
    history: [
      { date: "2024-01-15", poli: "Poli Umum", dokter: "dr. Budi Santoso" },
      { date: "2023-11-20", poli: "Poli Gigi", dokter: "drg. Ratna Sari" },
    ]
  },
  { 
    id: "P002", 
    noRM: "RM-2024-015", 
    nama: "Siti Nurhaliza", 
    nik: "3201234567890002", 
    gender: "P", 
    tglLahir: "1995-08-22",
    tempatLahir: "Bandung", 
    bpjs: "0001234567892",
    hp: "081987654321",
    alamat: "Jl. Sudirman No. 45",
    provinsi: "DKI Jakarta",
    kota: "Jakarta Selatan",
    kecamatan: "Kebayoran Baru",
    kelurahan: "Senayan",
    agama: "islam",
    statusNikah: "lajang",
    kategori: "bpjs",
    kategoriPasien: "reguler",
    history: [
      { date: "2024-01-10", poli: "Poli Kandungan", dokter: "dr. Sarah Amalia" },
    ]
  },
];

const medicalData = {
  poli: [
    { id: "umum", name: "Poli Umum" },
    { id: "gigi", name: "Poli Gigi" },
    { id: "anak", name: "Poli Anak" },
    { id: "kandungan", name: "Poli Kandungan" },
    { id: "dalam", name: "Poli Penyakit Dalam" },
  ],
  dokter: [
    { id: "dr-sarah", name: "dr. Sarah Amalia" },
    { id: "dr-budi", name: "dr. Budi Santoso" },
    { id: "dr-rina", name: "dr. Rina Wijaya, Sp.A" },
  ],
  penjamin: [
    { id: "umum", name: "Umum / Pribadi" },
    { id: "bpjs", name: "BPJS Kesehatan" },
    { id: "asuransi-a", name: "Asuransi Mandiri" },
    { id: "asuransi-b", name: "Asuransi Prudential" },
    { id: "none", name: "Tidak Ada" },
  ]
};

// Queue Mock Data
const queueData = {
  current: "A-015",
  remaining: 3,
  loket: "01",
  todayPatients: [
    { noRM: "RM-2024-015", nama: "Siti Nurhaliza", poli: "Poli Kandungan", status: "waiting" },
    { noRM: "RM-2024-001", nama: "Ahmad Rizki", poli: "Poli Umum", status: "completed" },
    { noRM: "RM-2024-030", nama: "Budi Santoso", poli: "Poli Gigi", status: "processing" },
  ]
};

export default function UnifiedRegistrationPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"new" | "old">("old");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  
  // Extra states for category
  const [isWNA, setIsWNA] = useState(false);
  const [kategoriPasien, setKategoriPasien] = useState<"reguler" | "vip">("reguler");
  const [isRedflag, setIsRedflag] = useState(false);

  // Consolidated Form State (Expanded)
  const [formData, setFormData] = useState({
    // Identity
    nama: "",
    nik: "",
    gender: "",
    tempatLahir: "",
    tglLahir: "",
    pekerjaan: "",
    agama: "",
    statusNikah: "",
    edukasi: "",
    nip: "",
    
    // Address & Contact
    alamat: "",
    provinsi: "",
    kota: "",
    kecamatan: "",
    kelurahan: "",
    hp: "",
    email: "",
    referrer: "",
    
    // Citizen & Passport
    negara: "",
    passport: "",
    
    // Emergency Contact
    emergencyNama: "",
    emergencyHubungan: "",
    emergencyHp: "",
    
    // Visit Info
    poli: "",
    dokter: "",
    penjamin1: "",
    penjamin2: "",
    penjamin3: "",
    noRujukan: "",
    jenisKunjungan: "new",
    
    // System
    noRM: "",
    bpjs: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectPatient = (patient: typeof mockPatients[0]) => {
    setSelectedPatient(patient);
    
    // Map patient data to form
    setFormData({
      ...formData,
      nama: patient.nama,
      nik: patient.nik,
      gender: patient.gender,
      tempatLahir: patient.tempatLahir || "",
      tglLahir: patient.tglLahir,
      pekerjaan: patient.pekerjaan || "",
      agama: patient.agama || "",
      statusNikah: patient.statusNikah || "",
      edukasi: "", // Mock data missing this
      nip: "",
      
      alamat: patient.alamat,
      provinsi: patient.provinsi || "",
      kota: patient.kota || "",
      kecamatan: patient.kecamatan || "",
      kelurahan: patient.kelurahan || "",
      hp: patient.hp,
      email: "",
      referrer: "",
      
      negara: "",
      passport: "",
      
      emergencyNama: "",
      emergencyHubungan: "",
      emergencyHp: "",
      
      noRM: patient.noRM,
      bpjs: patient.bpjs || "",
      
      // Reset specific visit data
      poli: "",
      dokter: "",
      penjamin1: patient.kategori === 'bpjs' ? 'bpjs' : 'umum',
      penjamin2: "",
      penjamin3: "",
      jenisKunjungan: "control", // Default to control for old patient
    });
    
    setKategoriPasien(patient.kategoriPasien as "reguler" | "vip" || "reguler");
    setIsWNA(false); // Default logic
    
    setMode("old");
    setIsEditMode(true);
    setShowSearchDialog(false);
  };

  const filteredPatients = mockPatients.filter(p => 
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.noRM.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.nik.includes(searchTerm) ||
    p.bpjs.includes(searchTerm)
  );

  const handleSubmit = () => {
    // Submit logic here
    setShowConfirm(false);
    alert("Pendaftaran Berhasil!");
    router.push("/admin/pasien");
  };

  const resetForm = () => {
    setSelectedPatient(null);
    setFormData({
      nama: "", nik: "", gender: "", tempatLahir: "", tglLahir: "", pekerjaan: "", agama: "", statusNikah: "", edukasi: "", nip: "",
      alamat: "", provinsi: "", kota: "", kecamatan: "", kelurahan: "", hp: "", email: "", referrer: "",
      negara: "", passport: "",
      emergencyNama: "", emergencyHubungan: "", emergencyHp: "",
      poli: "", dokter: "", penjamin1: "", penjamin2: "", penjamin3: "", noRujukan: "", jenisKunjungan: "new",
      noRM: "", bpjs: ""
    });
    setMode("new");
    setIsEditMode(true);
    setKategoriPasien("reguler");
    setIsWNA(false);
    setIsRedflag(false);
  };

  const isFormDisabled = !isEditMode;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Navigation */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/pasien">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pendaftaran Pasien</h1>
            <p className="text-sm text-muted-foreground">Pendaftaran pasien baru dan lama dalam satu pintu.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: REGISTRATION FORM */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Mode Toggle & Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-muted p-1 rounded-lg flex shrink-0">
              <Button 
                variant={mode === "new" ? "default" : "ghost"} 
                size="sm"
                onClick={resetForm}
                className="gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Pasien Baru
              </Button>
              <Button 
                variant={mode === "old" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setMode("old")}
                className="gap-2"
              >
                <UserCheck className="h-4 w-4" />
                Pasien Lama
              </Button>
            </div>
            
            {mode === "old" && (
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Cari: No. RM / BPJS / NIK / Nama / Rujukan..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                    onFocus={() => setShowSearchDialog(true)}
                  />
                </div>
                <Button onClick={() => setShowSearchDialog(true)}>Cari</Button>
              </div>
            )}
          </div>

          {/* Search Results Dialog */}
          <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
             <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Pencarian Pasien Terdaftar</DialogTitle>
                <DialogDescription>
                  Masukan Nomor RM, BPJS, NIK, atau Nama Pasien untuk mencari data.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Ketik kata kunci pencarian..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                    autoFocus
                  />
                </div>
                <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map(p => (
                        <div 
                          key={p.id}
                          className="p-3 hover:bg-muted cursor-pointer transition-colors flex items-center justify-between"
                          onClick={() => handleSelectPatient(p)}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold">{p.nama}</span>
                            <div className="flex gap-2 text-xs text-muted-foreground">
                              <span className="bg-primary/10 text-primary px-1.5 rounded">{p.noRM}</span>
                              <span>NIK: {p.nik}</span>
                              <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> {p.bpjs}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">Pilih</Button>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        Tidak ditemukan data pasien yang sesuai.
                      </div>
                    )}
                </div>
              </div>
             </DialogContent>
          </Dialog>


          {/* MAIN FORM GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Identity Card */}
            <Card className="lg:col-span-2 border-primary/10">
              <CardHeader className="bg-primary/5 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">Identitas Pasien</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                       <Label className="flex items-center gap-2">No. RM <AlertCircle className="h-3 w-3 text-muted-foreground" /></Label>
                       <div className="relative">
                          <Input value={formData.noRM} disabled placeholder="Auto-generated" className="bg-muted pl-8" />
                          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                             <User className="h-4 w-4 opacity-50" />
                          </div>
                       </div>
                       <p className="text-[10px] text-muted-foreground">No. RM bersifat permanen.</p>
                    </div>
                    <div className="space-y-2">
                       <Label>No. BPJS (Optional)</Label>
                       <div className="relative">
                          <Input 
                            value={formData.bpjs} 
                            onChange={(e) => handleInputChange("bpjs", e.target.value)}
                            disabled={isFormDisabled}
                            placeholder="000xxxxxxxxxx" 
                            className="pl-8"
                          />
                          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                             <CreditCard className="h-4 w-4 opacity-50" />
                          </div>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label>Nama Lengkap <span className="text-destructive">*</span></Label>
                       <Input 
                         value={formData.nama} 
                         onChange={(e) => handleInputChange("nama", e.target.value)}
                         disabled={isFormDisabled}
                         placeholder="Nama sesuai identitas" 
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tempat Lahir</Label>
                      <Input 
                        value={formData.tempatLahir} 
                        onChange={(e) => handleInputChange("tempatLahir", e.target.value)}
                        disabled={isFormDisabled}
                      />
                    </div>
                    <div className="space-y-2">
                       <Label>Tanggal Lahir</Label>
                       <Popover>
                         <PopoverTrigger asChild>
                           <Button
                             variant={"outline"}
                             disabled={isFormDisabled}
                             className={cn(
                               "w-full justify-start text-left font-normal",
                               !formData.tglLahir && "text-muted-foreground"
                             )}
                           >
                             <CalendarIcon className="mr-2 h-4 w-4" />
                             {formData.tglLahir ? format(new Date(formData.tglLahir), "dd MMM yyyy") : <span>Pilih Tanggal</span>}
                           </Button>
                         </PopoverTrigger>
                         <PopoverContent className="w-auto p-0" align="start">
                           <Calendar
                             mode="single"
                             selected={formData.tglLahir ? new Date(formData.tglLahir) : undefined}
                             onSelect={(date) => handleInputChange("tglLahir", date ? format(date, "yyyy-MM-dd") : "")}
                             initialFocus
                           />
                         </PopoverContent>
                       </Popover>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label>Jenis Kelamin</Label>
                       <Select 
                         value={formData.gender} 
                         onValueChange={(v) => handleInputChange("gender", v)}
                         disabled={isFormDisabled}
                       >
                         <SelectTrigger>
                           <SelectValue placeholder="Pilih Gender" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="L">Laki-laki</SelectItem>
                           <SelectItem value="P">Perempuan</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Pekerjaan</Label>
                        <Input 
                          value={formData.pekerjaan}
                          onChange={(e) => handleInputChange("pekerjaan", e.target.value)}
                          disabled={isFormDisabled}
                        />
                     </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label>Agama</Label>
                      <Select 
                        value={formData.agama}
                        onValueChange={(v) => handleInputChange("agama", v)}
                        disabled={isFormDisabled}
                      >
                         <SelectTrigger>
                           <SelectValue placeholder="Pilih Agama" />
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
                   <div className="space-y-2">
                      <Label>Status Nikah</Label>
                      <Select 
                        value={formData.statusNikah}
                        onValueChange={(v) => handleInputChange("statusNikah", v)}
                        disabled={isFormDisabled}
                      >
                         <SelectTrigger>
                           <SelectValue placeholder="Pilih Status" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="lajang">Lajang</SelectItem>
                            <SelectItem value="menikah">Menikah</SelectItem>
                            <SelectItem value="cerai-hidup">Cerai Hidup</SelectItem>
                            <SelectItem value="cerai-mati">Cerai Mati</SelectItem>
                         </SelectContent>
                      </Select>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Edukasi Terakhir</Label>
                      <Select 
                        value={formData.edukasi}
                        onValueChange={(v) => handleInputChange("edukasi", v)}
                        disabled={isFormDisabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Pendidikan" />
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
                    <div className="space-y-2">
                       <Label>NIP / NPP (Jika ada)</Label>
                       <div className="relative">
                         <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                         <Input 
                           value={formData.nip}
                           onChange={(e) => handleInputChange("nip", e.target.value)}
                           disabled={isFormDisabled}
                           placeholder="NIP / NPP"
                           className="pl-9"
                         />
                       </div>
                    </div>
                 </div>
              </CardContent>
            </Card>
            
            {/* Address Card */}
            <Card className="lg:col-span-2">
                <CardHeader className="bg-slate-50 py-4 dark:bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <CardTitle className="text-base">Alamat & Kontak</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                   <div className="space-y-2">
                      <Label>Alamat Lengkap</Label>
                      <Textarea 
                        value={formData.alamat} 
                        onChange={(e) => handleInputChange("alamat", e.target.value)}
                        disabled={isFormDisabled}
                        className="min-h-[60px]"
                      />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Provinsi</Label>
                        <Input value={formData.provinsi} onChange={(e) => handleInputChange("provinsi", e.target.value)} disabled={isFormDisabled} />
                      </div>
                      <div className="space-y-2">
                        <Label>Kota/Kabupaten</Label>
                        <Input value={formData.kota} onChange={(e) => handleInputChange("kota", e.target.value)} disabled={isFormDisabled} />
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Kecamatan</Label>
                        <Input value={formData.kecamatan} onChange={(e) => handleInputChange("kecamatan", e.target.value)} disabled={isFormDisabled} />
                      </div>
                      <div className="space-y-2">
                        <Label>Kelurahan/Desa</Label>
                        <Input value={formData.kelurahan} onChange={(e) => handleInputChange("kelurahan", e.target.value)} disabled={isFormDisabled} />
                      </div>
                   </div>
                   
                   <Separator className="my-2" />
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <Label>No. HP / WA <span className="text-destructive">*</span></Label>
                         <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            <Input 
                              value={formData.hp} 
                              onChange={(e) => handleInputChange("hp", e.target.value)}
                              disabled={isFormDisabled}
                              className="pl-9"
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <Label>Email</Label>
                         <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            <Input 
                              type="email"
                              value={formData.email} 
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              disabled={isFormDisabled}
                              className="pl-9"
                            />
                         </div>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <Label>Referrer (Referral)</Label>
                      <Input value={formData.referrer} onChange={(e) => handleInputChange("referrer", e.target.value)} disabled={isFormDisabled} />
                   </div>
                </CardContent>
            </Card>

            {/* Category & Citizenship */}
            <Card className="lg:col-span-1">
              <CardHeader className="bg-slate-50 py-4 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-orange-500" />
                  <CardTitle className="text-base">Kategori & Kewarganegaraan</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                 <div className="space-y-2">
                    <Label>Kategori Pasien</Label>
                    <div className="flex gap-2">
                      <Button 
                        type="button"
                        variant={kategoriPasien === "reguler" ? "default" : "outline"} 
                        className="flex-1"
                        onClick={() => !isFormDisabled && setKategoriPasien("reguler")}
                        disabled={isFormDisabled}
                      >
                        Reguler
                      </Button>
                      <Button 
                        type="button"
                        variant="outline" 
                        className={cn("flex-1", kategoriPasien === "vip" && "bg-amber-500 hover:bg-amber-600 text-white")}
                        onClick={() => !isFormDisabled && setKategoriPasien("vip")}
                        disabled={isFormDisabled}
                      >
                        <Star className={cn("h-4 w-4 mr-1", kategoriPasien === "vip" && "fill-current")} />
                        VIP
                      </Button>
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <Label>Kewarganegaraan</Label>
                    <Select 
                      onValueChange={(value) => setIsWNA(value === "WNA")} 
                      value={isWNA ? "WNA" : "WNI"}
                      disabled={isFormDisabled}
                    >
                      <SelectTrigger>
                        <Globe className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Pilih kewarganegaraan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WNI">WNI</SelectItem>
                        <SelectItem value="WNA">WNA</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 
                 {!isWNA ? (
                    <div className="space-y-2">
                      <Label>No. KTP (NIK) <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input 
                          value={formData.nik} 
                          onChange={(e) => handleInputChange("nik", e.target.value)}
                          disabled={isFormDisabled}
                          placeholder="16 digit NIK" 
                          className="pl-9"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Negara Asal</Label>
                        <Input 
                          value={formData.negara} 
                          onChange={(e) => handleInputChange("negara", e.target.value)} 
                          disabled={isFormDisabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>No. Passport <span className="text-destructive">*</span></Label>
                        <Input 
                          value={formData.passport} 
                          onChange={(e) => handleInputChange("passport", e.target.value)} 
                          disabled={isFormDisabled}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <div 
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer",
                        isRedflag ? "bg-destructive/10 border-destructive text-destructive" : "bg-muted/50 border-input hover:bg-muted",
                        isFormDisabled && "opacity-50 pointer-events-none"
                      )}
                      onClick={() => setIsRedflag(!isRedflag)}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={cn("h-4 w-4", isRedflag ? "text-destructive" : "text-muted-foreground")} />
                        <span className="text-sm font-medium">Status Redflag</span>
                      </div>
                      <div className={cn(
                        "h-4 w-8 rounded-full flex items-center p-0.5 transition-colors",
                        isRedflag ? "bg-destructive" : "bg-input"
                      )}>
                        <div className={cn(
                          "h-3 w-3 rounded-full bg-white transition-transform",
                          isRedflag ? "translate-x-4" : "translate-x-0"
                        )} />
                      </div>
                    </div>
                  </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="lg:col-span-1 border-red-100 dark:border-red-900/30">
              <CardHeader className="bg-red-50 py-4 dark:bg-red-900/10">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-red-500" />
                  <CardTitle className="text-base">Kontak Darurat</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                 <div className="space-y-2">
                    <Label>Nama Kontak</Label>
                    <Input 
                      value={formData.emergencyNama} 
                      onChange={(e) => handleInputChange("emergencyNama", e.target.value)} 
                      disabled={isFormDisabled}
                    />
                 </div>
                 <div className="space-y-2">
                    <Label>Hubungan</Label>
                    <Select 
                      value={formData.emergencyHubungan}
                      onValueChange={(v) => handleInputChange("emergencyHubungan", v)}
                      disabled={isFormDisabled}
                    >
                      <SelectTrigger>
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
                    <Label>No. HP</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input 
                        value={formData.emergencyHp} 
                        onChange={(e) => handleInputChange("emergencyHp", e.target.value)}
                        disabled={isFormDisabled}
                        className="pl-9"
                      />
                    </div>
                 </div>
              </CardContent>
            </Card>

            {/* Visit Data Section */}
            <Card className="lg:col-span-2 border-primary/20 shadow-sm overflow-hidden">
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
                        value={formData.jenisKunjungan}
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
                        <Label>Pilih Poli <span className="text-destructive">*</span></Label>
                        <Select value={formData.poli} onValueChange={(v) => handleInputChange("poli", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih poli tujuan" />
                        </SelectTrigger>
                        <SelectContent>
                            {medicalData.poli.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Dokter <span className="text-destructive">*</span></Label>
                        <Select value={formData.dokter} onValueChange={(v) => handleInputChange("dokter", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih dokter" />
                        </SelectTrigger>
                        <SelectContent>
                            {medicalData.dokter.map(d => (
                                <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                            ))}
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
                            <Label className="text-xs text-muted-foreground">Penjamin Utama (1)</Label>
                            <Select value={formData.penjamin1} onValueChange={(v) => handleInputChange("penjamin1", v)}>
                                <SelectTrigger>
                                <SelectValue placeholder="Pilih penjamin utama" />
                                </SelectTrigger>
                                <SelectContent>
                                    {medicalData.penjamin.map(p => (
                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Penjamin 2</Label>
                                <Select value={formData.penjamin2} onValueChange={(v) => handleInputChange("penjamin2", v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Opsional" />
                                </SelectTrigger>
                                <SelectContent>
                                    {medicalData.penjamin.map(p => (
                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Penjamin 3</Label>
                                <Select value={formData.penjamin3} onValueChange={(v) => handleInputChange("penjamin3", v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Opsional" />
                                </SelectTrigger>
                                <SelectContent>
                                    {medicalData.penjamin.map(p => (
                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

          </div>
          
          {/* Action Buttons Grid */}
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  <Button className="h-auto py-3 px-2 flex flex-col gap-1 items-center bg-green-600 hover:bg-green-700 whitespace-normal text-center h-[80px]" onClick={() => setShowConfirm(true)}>
                    <Save className="h-5 w-5 mb-1" />
                    <span className="text-xs leading-tight">Simpan & Daftar</span>
                  </Button>
                  {mode === "old" && selectedPatient && (
                     <Button className="h-auto py-3 px-2 flex flex-col gap-1 items-center bg-blue-600 hover:bg-blue-700 whitespace-normal text-center h-[80px]" onClick={() => alert("Data Pasien Berhasil Diperbarui")}>
                        <RotateCw className="h-5 w-5 mb-1" />
                        <span className="text-xs leading-tight">Update Data Pasien</span>
                     </Button>
                  )}
                 <Button variant="outline" className="h-auto py-3 px-2 flex flex-col gap-1 items-center whitespace-normal text-center h-[80px]">
                    <FileText className="h-5 w-5 mb-1" />
                    <span className="text-xs leading-tight">Buat SEP</span>
                 </Button>
                 <Button variant="outline" className="h-auto py-3 px-2 flex flex-col gap-1 items-center whitespace-normal text-center h-[80px]">
                    <Printer className="h-5 w-5 mb-1" />
                    <span className="text-xs leading-tight">Label RM</span>
                 </Button>
                 <Button variant="outline" className="h-auto py-3 px-2 flex flex-col gap-1 items-center whitespace-normal text-center h-[80px]">
                    <Activity className="h-5 w-5 mb-1" />
                    <span className="text-xs leading-tight">Trace / Riwayat</span>
                 </Button>
                 <Button variant="outline" className="h-auto py-3 px-2 flex flex-col gap-1 items-center whitespace-normal text-center h-[80px]">
                    <CardIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs leading-tight">Cetak Kartu</span>
                 </Button>
                 <Button variant="outline" className="h-auto py-3 px-2 flex flex-col gap-1 items-center whitespace-normal text-center h-[80px]">
                    <FileText className="h-5 w-5 mb-1" />
                    <span className="text-xs leading-tight">General Consent RJ</span>
                 </Button>
                 <Button variant="outline" className="h-auto py-3 px-2 flex flex-col gap-1 items-center whitespace-normal text-center h-[80px]">
                    <FileText className="h-5 w-5 mb-1" />
                    <span className="text-xs leading-tight">General Consent RI</span>
                 </Button>
                 <Button variant="outline" className="h-auto py-3 px-2 flex flex-col gap-1 items-center whitespace-normal text-center h-[80px]">
                     <Printer className="h-5 w-5 mb-1" />
                     <span className="text-xs leading-tight">Cetak Struk</span>
                 </Button>
                 <Button variant="outline" className="h-auto py-3 px-2 flex flex-col gap-1 items-center whitespace-normal text-center h-[80px]">
                     <User className="h-5 w-5 mb-1" />
                     <span className="text-xs leading-tight">Data Pasien</span>
                 </Button>
                 <Button variant="outline" className="h-auto py-3 px-2 flex flex-col gap-1 items-center whitespace-normal text-center h-[80px]">
                     <Edit className="h-5 w-5 mb-1" />
                     <span className="text-xs leading-tight">TTD Digital</span>
                 </Button>
              </div>
            </CardContent>
          </Card>

        </div>

          {/* Right Column: Sidebar */}
        <div className="xl:col-span-1 space-y-6">
           
           {/* Queue Display */}
           <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="py-3 items-center">
                 <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Antrian Admisi</CardTitle>
                 <Badge className="bg-primary text-primary-foreground text-xl px-4 py-1 mt-1 rounded-sm">{queueData.current}</Badge>
              </CardHeader>
              <CardContent className="pb-4 text-center space-y-4">
                 <div className="space-y-2">
                    <Select defaultValue={queueData.loket}>
                      <SelectTrigger className="mx-auto w-full h-8 text-xs bg-background">
                         <SelectValue placeholder="Pilih Loket" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="01">Loket 01 - Umum</SelectItem>
                         <SelectItem value="02">Loket 02 - BPJS</SelectItem>
                         <SelectItem value="03">Loket 03 - Lansia</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-2 text-sm border-t border-b border-primary/10 py-2">
                    <div className="flex flex-col">
                       <span className="text-xs text-muted-foreground">Loket</span>
                       <span className="font-bold">{queueData.loket}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xs text-muted-foreground">Sisa Antrian</span>
                       <span className="font-bold">{queueData.remaining}</span>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" className="w-full gap-1 h-9 bg-green-600 hover:bg-green-700">
                       <Mic className="h-3.5 w-3.5" /> Panggil
                    </Button>
                    <Button size="sm" variant="outline" className="w-full gap-1 h-9">
                       <Repeat className="h-3.5 w-3.5" /> Ulang
                    </Button>
                 </div>
              </CardContent>
           </Card>

           {/* Today's Patients List */}
           <Card className="flex flex-col h-[400px]">
              <CardHeader className="py-3 border-b flex flex-row items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <CardTitle className="text-sm">Pasien Hari Ini</CardTitle>
                 </div>
                 <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Filter className="h-3 w-3" />
                 </Button>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-y-auto">
                 <div className="divide-y">
                     {queueData.todayPatients.map((p, i) => (
                        <div 
                          key={i} 
                          className="p-3 text-sm flex flex-col gap-1 hover:bg-muted/50 cursor-pointer"
                          onClick={() => {
                             // Find the full patient data from mock or just use the summary
                             const fullPatient = mockPatients.find(mp => mp.noRM === p.noRM) || {
                                id: i.toString(),
                                noRM: p.noRM,
                                nama: p.nama,
                                nik: "",
                                bpjs: "",
                                gender: "L",
                                tglLahir: "1990-01-01",
                                alamat: "",
                                kategori: "umum"
                             };
                             handleSelectPatient(fullPatient as any);
                          }}
                        >
                           <div className="flex justify-between items-start">
                              <span className="font-medium truncate">{p.nama}</span>
                              <Badge variant={p.status === 'completed' ? 'secondary' : 'outline'} className="text-[10px] h-5">
                                {p.status}
                              </Badge>
                           </div>
                           <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>{p.noRM}</span>
                              <span>{p.poli}</span>
                           </div>
                        </div>
                     ))}
                 </div>
              </CardContent>
           </Card>

           {/* Patient History Section (Moved to Sidebar) */}
          {selectedPatient && (
            <Card>
               <CardHeader className="py-3 bg-muted/40">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                     <History className="h-4 w-4" />
                     Riwayat Kunjungan
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y max-h-[300px] overflow-y-auto">
                     {selectedPatient.history?.map((h, i) => (
                        <div key={i} className="p-3 text-sm flex justify-between items-center hover:bg-muted/50">
                           <div className="flex flex-col">
                              <span className="font-medium">{h.date}</span>
                              <span className="text-muted-foreground text-xs">{h.poli}</span>
                           </div>
                           <span className="text-xs bg-secondary px-2 py-1 rounded-full">{h.dokter}</span>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
          )}

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
              Mohon verifikasi data sebelum menyimpan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
             <div className="flex justify-between">
                <span className="text-muted-foreground">Nama Pasien:</span>
                <span className="font-medium">{formData.nama}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Poli Tujuan:</span>
                <span className="font-medium capitalize">{
                  medicalData.poli.find(p => p.id === formData.poli)?.name || formData.poli
                }</span>
             </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Dokter:</span>
                <span className="font-medium">{
                  medicalData.dokter.find(d => d.id === formData.dokter)?.name || formData.dokter
                }</span>
             </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Penjamin:</span>
                <span className="font-medium capitalize">{
                   medicalData.penjamin.find(p => p.id === formData.penjamin1)?.name || formData.penjamin1
                }</span>
             </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
              Konfirmasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
