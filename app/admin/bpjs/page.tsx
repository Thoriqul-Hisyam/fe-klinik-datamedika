"use client";

import { useState } from "react";
import {
  Activity,
  CheckCircle,
  CreditCard,
  FileText,
  Search,
  AlertCircle,
  RefreshCw,
  Server,
  Users,
  User,
  Building2,
  Calendar,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Mock data for SEPs
const sepList = [
  {
    noSep: "1234567890123456789",
    tglSep: "2026-01-22",
    noKartu: "0001234567890",
    nama: "Budi Santoso",
    poli: "Poli Penyakit Dalam",
    status: "Terbit",
  },
  {
    noSep: "9876543210987654321",
    tglSep: "2026-01-22",
    noKartu: "0009876543210",
    nama: "Siti Aminah",
    poli: "Poli Jantung",
    status: "Terbit",
  },
  {
    noSep: "1122334455667788990",
    tglSep: "2026-01-21",
    noKartu: "0005556667778",
    nama: "Andi Wijaya",
    poli: "Poli Mata",
    status: "Pulang",
  },
];

export default function BpjsIntegrationPage() {
  // Member Data Type
  interface MemberData {
    noKartu: string;
    nik: string;
    nama: string;
    tglLahir: string;
    statusPeserta: {
      kode: string;
      keterangan: string;
    };
    jenisPeserta: {
      kode: string;
      keterangan: string;
    };
    hakKelas: {
      kode: string;
      keterangan: string;
    };
    faskes1: string;
  }

  const [isConnected, setIsConnected] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchNoKartu, setSearchNoKartu] = useState("");
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loadingCheck, setLoadingCheck] = useState(false);

  // Simulate Member Check
  const handleCheckMember = () => {
    if (!searchNoKartu) return;
    setLoadingCheck(true);
    setTimeout(() => {
      setMemberData({
        noKartu: searchNoKartu,
        nik: "3201234567890001",
        nama: "AHMAD RIZKI",
        tglLahir: "1985-05-15",
        statusPeserta: {
          kode: "0",
          keterangan: "AKTIF",
        },
        jenisPeserta: {
          kode: "1",
          keterangan: "PEKERJA PENERIMA UPAH",
        },
        hakKelas: {
          kode: "1",
          keterangan: "KELAS 1",
        },
        faskes1: "KLINIK DATAMEDIKA",
      });
      setLoadingCheck(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Integrasi BPJS Kesehatan</h1>
          <p className="text-sm text-muted-foreground">
            Bridging system VClaim & PCare
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card border px-3 py-1.5 rounded-lg shadow-sm">
          <div className="relative">
             <Server className={`h-4 w-4 ${isConnected ? "text-green-500" : "text-destructive"}`} />
             <span className={`absolute -right-0.5 -top-0.5 flex h-2 w-2`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? "bg-green-400" : "bg-red-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? "bg-green-500" : "bg-red-500"}`}></span>
             </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Status Koneksi</span>
            <span className={`text-xs font-medium ${isConnected ? "text-green-600" : "text-destructive"}`}>
              {isConnected ? "Terhubung (v2.0)" : "Terputus"}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => setIsConnected(!isConnected)}>
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="cek-peserta">Cek Peserta</TabsTrigger>
          <TabsTrigger value="sep">Pembuatan SEP</TabsTrigger>
          <TabsTrigger value="rujukan">Rujukan</TabsTrigger>
        </TabsList>

        {/* Dashboard Content */}
        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total SEP Hari Ini</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+4 dari kemarin</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Klaim Pending</CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Perlu verifikasi</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rujukan Keluar</CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Ke RS Rujukan</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cek Peserta Content */}
        <TabsContent value="cek-peserta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cek Kepesertaan BPJS</CardTitle>
              <CardDescription>
                Cari data peserta berdasarkan Nomor Kartu BPJS atau NIK
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4 max-w-xl">
                <div className="relative flex-1">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Masukkan Nomor Kartu BPJS / NIK"
                    className="pl-9"
                    value={searchNoKartu}
                    onChange={(e) => setSearchNoKartu(e.target.value)}
                  />
                </div>
                <Button onClick={handleCheckMember} disabled={loadingCheck}>
                  {loadingCheck && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                  Cek Data
                </Button>
              </div>

              {memberData && (
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm animate-in fade-in-50">
                  <div className="p-6 grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                           <User className="h-6 w-6" />
                         </div>
                         <div>
                            <h3 className="font-semibold text-lg">{memberData.nama}</h3>
                            <p className="text-sm text-muted-foreground font-mono">{memberData.noKartu}</p>
                         </div>
                         <Badge variant={memberData.statusPeserta.kode === "0" ? "success" : "destructive"} className="ml-auto">
                           {memberData.statusPeserta.keterangan}
                         </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                         <div>
                           <p className="text-muted-foreground text-xs">NIK</p>
                           <p className="font-medium">{memberData.nik}</p>
                         </div>
                         <div>
                           <p className="text-muted-foreground text-xs">Tanggal Lahir</p>
                           <p className="font-medium">{memberData.tglLahir}</p>
                         </div>
                      </div>
                    </div>

                    <div className="space-y-4 border-l pl-6">
                       <h4 className="font-medium text-sm flex items-center gap-2">
                         <CreditCard className="h-4 w-4" /> Detail Kepesertaan
                       </h4>
                       <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b pb-2">
                             <span className="text-muted-foreground">Jenis Peserta</span>
                             <span className="font-medium">{memberData.jenisPeserta.keterangan}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                             <span className="text-muted-foreground">Hak Kelas</span>
                             <span className="font-medium">{memberData.hakKelas.keterangan}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                             <span className="text-muted-foreground">Faskes Tingkat 1</span>
                             <span className="font-medium">{memberData.faskes1}</span>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-b-lg flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setMemberData(null)}>Reset</Button>
                    <Button>Buat SEP</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEP List Content */}
        <TabsContent value="sep" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Data SEP (Surat Eligibilitas Peserta)</CardTitle>
                <CardDescription>Daftar SEP yang diterbitkan hari ini</CardDescription>
              </div>
              <Button>
                 <CheckCircle className="mr-2 h-4 w-4" />
                 Buat SEP Baru
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. SEP</TableHead>
                    <TableHead>No. Kartu</TableHead>
                    <TableHead>Nama Peserta</TableHead>
                    <TableHead>Poli Tujuan</TableHead>
                    <TableHead>Tgl. SEP</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sepList.map((sep) => (
                    <TableRow key={sep.noSep}>
                      <TableCell className="font-mono text-xs">{sep.noSep}</TableCell>
                      <TableCell className="font-mono text-xs">{sep.noKartu}</TableCell>
                      <TableCell className="font-medium">{sep.nama}</TableCell>
                      <TableCell>{sep.poli}</TableCell>
                      <TableCell>{sep.tglSep}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {sep.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Detail</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rujukan Content - Placeholder */}
        <TabsContent value="rujukan">
          <Card>
            <CardHeader>
              <CardTitle>Rujukan Berjenjang</CardTitle>
              <CardDescription>Kelola rujukan peserta ke fasilitas kesehatan lanjutan</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-64 text-center">
              <Building2 className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium">Modul Rujukan</h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                Silahkan pilih pasien dari menu Pendaftaran atau EMR untuk membuat rujukan baru.
              </p>
              <Button className="mt-4" variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Cari Data Rujukan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
