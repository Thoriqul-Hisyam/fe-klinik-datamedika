"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Calendar,
  Building2,
  User,
  Volume2,
  X,
  CreditCard,
  UserCheck,
} from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock data for patient registrations in EMR context
const emrRegistrations = [
  {
    id: "REG001",
    noReg: "NoReg202601200830152024001",
    noRM: "RM-2024-001",
    nama: "Ahmad Rizki",
    tanggal: "2026-01-21",
    poli: "Poli Umum",
    dokter: "dr. Sarah",
    pembayaran: "BPJS",
    status: "antrian",
  },
  {
    id: "REG002",
    noReg: "NoReg202601200915222024015",
    noRM: "RM-2024-015",
    nama: "Siti Nurhaliza",
    tanggal: "2026-01-21",
    poli: "Poli Gigi",
    dokter: "drg. Budi",
    pembayaran: "Umum",
    status: "periksa",
  },
  {
    id: "REG003",
    noReg: "NoReg202601201010052024023",
    noRM: "RM-2024-023",
    nama: "Dewi Lestari",
    tanggal: "2026-01-21",
    poli: "Poli Anak",
    dokter: "dr. Rina, Sp.A",
    pembayaran: "BPJS",
    status: "antrian",
  },
  {
    id: "REG004",
    noReg: "NoReg202601201140302024045",
    noRM: "RM-2024-045",
    nama: "Eko Prasetyo",
    tanggal: "2026-01-20",
    poli: "Poli Umum",
    dokter: "dr. Ahmad",
    pembayaran: "Asuransi",
    status: "antrian",
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "success" | "warning" }> = {
  antrian: { label: "Dalam Antrian", variant: "secondary" },
  periksa: { label: "Sedang Diperiksa", variant: "warning" },
  selesai: { label: "Selesai", variant: "success" },
};

const poliOptions = ["Semua Poli", "Poli Umum", "Poli Gigi", "Poli Anak", "Poli Kandungan"];
const statusOptions = ["Semua Status", "antrian", "periksa", "selesai"];
const dokterOptions = ["Semua Dokter", "dr. Sarah", "drg. Budi", "dr. Rina, Sp.A", "dr. Ahmad"];

export default function EMRListPage() {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split("T")[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split("T")[0]);
  const [filterPoli, setFilterPoli] = useState("Semua Poli");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  const [filterDokter, setFilterDokter] = useState("Semua Dokter");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = emrRegistrations.filter((reg) => {
    const matchesSearch =
      reg.nama.toLowerCase().includes(search.toLowerCase()) ||
      reg.noRM.toLowerCase().includes(search.toLowerCase()) ||
      reg.noReg.toLowerCase().includes(search.toLowerCase());
    const matchesTanggal = (!dateFrom || reg.tanggal >= dateFrom) && (!dateTo || reg.tanggal <= dateTo);
    const matchesPoli = filterPoli === "Semua Poli" || reg.poli === filterPoli;
    const matchesStatus = filterStatus === "Semua Status" || reg.status === filterStatus;
    const matchesDokter = filterDokter === "Semua Dokter" || reg.dokter === filterDokter;

    return matchesSearch && matchesTanggal && matchesPoli && matchesStatus && matchesDokter;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCallPatient = (nama: string) => {
    // In a real app, this would trigger a voice announcement or a notification
    alert(`Memanggil pasien: ${nama}`);
  };

  const hasActiveFilters = 
    search !== "" || 
    dateFrom !== new Date().toISOString().split("T")[0] ||
    dateTo !== new Date().toISOString().split("T")[0] ||
    filterPoli !== "Semua Poli" ||
    filterStatus !== "Semua Status" ||
    filterDokter !== "Semua Dokter";

  const clearFilters = () => {
    setSearch("");
    const today = new Date().toISOString().split("T")[0];
    setDateFrom(today);
    setDateTo(today);
    setFilterPoli("Semua Poli");
    setFilterStatus("Semua Status");
    setFilterDokter("Semua Dokter");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold uppercase tracking-tight">Rekam Medis Elektronik</h1>
          <p className="text-sm text-muted-foreground">
            Pilih pasien untuk membuka Rekam Medis
          </p>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, RM, atau No. Registrasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 border-muted-foreground/20 focus-visible:ring-primary/20 transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Date Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "h-10 w-[160px] justify-start text-left font-normal border-muted-foreground/20",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateFrom ? format(new Date(dateFrom), "dd MMM yyyy") : <span>Dari Tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={dateFrom ? new Date(dateFrom) : undefined}
                    onSelect={(date) => {
                      setDateFrom(date ? format(date, "yyyy-MM-dd") : "");
                      setCurrentPage(1);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <span className="text-muted-foreground">-</span>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "h-10 w-[160px] justify-start text-left font-normal border-muted-foreground/20",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateTo ? format(new Date(dateTo), "dd MMM yyyy") : <span>Sampai Tanggal</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={dateTo ? new Date(dateTo) : undefined}
                    onSelect={(date) => {
                      setDateTo(date ? format(date, "yyyy-MM-dd") : "");
                      setCurrentPage(1);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Poli Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 border-muted-foreground/20 gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="max-w-[100px] truncate">{filterPoli}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {poliOptions.map((opt) => (
                    <DropdownMenuItem key={opt} onClick={() => setFilterPoli(opt)}>
                      {opt}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Status Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 border-muted-foreground/20 gap-2">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="max-w-[100px] truncate">
                      {filterStatus === "Semua Status" ? filterStatus : statusConfig[filterStatus]?.label}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {statusOptions.map((opt) => (
                    <DropdownMenuItem key={opt} onClick={() => setFilterStatus(opt)}>
                      {opt === "Semua Status" ? opt : statusConfig[opt]?.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Dokter Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 border-muted-foreground/20 gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="max-w-[120px] truncate">{filterDokter}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {dokterOptions.map((opt) => (
                    <DropdownMenuItem key={opt} onClick={() => setFilterDokter(opt)}>
                      {opt}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="h-10 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-muted-foreground/10 overflow-hidden bg-background/50">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[180px] text-[11px] font-bold uppercase tracking-wider">No. Registrasi</TableHead>
                  <TableHead className="w-[120px] text-[11px] font-bold uppercase tracking-wider">No. RM</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider">Pasien</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider">Poli / Dokter</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-right text-[11px] font-bold uppercase tracking-wider">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((reg) => {
                    const config = statusConfig[reg.status] || { label: reg.status, variant: "default" };
                    return (
                      <TableRow key={reg.id} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-mono text-[11px]">{reg.noReg}</TableCell>
                        <TableCell className="font-mono text-[11px] text-muted-foreground">{reg.noRM}</TableCell>
                        <TableCell>
                          <div className="font-semibold text-sm">{reg.nama}</div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                             <Badge variant="outline" className="text-[9px] px-1 py-0 font-normal opacity-70">
                               {reg.pembayaran}
                             </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{reg.poli}</div>
                          <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {reg.dokter}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={config.variant} className="text-[10px] px-2 py-0.5 font-medium rounded-full">
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="secondary" 
                              className="h-8 gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-none"
                              onClick={() => handleCallPatient(reg.nama)}
                            >
                              <Volume2 className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Panggil</span>
                            </Button>
                            
                            <Button size="sm" variant="default" className="h-8 shadow-sm hover:shadow-md transition-all" asChild>
                              <Link href={`/admin/emr/pasien/${reg.noReg}`}>
                                <FileText className="h-3.5 w-3.5 mr-1.5" />
                                RME
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic">
                      Tidak ada pasien ditemukan untuk filter ini.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground px-2">
             <div>
                Showing {paginatedData.length} of {filteredData.length} patients
             </div>
             <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => setCurrentPage(p => Math.max(1, p-1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium text-foreground">{currentPage}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={paginatedData.length < itemsPerPage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
