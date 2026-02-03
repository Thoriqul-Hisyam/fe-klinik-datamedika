"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Search, User, Calendar as CalendarIcon, Filter as FilterIcon, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Dummy data for registrations waiting for payment
const waitingPayments = [
  { 
    noReg: "REG-20260203001", 
    noRM: "001234", 
    namaPasien: "Budi Santoso", 
    poli: "Poli Umum", 
    dokter: "dr. Andi Wijaya", 
    tanggal: "2026-02-03",
    penjamin: "Umum",
    status: "Menunggu Pembayaran"
  },
  { 
    noReg: "REG-20260203002", 
    noRM: "005678", 
    namaPasien: "Siti Aminah", 
    poli: "Poli Gigi", 
    dokter: "drg. Maya Sari", 
    tanggal: "2026-02-03",
    penjamin: "BPJS",
    status: "Terbuka"
  },
  { 
    noReg: "REG-20260203003", 
    noRM: "009876", 
    namaPasien: "Joko Susilo", 
    poli: "IGD", 
    dokter: "dr. Rian Pratama", 
    tanggal: "2026-02-03",
    penjamin: "Umum",
    status: "Menunggu Pembayaran"
  },
  { 
    noReg: "REG-20260203004", 
    noRM: "004321", 
    namaPasien: "Lani Wijaya", 
    poli: "Poli Anak", 
    dokter: "dr. Siska Putri", 
    tanggal: "2026-02-03",
    penjamin: "Asuransi Lain",
    status: "Terkunci"
  },
  { 
    noReg: "REG-20260204001", 
    noRM: "001235", 
    namaPasien: "Andi Hermawan", 
    poli: "Poli Umum", 
    dokter: "dr. Andi Wijaya", 
    tanggal: "2026-02-04",
    penjamin: "Umum",
    status: "Menunggu Pembayaran"
  },
];

export default function KasirSearchPage() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [selectedPoli, setSelectedPoli] = useState("all");
  const [selectedPenjamin, setSelectedPenjamin] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredData = useMemo(() => {
    return waitingPayments.filter((item) => {
      // Search filter
      const matchesSearch = 
        item.namaPasien.toLowerCase().includes(search.toLowerCase()) ||
        item.noReg.toLowerCase().includes(search.toLowerCase()) ||
        item.noRM.toLowerCase().includes(search.toLowerCase());
      
      // Date filter
      let matchesDate = true;
      if (fromDate || toDate) {
        const itemDate = new Date(item.tanggal);
        if (fromDate && itemDate < new Date(format(fromDate, "yyyy-MM-dd"))) matchesDate = false;
        if (toDate && itemDate > new Date(format(toDate, "yyyy-MM-dd"))) matchesDate = false;
      }

      // Dropdown filters
      const matchesPoli = selectedPoli === "all" || item.poli === selectedPoli;
      const matchesPenjamin = selectedPenjamin === "all" || item.penjamin === selectedPenjamin;
      const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;

      return matchesSearch && matchesDate && matchesPoli && matchesPenjamin && matchesStatus;
    });
  }, [search, fromDate, toDate, selectedPoli, selectedPenjamin, selectedStatus]);

  const resetFilters = () => {
    setSearch("");
    setFromDate(new Date());
    setToDate(new Date());
    setSelectedPoli("all");
    setSelectedPenjamin("all");
    setSelectedStatus("all");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kasir"
        description="Cari nomor registrasi atau nama pasien untuk memproses pembayaran."
      />

      <Card className="border-primary/10 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 py-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <FilterIcon className="h-4 w-4 text-primary" />
            Filter Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 space-y-2">
              <Label className="text-xs font-semibold">Cari Pasien</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nama Pasien / No. Register / No. RM..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="md:col-span-2 space-y-2">
              <Label className="text-xs font-semibold">Periode Kunjungan</Label>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal h-10 border-input">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "dd MMM yyyy", { locale: id }) : <span>Dari Tanggal</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <span className="text-muted-foreground">-</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal h-10 border-input">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "dd MMM yyyy", { locale: id }) : <span>Sampai Tanggal</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar 
                      mode="single" 
                      selected={toDate} 
                      onSelect={setToDate} 
                      initialFocus 
                      disabled={(date) => fromDate ? date < fromDate : false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Poli Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Poliklinik</Label>
              <Select value={selectedPoli} onValueChange={setSelectedPoli}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Poli" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Poli</SelectItem>
                  <SelectItem value="Poli Umum">Poli Umum</SelectItem>
                  <SelectItem value="Poli Gigi">Poli Gigi</SelectItem>
                  <SelectItem value="IGD">IGD</SelectItem>
                  <SelectItem value="Poli Anak">Poli Anak</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Penjamin Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Penjamin</Label>
              <Select value={selectedPenjamin} onValueChange={setSelectedPenjamin}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Penjamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Penjamin</SelectItem>
                  <SelectItem value="Umum">Umum (Mandiri)</SelectItem>
                  <SelectItem value="BPJS">BPJS Kesehatan</SelectItem>
                  <SelectItem value="Asuransi Lain">Asuransi Swasta</SelectItem>
                  <SelectItem value="Perusahaan">Perusahaan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Status Transaksi</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Menunggu Pembayaran">Menunggu Pembayaran</SelectItem>
                  <SelectItem value="Terbuka">Terbuka</SelectItem>
                  <SelectItem value="Terkunci">Terkunci</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-end gap-2">
              <Button variant="ghost" className="flex-1 gap-2 text-muted-foreground hover:text-destructive" onClick={resetFilters}>
                <X className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Antrian Pembayaran
            <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-none">
              {filteredData.length} Pasien
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold">No. Registrasi</TableHead>
                  <TableHead className="font-bold">Nama Pasien</TableHead>
                  <TableHead className="font-bold">Poli / Unit</TableHead>
                  <TableHead className="font-bold">Penjamin</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="text-right font-bold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.noReg} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">
                        <div className="text-sm">{item.noReg}</div>
                        <div className="text-[10px] text-muted-foreground">RM: {item.noRM}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-sm">{item.namaPasien}</div>
                        <div className="text-[10px] text-muted-foreground">{item.tanggal}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{item.poli}</div>
                        <div className="text-[10px] text-muted-foreground">{item.dokter}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal border-primary/20 bg-primary/5">
                          {item.penjamin}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={cn(
                            "text-[10px] font-medium border-none",
                            item.status === "Terkunci" ? "bg-red-100 text-red-700 hover:bg-red-100" : 
                            item.status === "Terbuka" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                            "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          )}
                          variant="secondary"
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/kasir/${item.noReg}`}>
                          <Button size="sm" className="h-8 gap-2">
                             Proses
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 opacity-20" />
                        <p>Data tidak ditemukan dengan filter tersebut.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
