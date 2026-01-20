"use client";

import { MoreHorizontal, Eye, FileText, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for recent visits
const recentVisits = [
  {
    id: "V001",
    pasien: "Ahmad Rizki",
    noRM: "RM-2024-001",
    poli: "Poli Umum",
    dokter: "dr. Sarah",
    waktu: "08:30",
    status: "selesai",
  },
  {
    id: "V002",
    pasien: "Siti Nurhaliza",
    noRM: "RM-2024-015",
    poli: "Poli Gigi",
    dokter: "drg. Budi",
    waktu: "09:00",
    status: "dalam-pemeriksaan",
  },
  {
    id: "V003",
    pasien: "Dewi Lestari",
    noRM: "RM-2024-023",
    poli: "Poli Anak",
    dokter: "dr. Rina, Sp.A",
    waktu: "09:15",
    status: "menunggu",
  },
  {
    id: "V004",
    pasien: "Eko Prasetyo",
    noRM: "RM-2024-045",
    poli: "Poli Umum",
    dokter: "dr. Ahmad",
    waktu: "09:30",
    status: "menunggu",
  },
  {
    id: "V005",
    pasien: "Fitri Handayani",
    noRM: "RM-2024-067",
    poli: "Poli Kandungan",
    dokter: "dr. Maya, Sp.OG",
    waktu: "09:45",
    status: "menunggu",
  },
  {
    id: "V006",
    pasien: "Gunawan Wibowo",
    noRM: "RM-2024-089",
    poli: "Poli Dalam",
    dokter: "dr. Hendra, Sp.PD",
    waktu: "10:00",
    status: "menunggu",
  },
];

type VisitStatus = "selesai" | "dalam-pemeriksaan" | "menunggu" | "batal";

const statusConfig: Record<
  VisitStatus,
  { label: string; variant: "default" | "secondary" | "success" | "destructive" }
> = {
  selesai: { label: "Selesai", variant: "success" },
  "dalam-pemeriksaan": { label: "Dalam Pemeriksaan", variant: "default" },
  menunggu: { label: "Menunggu", variant: "secondary" },
  batal: { label: "Batal", variant: "destructive" },
};

export function RecentVisitsTable() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Kunjungan Hari Ini
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs">
            Lihat Semua
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs h-9">No. RM</TableHead>
              <TableHead className="text-xs h-9">Pasien</TableHead>
              <TableHead className="text-xs h-9">Poli</TableHead>
              <TableHead className="text-xs h-9 hidden md:table-cell">
                Dokter
              </TableHead>
              <TableHead className="text-xs h-9 hidden sm:table-cell">
                Waktu
              </TableHead>
              <TableHead className="text-xs h-9">Status</TableHead>
              <TableHead className="text-xs h-9 w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentVisits.map((visit) => {
              const config = statusConfig[visit.status as VisitStatus];
              return (
                <TableRow key={visit.id} className="text-sm">
                  <TableCell className="py-2.5 font-mono text-xs">
                    {visit.noRM}
                  </TableCell>
                  <TableCell className="py-2.5 font-medium">
                    {visit.pasien}
                  </TableCell>
                  <TableCell className="py-2.5 text-muted-foreground">
                    {visit.poli}
                  </TableCell>
                  <TableCell className="py-2.5 text-muted-foreground hidden md:table-cell">
                    {visit.dokter}
                  </TableCell>
                  <TableCell className="py-2.5 text-muted-foreground hidden sm:table-cell">
                    {visit.waktu}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Badge
                      variant={config.variant}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                        >
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-3.5 w-3.5 mr-2" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-3.5 w-3.5 mr-2" />
                          Rekam Medis
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="h-3.5 w-3.5 mr-2" />
                          Cetak
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
