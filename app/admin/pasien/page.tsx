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
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  X,
  UserPlus,
  Users,
  Calendar,
  Building2,
  CreditCard,
  FileText,
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

// Mock data for patient registrations
const registrationsList = [
  {
    id: "REG001",
    noReg: "NoReg202601200830152024001",
    noRM: "RM-2024-001",
    nik: "3201234567890001",
    nama: "Ahmad Rizki",
    tanggal: "2026-01-20",
    poli: "Poli Umum",
    dokter: "dr. Sarah",
    pembayaran: "BPJS",
    status: "terdaftar",
  },
  {
    id: "REG002",
    noReg: "NoReg202601200915222024015",
    noRM: "RM-2024-015",
    nik: "3201234567890002",
    nama: "Siti Nurhaliza",
    tanggal: "2026-01-20",
    poli: "Poli Gigi",
    dokter: "drg. Budi",
    pembayaran: "Umum",
    status: "dalam-antrian",
  },
  {
    id: "REG003",
    noReg: "NoReg202601201010052024023",
    noRM: "RM-2024-023",
    nik: "3201234567890003",
    nama: "Dewi Lestari",
    tanggal: "2026-01-20",
    poli: "Poli Anak",
    dokter: "dr. Rina, Sp.A",
    pembayaran: "BPJS",
    status: "selesai",
  },
  {
    id: "REG004",
    noReg: "NoReg202601201140302024045",
    noRM: "RM-2024-045",
    nik: "3201234567890004",
    nama: "Eko Prasetyo",
    tanggal: "2026-01-20",
    poli: "Poli Umum",
    dokter: "dr. Ahmad",
    pembayaran: "Asuransi",
    status: "terdaftar",
  },
  {
    id: "REG005",
    noReg: "NoReg202601201320452024067",
    noRM: "RM-2024-067",
    nik: "3201234567890005",
    nama: "Fitri Handayani",
    tanggal: "2026-01-20",
    poli: "Poli Kandungan",
    dokter: "dr. Maya, Sp.OG",
    pembayaran: "Umum",
    status: "batal",
  },
];

const poliOptions = [
  "Semua Poli",
  "Poli Umum",
  "Poli Gigi",
  "Poli Anak",
  "Poli Kandungan",
  "Poli Dalam",
  "Poli Mata",
];

const pembayaranOptions = ["Semua", "BPJS", "Umum", "Asuransi"];

type PatientRegistration = typeof registrationsList[0];
type RegistrationStatus = "terdaftar" | "dalam-antrian" | "selesai" | "batal";

const statusConfig: Record<
  RegistrationStatus,
  { label: string; variant: "default" | "secondary" | "success" | "destructive" }
> = {
  terdaftar: { label: "Terdaftar", variant: "default" },
  "dalam-antrian": { label: "Dalam Antrian", variant: "secondary" },
  selesai: { label: "Selesai", variant: "success" },
  batal: { label: "Batal", variant: "destructive" },
};

export default function PendaftaranPasienPage() {
  const [search, setSearch] = useState("");
  const [filterPoli, setFilterPoli] = useState("Semua Poli");
  const [filterPembayaran, setFilterPembayaran] = useState("Semua");
  const [filterTanggal, setFilterTanggal] = useState(new Date().toISOString().split("T")[0]);

  const { data: registrations = [], isLoading } = useQuery({
    queryKey: ["pendaftaran-pasien", search, filterPoli, filterPembayaran, filterTanggal],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return registrationsList.filter((reg) => {
        const matchesSearch =
          reg.nama.toLowerCase().includes(search.toLowerCase()) ||
          reg.noRM.toLowerCase().includes(search.toLowerCase()) ||
          reg.nik.includes(search);
        const matchesPoli =
          filterPoli === "Semua Poli" || reg.poli === filterPoli;
        const matchesPembayaran =
          filterPembayaran === "Semua" || reg.pembayaran === filterPembayaran;
        const matchesTanggal =
          !filterTanggal || reg.tanggal === filterTanggal;
        return matchesSearch && matchesPoli && matchesPembayaran && matchesTanggal;
      });
    },
  });

  const columns = useMemo<ColumnDef<PatientRegistration>[]>(
    () => [
      {
        accessorKey: "noRM",
        header: "No. RM",
        cell: (info) => <span className="font-mono text-xs">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "nik",
        header: "NIK",
        cell: (info) => <span className="font-mono text-xs text-muted-foreground">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "nama",
        header: "Nama Pasien",
        cell: (info) => <span className="font-medium text-sm">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "tanggal",
        header: "Tanggal",
        cell: (info) => (
          <span className="text-muted-foreground">
            {new Date(info.getValue() as string).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        ),
      },
      {
        accessorKey: "poli",
        header: "Poli",
      },
      {
        accessorKey: "dokter",
        header: "Dokter",
        cell: (info) => <span className="text-muted-foreground hidden lg:table-cell">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "pembayaran",
        header: "Pembayaran",
        cell: (info) => (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal">
            {info.getValue() as string}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as RegistrationStatus;
          const config = statusConfig[status];
          return (
            <Badge variant={config.variant} className="text-[10px] px-1.5 py-0">
              {config.label}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        cell: (info) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-xs">Aksi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="h-3.5 w-3.5 mr-2" />
                Lihat Detail
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-3.5 w-3.5 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <X className="h-3.5 w-3.5 mr-2" />
                Batalkan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
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

  const clearFilters = () => {
    setSearch("");
    setFilterPoli("Semua Poli");
    setFilterPembayaran("Semua");
    setFilterTanggal("");
  };

  const hasActiveFilters =
    search ||
    filterPoli !== "Semua Poli" ||
    filterPembayaran !== "Semua" ||
    filterTanggal;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Pendaftaran Pasien</h1>
          <p className="text-sm text-muted-foreground">
            Kelola pendaftaran pasien klinik
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" asChild>
            <Link href="/admin/pasien/registrasi">
              <Users className="h-4 w-4 mr-2" />
              Daftar Pasien
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari nama, RM, NIK..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="pl-9 h-9"
              />
            </div>

            {/* Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  size="sm"
                  className={cn(
                    "h-9 w-[180px] justify-start text-left font-normal",
                    !filterTanggal && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {filterTanggal ? format(new Date(filterTanggal), "dd MMM yyyy") : <span>Pilih Tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={filterTanggal ? new Date(filterTanggal) : undefined}
                  onSelect={(date) => {
                    setFilterTanggal(date ? format(date, "yyyy-MM-dd") : "");
                  }}
                />
              </PopoverContent>
            </Popover>

            {/* Poli Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Building2 className="h-4 w-4 mr-2" />
                  {filterPoli}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {poliOptions.map((poli) => (
                  <DropdownMenuItem
                    key={poli}
                    onClick={() => {
                      setFilterPoli(poli);
                    }}
                  >
                    {poli}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Payment Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <CreditCard className="h-4 w-4 mr-2" />
                  {filterPembayaran}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {pembayaranOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => {
                      setFilterPembayaran(option);
                    }}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9"
              >
                <X className="h-4 w-4 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto max-h-[calc(100vh-380px)]">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-xs h-10">
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
                        <p className="text-sm text-muted-foreground font-medium">Memuat data pendaftaran...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-32 text-center">
                      <div className="text-muted-foreground">
                        <p className="font-medium">Tidak ada data</p>
                        <p className="text-sm">
                          Coba ubah filter atau kata kunci pencarian
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="text-sm">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-2.5">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-xs text-muted-foreground">
              Showing {table.getRowModel().rows.length} of {registrations.length} data
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="text-xs font-medium px-2">
                {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
