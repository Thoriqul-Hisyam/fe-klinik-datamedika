"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Volume2,
  UserCheck,
  Clock,
  CheckCircle2,
  Users,
  Building2,
  ArrowRight,
  MonitorPlay,
  PlayCircle,
  PauseCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for Antrian
const initialQueueData = [
  {
    id: "Q001",
    nomor: "A-001",
    nama: "Ahmad Rizki",
    poli: "Poli Umum",
    dokter: "dr. Sarah Amalia",
    waktu: "08:15",
    status: "panggil", // panggil, layani, selesai
    pembayaran: "BPJS",
  },
  {
    id: "Q002",
    nomor: "B-005",
    nama: "Siti Nurhaliza",
    poli: "Poli Gigi",
    dokter: "dr. Budi Santoso",
    waktu: "08:45",
    status: "layani",
    pembayaran: "Umum",
  },
  {
    id: "Q003",
    nomor: "A-002",
    nama: "Budi Santoso",
    poli: "Poli Umum",
    dokter: "dr. Sarah Amalia",
    waktu: "09:00",
    status: "tunggu",
    pembayaran: "BPJS",
  },
  {
    id: "Q004",
    nomor: "C-012",
    nama: "Dewi Lestari",
    poli: "Poli Anak",
    dokter: "dr. Rina Wijaya",
    waktu: "09:15",
    status: "tunggu",
    pembayaran: "Umum",
  },
  {
    id: "Q005",
    nomor: "A-003",
    nama: "Eko Prasetyo",
    poli: "Poli Umum",
    dokter: "dr. Sarah Amalia",
    waktu: "09:30",
    status: "selesai",
    pembayaran: "Asuransi",
  },
];

const poliOptions = ["Semua Poli", "Poli Umum", "Poli Gigi", "Poli Anak", "Poli Kandungan"];

export default function QueuePage() {
  const [data, setData] = useState(initialQueueData);
  const [filterPoli, setFilterPoli] = useState("Semua Poli");
  const [activeTab, setActiveTab] = useState("semua");

  const filteredData = data.filter((item) => {
    const matchesPoli = filterPoli === "Semua Poli" || item.poli === filterPoli;
    const matchesTab = 
      activeTab === "semua" || 
      (activeTab === "menunggu" && (item.status === "tunggu" || item.status === "panggil")) ||
      (activeTab === "dilayani" && item.status === "layani") ||
      (activeTab === "selesai" && item.status === "selesai");
    return matchesPoli && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "panggil":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Dipanggil</Badge>;
      case "layani":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Dilayani</Badge>;
      case "selesai":
        return <Badge variant="success">Selesai</Badge>;
      default:
        return <Badge variant="secondary">Menunggu</Badge>;
    }
  };

  const handleCall = (nama: string) => {
    // Mock call logic
    alert(`📢 Memanggil: ${nama}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Antrian Pasien Hari Ini</h1>
          <p className="text-sm text-muted-foreground">
            Monitoring dan manajemen antrian poliklinik secara real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Link href="/admin/antrian/display" target="_blank">
                <Button variant="outline" className="gap-2">
                    <MonitorPlay className="h-4 w-4" />
                    Display Antrian
                </Button>
            </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-slate-50 dark:bg-slate-900 border-l-4 border-l-blue-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Total Antrian</p>
              <h3 className="text-2xl font-bold">{data.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-slate-50 dark:bg-slate-900 border-l-4 border-l-amber-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Menunggu</p>
              <h3 className="text-2xl font-bold">{data.filter(d => d.status === "tunggu" || d.status === "panggil").length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-slate-50 dark:bg-slate-900 border-l-4 border-l-indigo-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600">
              <PlayCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Dilayani</p>
              <h3 className="text-2xl font-bold">{data.filter(d => d.status === "layani").length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-slate-50 dark:bg-slate-900 border-l-4 border-l-green-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Selesai</p>
              <h3 className="text-2xl font-bold">{data.filter(d => d.status === "selesai").length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3 border-b bg-card rounded-t-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="h-9">
                <TabsTrigger value="semua" className="text-xs">Semua</TabsTrigger>
                <TabsTrigger value="menunggu" className="text-xs">Menunggu</TabsTrigger>
                <TabsTrigger value="dilayani" className="text-xs">Dilayani</TabsTrigger>
                <TabsTrigger value="selesai" className="text-xs">Selesai</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Select value={filterPoli} onValueChange={setFilterPoli}>
                <SelectTrigger className="h-9 w-[180px] text-xs">
                  <Building2 className="h-3.5 w-3.5 mr-2 opacity-70" />
                  <SelectValue placeholder="Pilih Poli" />
                </SelectTrigger>
                <SelectContent>
                  {poliOptions.map(p => (
                    <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[100px] text-[11px] uppercase tracking-wider font-bold">No. Antri</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold">Pasien</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold">Poli & Dokter</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold">Waktu</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold">Status</TableHead>
                <TableHead className="text-right text-[11px] uppercase tracking-wider font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic">
                    Belum ada antrian.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20">
                        {item.nomor}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">{item.nama}</div>
                      <Badge variant="outline" className="text-[9px] font-normal px-1 py-0 opacity-70 uppercase">
                        {item.pembayaran}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{item.poli}</div>
                      <div className="text-[11px] text-muted-foreground italic">{item.dokter}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {item.waktu}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                             <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleCall(item.nama)}
                                title="Panggil Pasien"
                             >
                                <Volume2 className="h-4 w-4" />
                             </Button>
                             
                             {item.status === "tunggu" || item.status === "panggil" ? (
                                <Button size="sm" className="h-8 text-xs gap-1.5">
                                    <PlayCircle className="h-3.5 w-3.5" />
                                    Layani
                                </Button>
                             ) : item.status === "layani" ? (
                                <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 border-green-500 text-green-600 hover:bg-green-50">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    Selesaikan
                                </Button>
                             ) : (
                                <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" disabled>
                                    Telah Selesai
                                </Button>
                             )}
                        </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Calling Notification Area (Bottom) */}
      <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right duration-500">
         <Card className="w-80 border-primary bg-primary shadow-xl text-primary-foreground">
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-md">
                        <Volume2 className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Sedang Memanggil</p>
                        <h4 className="text-lg font-bold">A-001</h4>
                        <p className="text-xs opacity-90 truncate">Ahmad Rizki - Poli Umum</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/20">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
