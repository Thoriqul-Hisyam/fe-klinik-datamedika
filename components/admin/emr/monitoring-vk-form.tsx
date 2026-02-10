"use client";

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Printer, Save, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VKLog {
  id: string;
  jam: string;
  djj: string;
  his: string;
  nadi: string;
  suhu: string;
  ketuban: string;
  moulage: string;
}

interface MonitoringVKFormProps {
  noReg?: string;
  patientData?: {
    noRM: string;
    nama: string;
    tanggalLahir: string;
    jenisKelamin: string;
  };
}

const mockVKLogs: VKLog[] = [
  { id: "1", jam: "04:00", djj: "140", his: "2x/10'/30\"", nadi: "82", suhu: "36.4", ketuban: "Utuh", moulage: "0" },
  { id: "2", jam: "04:30", djj: "142", his: "2x/10'/35\"", nadi: "84", suhu: "-", ketuban: "Utuh", moulage: "0" },
];

export function MonitoringVKForm({ noReg, patientData }: MonitoringVKFormProps) {
  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["monitoring-vk-logs", noReg],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return mockVKLogs;
    },
    enabled: !!noReg,
    initialData: mockVKLogs, // Fallback to mock if noReg is not provided for demo
  });

  const columns = useMemo<ColumnDef<VKLog>[]>(
    () => [
      {
        accessorKey: "jam",
        header: "Jam",
        cell: (info) => <span className="font-bold text-xs">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "djj",
        header: "DJJ (x/m)",
        cell: (info) => <span className="text-blue-600 font-bold">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "his",
        header: "HIS (Kontraksi)",
        cell: (info) => <span className="text-orange-600 font-bold">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "nadi",
        header: "Nadi",
        cell: (info) => <span className="text-xs">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "suhu",
        header: "Suhu",
        cell: (info) => <span className="text-xs">{info.getValue() as string}</span>,
      },
      {
        header: "Ketuban/Penyusupan",
        cell: (info) => {
          const item = info.row.original;
          return <span className="text-xs">{item.ketuban} / {item.moulage}</span>;
        },
      },
      {
        id: "actions",
        cell: () => (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: logs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetAll: false,
  });

  const handlePrint = () => {
    if (!patientData || !noReg) {
      alert("Data pasien tidak lengkap untuk cetak.");
      return;
    }
    
    const printData = {
      title: "Monitoring Observasi VK",
      patientData: {
        ...patientData,
        noReg
      },
      htmlContent: `
        <div class="mt-6">
          <table class="w-full border-collapse border border-black text-[10px]">
             <thead class="bg-gray-100">
               <tr>
                 <th class="border border-black p-2 uppercase">Jam</th>
                 <th class="border border-black p-2 uppercase">DJJ</th>
                 <th class="border border-black p-2 uppercase">Kontraksi (HIS)</th>
                 <th class="border border-black p-2 uppercase">Nadi</th>
                 <th class="border border-black p-2 uppercase">Suhu</th>
                 <th class="border border-black p-2 uppercase">Ketuban/Moulage</th>
               </tr>
             </thead>
             <tbody>
               ${logs.map(log => `
                 <tr>
                   <td class="border border-black p-2 font-bold">${log.jam}</td>
                   <td class="border border-black p-2 text-center text-blue-800 font-bold">${log.djj}</td>
                   <td class="border border-black p-2 text-center text-orange-800">${log.his}</td>
                   <td class="border border-black p-2 text-center">${log.nadi}</td>
                   <td class="border border-black p-2 text-center">${log.suhu}</td>
                   <td class="border border-black p-2 text-center">${log.ketuban} / ${log.moulage}</td>
                 </tr>
               `).join('')}
             </tbody>
           </table>
           <div class="mt-8 p-4 border border-black text-[10px] italic bg-gray-50">
             Lembar observasi ini digunakan untuk mencatat kemajuan persalinan di luar fase aktif partograf atau untuk pemantauan ketat instruksi dokter.
           </div>
         </div>
       `
    };

    sessionStorage.setItem("lastEMRPrintData", JSON.stringify(printData));
    window.open("/emr-print", "_blank");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-primary">Monitoring Observasi VK</h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Fase Laten & Observasi Lanjutan</p>
        </div>
        <Button variant="outline" size="sm" onClick={handlePrint} className="h-8 gap-2 border-primary/20 text-primary">
          <Printer className="h-3.5 w-3.5" />
          Cetak Log
        </Button>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-[10px] uppercase font-bold tracking-widest">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p className="text-xs text-muted-foreground font-medium">Memuat data monitoring...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground italic text-xs">
                  Belum ada data monitoring.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-primary/5 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
            <TableRow className="bg-muted/5">
                <TableCell colSpan={columns.length} className="p-0">
                    <Button variant="ghost" className="w-full h-12 gap-2 text-primary font-bold uppercase text-[10px] tracking-widest hover:bg-primary/10 rounded-none border-t">
                        <Plus className="h-4 w-4" /> Tambah Baris Observasi
                    </Button>
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end p-4 border-t gap-3">
        <Button className="gap-2 rounded-xl px-10 shadow-lg font-bold">
          <Save className="h-4 w-4" />
          Simpan Monitoring
        </Button>
      </div>
    </div>
  );
}
