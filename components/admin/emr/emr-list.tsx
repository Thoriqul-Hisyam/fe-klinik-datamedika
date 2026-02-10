"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
  Building2,
  User,
  Volume2,
  X,
  UserCheck,
  Loader2,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Registration {
  id: string;
  noReg: string;
  noRM: string;
  nama: string;
  tanggal: string;
  poli: string;
  dokter: string;
  pembayaran: string;
  status: string;
  tipe: string; // "Rawat Jalan", "Rawat Inap", "OK", "VK"
}

// Mock data updated to include "tipe"
const mockRegistrations: Registration[] = [
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
    tipe: "Rawat Jalan",
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
    tipe: "Rawat Jalan",
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
    tipe: "Rawat Inap",
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
    tipe: "OK",
  },
  {
    id: "REG005",
    noReg: "NoReg202601201200002024050",
    noRM: "RM-2024-050",
    nama: "Budi Santoso",
    tanggal: "2026-01-21",
    poli: "Poli Kandungan",
    dokter: "dr. Siti, Sp.OG",
    pembayaran: "Umum",
    status: "periksa",
    tipe: "VK",
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

interface EMRListProps {
  serviceType: string;
  basePath: string;
}

export function EMRList({ serviceType, basePath }: EMRListProps) {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split("T")[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split("T")[0]);
  const [filterPoli, setFilterPoli] = useState("Semua Poli");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  const [filterDokter, setFilterDokter] = useState("Semua Dokter");

  const { data: registrations = [], isLoading } = useQuery({
    queryKey: ["emr-list", serviceType, dateFrom, dateTo, search, filterPoli, filterStatus, filterDokter],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return mockRegistrations.filter((reg) => {
        const matchesServiceType = reg.tipe === serviceType;
        const matchesSearch =
          reg.nama.toLowerCase().includes(search.toLowerCase()) ||
          reg.noRM.toLowerCase().includes(search.toLowerCase()) ||
          reg.noReg.toLowerCase().includes(search.toLowerCase());
        const matchesTanggal = (!dateFrom || reg.tanggal >= dateFrom) && (!dateTo || reg.tanggal <= dateTo);
        const matchesPoli = filterPoli === "Semua Poli" || reg.poli === filterPoli;
        const matchesStatus = filterStatus === "Semua Status" || reg.status === filterStatus;
        const matchesDokter = filterDokter === "Semua Dokter" || reg.dokter === filterDokter;

        return matchesServiceType && matchesSearch && matchesTanggal && matchesPoli && matchesStatus && matchesDokter;
      });
    },
  });

  const handleCallPatient = (nama: string) => {
    alert(`Memanggil pasien: ${nama}`);
  };

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const hasActiveFilters = 
    search !== "" || 
    dateFrom !== today ||
    dateTo !== today ||
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

  const columns = useMemo<ColumnDef<Registration>[]>(
    () => [
      {
        accessorKey: "noReg",
        header: "No. Registrasi",
        cell: (info) => <span className="font-mono text-[11px]">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "noRM",
        header: "No. RM",
        cell: (info) => <span className="font-mono text-[11px] text-muted-foreground">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "nama",
        header: "Pasien",
        cell: (info) => {
          const reg = info.row.original;
          return (
            <div>
              <div className="font-semibold text-sm">{reg.nama}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant="outline" className="text-[9px] px-1 py-0 font-normal opacity-70">
                  {reg.pembayaran}
                </Badge>
              </div>
            </div>
          );
        },
      },
      {
        header: "Poli / Dokter",
        cell: (info) => {
          const reg = info.row.original;
          return (
            <div>
              <div className="text-sm font-medium">{reg.poli}</div>
              <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" />
                {reg.dokter}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as string;
          const config = statusConfig[status] || { label: status, variant: "default" };
          return (
            <Badge variant={config.variant as any} className="text-[10px] px-2 py-0.5 font-medium rounded-full">
              {config.label}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">Aksi</div>,
        cell: (info) => {
          const reg = info.row.original;
          return (
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
                <Link href={`${basePath}/${reg.noReg}`}>
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  RME
                </Link>
              </Button>
            </div>
          );
        },
      },
    ],
    [basePath]
  );

  const table = useReactTable({
    data: registrations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetAll: false,
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div className="space-y-6">
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
                    }}
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
                    }}
                  />
                </PopoverContent>
              </Popover>

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
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-[11px] font-bold uppercase tracking-wider">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Memuat data...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-primary/5 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground italic">
                      Tidak ada pasien ditemukan untuk filter ini.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground px-2">
             <div>
                Showing {table.getRowModel().rows.length} of {registrations.length} patients
             </div>
             <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium text-foreground">
                  {table.getState().pagination.pageIndex + 1}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
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
