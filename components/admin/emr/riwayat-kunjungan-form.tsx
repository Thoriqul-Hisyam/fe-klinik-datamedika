"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, ChevronRight } from "lucide-react";

export function RiwayatKunjunganForm() {
  const history = [
    { tanggal: "2025-12-01", poli: "Poli Umum", dokter: "dr. Andi", diagnosa: "Common Cold", status: "Selesai" },
    { tanggal: "2025-10-15", poli: "Poli Gigi", dokter: "drg. Budi", diagnosa: "Pulpitis", status: "Selesai" },
    { tanggal: "2025-08-20", poli: "IGD", dokter: "dr. Citra", diagnosa: "Gastritis Akut", status: "Selesai" },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-primary">Riwayat Kunjungan Pasien</h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Patient Encounter History</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">Tanggal</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">Unit / Layanan</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">Dokter</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">Diagnosa Utama</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item, idx) => (
              <TableRow key={idx} className="hover:bg-primary/5 transition-colors cursor-pointer group">
                <TableCell className="font-bold text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {item.tanggal}
                  </div>
                </TableCell>
                <TableCell className="text-xs font-medium">{item.poli}</TableCell>
                <TableCell className="text-xs">{item.dokter}</TableCell>
                <TableCell className="text-xs italic text-muted-foreground">{item.diagnosa}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200">
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-bold text-blue-900">Informasi Riwayat</p>
          <p className="text-[10px] text-blue-700 leading-relaxed">
            Klik pada baris kunjungan untuk melihat detil rekam medis pada tanggal tersebut secara lengkap (CPPT, Resep, Penunjang).
          </p>
        </div>
      </div>
    </div>
  );
}
