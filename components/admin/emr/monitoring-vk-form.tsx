"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Printer, Save, Trash2 } from "lucide-react";

interface MonitoringVKFormProps {
  noReg?: string;
  patientData?: {
    noRM: string;
    nama: string;
    tanggalLahir: string;
    jenisKelamin: string;
  };
}

export function MonitoringVKForm({ noReg, patientData }: MonitoringVKFormProps) {
  const [logs, setLogs] = useState([
    { id: "1", jam: "04:00", djj: "140", his: "2x/10'/30\"", nadi: "82", suhu: "36.4", ketuban: "Utuh", moulage: "0" },
    { id: "2", jam: "04:30", djj: "142", his: "2x/10'/35\"", nadi: "84", suhu: "-", ketuban: "Utuh", moulage: "0" },
  ]);

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
            <TableRow>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">Jam</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">DJJ (x/m)</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">HIS (Kontraksi)</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">Nadi</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">Suhu</TableHead>
              <TableHead className="text-[10px] uppercase font-bold tracking-widest">Ketuban/Penyusupan</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="hover:bg-primary/5 transition-colors">
                <TableCell className="font-bold text-xs">{log.jam}</TableCell>
                <TableCell className="text-blue-600 font-bold">{log.djj}</TableCell>
                <TableCell className="text-orange-600 font-bold">{log.his}</TableCell>
                <TableCell className="text-xs">{log.nadi}</TableCell>
                <TableCell className="text-xs">{log.suhu}</TableCell>
                <TableCell className="text-xs">{log.ketuban} / {log.moulage}</TableCell>
                <TableCell>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                   </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/5">
                <TableCell colSpan={7} className="p-0">
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
