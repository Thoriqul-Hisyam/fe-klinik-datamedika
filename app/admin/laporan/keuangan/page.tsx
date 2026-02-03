"use client";

import { useState } from "react";
import {
  Download,
  Filter,
  DollarSign,
  CreditCard,
  Wallet,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Calendar as CalendarIcon,
} from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for financial transactions
const transactions = [
  {
    id: "TXN001",
    invoice: "INV/20260120/001",
    nama: "Ahmad Rizki",
    poli: "Poli Umum",
    tanggal: "2026-01-20 09:30",
    metode: "Tunai",
    nominal: 150000,
    status: "lunas",
  },
  {
    id: "TXN002",
    invoice: "INV/20260120/002",
    nama: "Siti Nurhaliza",
    poli: "Poli Gigi",
    tanggal: "2026-01-20 10:15",
    metode: "Transfer",
    nominal: 350000,
    status: "lunas",
  },
  {
    id: "TXN003",
    invoice: "INV/20260121/001",
    nama: "Dewi Lestari",
    poli: "Poli Anak",
    tanggal: "2026-01-21 11:00",
    metode: "BPJS",
    nominal: 125000,
    status: "proses-klaim",
  },
  {
    id: "TXN004",
    invoice: "INV/20260121/002",
    nama: "Eko Prasetyo",
    poli: "Poli Umum",
    tanggal: "2026-01-21 14:20",
    metode: "Kartu Debit",
    nominal: 275000,
    status: "lunas",
  },
  {
    id: "TXN005",
    invoice: "INV/20260122/001",
    nama: "Fitri Handayani",
    poli: "Poli Kandungan",
    tanggal: "2026-01-22 08:45",
    metode: "Tunai",
    nominal: 200000,
    status: "lunas",
  },
];

export default function FinanceReportPage() {
  const [search, setSearch] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);

  const filteredData = transactions.filter(
    (t) => {
      const matchesSearch = t.nama.toLowerCase().includes(search.toLowerCase()) ||
                           t.invoice.toLowerCase().includes(search.toLowerCase());
      const txnDate = t.tanggal.split(" ")[0];
      const matchesDate = (!dateFrom || txnDate >= dateFrom) && 
                         (!dateTo || txnDate <= dateTo);
      return matchesSearch && matchesDate;
    }
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Laporan Keuangan</h1>
          <p className="text-sm text-muted-foreground">
            Rekap pendapatan, metode pembayaran, dan rincian transaksi
          </p>
        </div>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Total Pendapatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 45.230.000</div>
            <p className="text-xs text-green-500 flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8.4% bulan ini
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Pembayaran Tunai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold italic">Rp 12.450.000</div>
            <p className="text-xs text-muted-foreground mt-1">27.5% dari total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Non-Tunai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold italic text-blue-600">Rp 18.780.000</div>
            <p className="text-xs text-muted-foreground mt-1">41.5% dari total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Klaim BPJS/Asuransi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold italic text-orange-600">Rp 14.000.000</div>
            <p className="text-xs text-muted-foreground mt-1">31% dari total</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari Invoice atau Pasien..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[160px] justify-start text-left font-normal",
                  !dateFrom && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFrom ? format(new Date(dateFrom), "dd MMM yyyy") : <span>Dari Tanggal</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFrom ? new Date(dateFrom) : undefined}
                onSelect={(date) => setDateFrom(date ? format(date, "yyyy-MM-dd") : "")}
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
                  "w-[160px] justify-start text-left font-normal",
                  !dateTo && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateTo ? format(new Date(dateTo), "dd MMM yyyy") : <span>Sampai Tanggal</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateTo ? new Date(dateTo) : undefined}
                onSelect={(date) => setDateTo(date ? format(date, "yyyy-MM-dd") : "")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="secondary" size="sm" className="h-10">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-medium">Daftar Transaksi</CardTitle>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">Real-time update</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>No. Invoice</TableHead>
                <TableHead>Nama Pasien</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead className="text-right">Nominal</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.invoice}</TableCell>
                  <TableCell className="font-medium text-sm">{t.nama}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{t.tanggal}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-xs">
                      {t.metode === "Tunai" && <Wallet className="h-3.5 w-3.5 mr-2 text-green-600" />}
                      {t.metode.includes("Kartu") && <CreditCard className="h-3.5 w-3.5 mr-2 text-blue-600" />}
                      {t.metode === "BPJS" && <ShieldCheck className="h-3.5 w-3.5 mr-2 text-primary" />}
                      {t.metode === "Transfer" && <TrendingUp className="h-3.5 w-3.5 mr-2 text-purple-600" />}
                      {t.metode}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(t.nominal)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={t.status === "lunas" ? "success" : "warning"}
                      className="capitalize text-[10px] py-0"
                    >
                      {t.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-4 py-4 border-t font-medium text-sm bg-muted/20">
            <span>Total Filtered</span>
            <span className="text-lg text-primary">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(filteredData.reduce((acc, curr) => acc + curr.nominal, 0))}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Simple internal icon component for ShieldCheck if not imported or different name
function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
