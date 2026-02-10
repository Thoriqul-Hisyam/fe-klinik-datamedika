"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer, Save, Plus, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PartografDigitalProps {
  noReg?: string;
  patientData?: {
    noRM: string;
    nama: string;
    tanggalLahir: string;
    jenisKelamin: string;
  };
}

export function PartografDigital({ noReg, patientData }: PartografDigitalProps) {
  const [observations, setObservations] = useState([
    { jam: "08:00", pembukaan: "4", penurunan: "3/5", djj: "140", his: "3/10'/35\"", darah: "120/80", nadi: "88", suhu: "36.5" },
    { jam: "12:00", pembukaan: "7", penurunan: "2/5", djj: "144", his: "4/10'/40\"", darah: "110/70", nadi: "92", suhu: "36.7" },
  ]);

  const handlePrint = () => {
    if (!patientData || !noReg) {
      alert("Data pasien tidak lengkap untuk cetak.");
      return;
    }
    
    const printData = {
      title: "Partograf Digital",
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
                <th class="border border-black p-2 uppercase">Pembukaan</th>
                <th class="border border-black p-2 uppercase">Penurunan</th>
                <th class="border border-black p-2 uppercase">DJJ</th>
                <th class="border border-black p-2 uppercase">HIS</th>
                <th class="border border-black p-2 uppercase">TD</th>
                <th class="border border-black p-2 uppercase">N/S</th>
              </tr>
            </thead>
            <tbody>
              ${observations.map(obs => `
                <tr>
                  <td class="border border-black p-2 font-bold">${obs.jam}</td>
                  <td class="border border-black p-2 text-center font-black">${obs.pembukaan} cm</td>
                  <td class="border border-black p-2 text-center">${obs.penurunan}</td>
                  <td class="border border-black p-2 text-center">${obs.djj}</td>
                  <td class="border border-black p-2">${obs.his}</td>
                  <td class="border border-black p-2 text-center font-bold">${obs.darah}</td>
                  <td class="border border-black p-2 text-center">${obs.nadi}/${obs.suhu}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="mt-8 border border-black p-4 min-h-[100px] flex items-center justify-center text-xs italic text-gray-400">
            [ Area Lampiran Grafik Partograf Manual / Cetakan Visualizer ]
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
          <h3 className="text-sm font-black uppercase tracking-widest text-primary">Partograf Digital</h3>
          <p className="text-xs text-muted-foreground mt-1">Pemantauan kemajuan persalinan fase aktif</p>
        </div>
        <div className="flex gap-2">
            <Badge variant="outline" className="h-8 border-green-200 text-green-600 bg-green-50 px-3 font-bold uppercase tracking-widest text-[10px]">Fase Aktif</Badge>
            <Button variant="outline" size="sm" onClick={handlePrint} className="h-8 gap-2 border-primary/20 text-primary">
            <Printer className="h-3.5 w-3.5" />
            Cetak Partograf
            </Button>
        </div>
      </div>

      {/* Partograf Chart Mockup (Visual Representation) */}
      <div className="bg-card border rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[300px] border-dashed border-primary/30 bg-primary/5">
         <Activity className="h-12 w-12 text-primary/30 mb-4 animate-pulse" />
         <h4 className="font-bold text-primary italic">Visualisasi Grafik Partograf</h4>
         <p className="text-xs text-muted-foreground max-w-md text-center mt-1">Grafik kemajuan persalinan secara otomatis dihasilkan dari tabel observasi di bawah ini untuk memudahkan pemantauan Garis Waspada dan Garis Bertindak.</p>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider">Jam</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider">Pembukaan (cm)</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider">Penurunan</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider">DJJ</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider">Kontraksi</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider">Tanda Vital</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {observations.map((obs, idx) => (
              <TableRow key={idx} className="hover:bg-primary/5">
                <TableCell className="font-bold text-xs">{obs.jam}</TableCell>
                <TableCell className="text-sm font-black text-primary">{obs.pembukaan}</TableCell>
                <TableCell className="text-xs">{obs.penurunan}</TableCell>
                <TableCell className="text-xs font-medium text-blue-600">{obs.djj}</TableCell>
                <TableCell className="text-xs text-orange-600 font-medium">{obs.his}</TableCell>
                <TableCell className="text-[10px] leading-tight group">
                   <div className="flex flex-col">
                      <span className="font-bold">TD: {obs.darah}</span>
                      <span>N: {obs.nadi} | S: {obs.suhu}</span>
                   </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/10 border-t-2">
               <TableCell colSpan={6}>
                  <Button variant="ghost" size="sm" className="w-full h-10 gap-2 text-primary font-bold uppercase text-[10px] tracking-widest hover:bg-primary/10">
                    <Plus className="h-4 w-4" /> Tambah Observasi
                  </Button>
               </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end p-4 border-t">
        <Button className="gap-2 rounded-xl px-8 shadow-lg font-bold">
          <Save className="h-4 w-4" />
          Simpan Partograf
        </Button>
      </div>
    </div>
  );
}
