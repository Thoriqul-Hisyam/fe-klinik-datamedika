"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Printer, Save, Baby } from "lucide-react";

interface LaporanPersalinanFormProps {
  noReg?: string;
  patientData?: {
    noRM: string;
    nama: string;
    tanggalLahir: string;
    jenisKelamin: string;
  };
}

export function LaporanPersalinanForm({ noReg, patientData }: LaporanPersalinanFormProps) {
  const [data, setData] = useState({
    waktuLahir: "2026-02-10T08:30",
    jenisKelamin: "Laki-laki",
    beratBadan: "3200",
    panjangBadan: "50",
    lingkarKepala: "34",
    apgar1: "8",
    apgar5: "9",
    apgar10: "10",
    plasenta: "Lengkap, spontan jam 08.45",
    perineum: "Ruptur Grade 2, dijahit dengan Jeltrate",
    tindakan: "Persalinan spontan pervaginam, dipimpin meneran sesuai instruksi.",
  });

  const handlePrint = () => {
    if (!patientData || !noReg) {
      alert("Data pasien tidak lengkap untuk cetak.");
      return;
    }
    
    const printData = {
      title: "Laporan Persalinan & Bayi Baru Lahir",
      patientData: {
        ...patientData,
        noReg
      },
      htmlContent: `
        <div class="mt-6 space-y-6">
          <div class="border border-black">
            <h4 class="bg-gray-100 p-2 font-bold text-xs uppercase border-b border-black">Kondisi Bayi Baru Lahir</h4>
            <div class="p-3 grid grid-cols-2 gap-4 text-xs">
              <div class="grid grid-cols-[120px_1fr]"><span>Waktu Lahir</span><span class="font-bold">: ${data.waktuLahir.replace('T', ' ')}</span></div>
              <div class="grid grid-cols-[120px_1fr]"><span>Jenis Kelamin</span><span class="font-bold">: ${data.jenisKelamin}</span></div>
              <div class="grid grid-cols-[120px_1fr]"><span>Berat Badan</span><span>: ${data.beratBadan} gram</span></div>
              <div class="grid grid-cols-[120px_1fr]"><span>Panjang Badan</span><span>: ${data.panjangBadan} cm</span></div>
              <div class="grid grid-cols-[120px_1fr]"><span>Lingkar Kepala</span><span>: ${data.lingkarKepala} cm</span></div>
              <div class="grid grid-cols-[120px_1fr] bg-gray-50 p-1 border border-black font-bold">
                <span>APGAR Score</span><span>: ${data.apgar1} / ${data.apgar5} / ${data.apgar10}</span>
              </div>
            </div>
          </div>

          <div class="border border-black">
            <h4 class="bg-gray-100 p-2 font-bold text-xs uppercase border-b border-black">Kondisi Ibu & Persalinan</h4>
            <div class="p-3 text-xs space-y-2">
              <div class="grid grid-cols-[120px_1fr]"><span>Placenta / Selaput</span><span>: ${data.plasenta}</span></div>
              <div class="grid grid-cols-[120px_1fr]"><span>Jalan Lahir</span><span>: ${data.perineum}</span></div>
              <div class="mt-2">
                <p class="font-bold uppercase text-[10px] border-b border-black mb-1">Rangkuman Tindakan:</p>
                <p class="p-2 border border-black bg-gray-50 min-h-[60px] leading-relaxed">${data.tindakan}</p>
              </div>
            </div>
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
        <div className="flex items-center gap-3">
          <div className="bg-pink-100 p-2 rounded-xl">
             <Baby className="h-5 w-5 text-pink-600" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Laporan Persalinan & Bayi</h3>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Partus Report</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handlePrint} className="h-8 gap-2 border-primary/20 text-primary">
          <Printer className="h-3.5 w-3.5" />
          Cetak Laporan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card border rounded-2xl p-6 shadow-sm">
        {/* Detail Bayi */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary border-b pb-1">Kondisi Bayi Baru Lahir</h4>
          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Waktu Kelahiran</Label>
                <Input type="datetime-local" value={data.waktuLahir} onChange={(e) => setData({...data, waktuLahir: e.target.value})} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">JK Bayi</Label>
                <Input value={data.jenisKelamin} onChange={(e) => setData({...data, jenisKelamin: e.target.value})} className="rounded-xl" />
              </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">BB (gram)</Label>
                <Input value={data.beratBadan} onChange={(e) => setData({...data, beratBadan: e.target.value})} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">PB (cm)</Label>
                <Input value={data.panjangBadan} onChange={(e) => setData({...data, panjangBadan: e.target.value})} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">LK (cm)</Label>
                <Input value={data.lingkarKepala} onChange={(e) => setData({...data, lingkarKepala: e.target.value})} className="rounded-xl" />
              </div>
          </div>
          <div className="grid grid-cols-3 gap-2 bg-muted/30 p-3 rounded-xl">
              <div className="space-y-1 text-center">
                <Label className="text-[9px] font-black uppercase text-muted-foreground">APGAR 1'</Label>
                <Input value={data.apgar1} className="h-8 text-center font-bold rounded-lg" />
              </div>
              <div className="space-y-1 text-center">
                <Label className="text-[9px] font-black uppercase text-muted-foreground">APGAR 5'</Label>
                <Input value={data.apgar5} className="h-8 text-center font-bold rounded-lg" />
              </div>
              <div className="space-y-1 text-center">
                <Label className="text-[9px] font-black uppercase text-muted-foreground">APGAR 10'</Label>
                <Input value={data.apgar10} className="h-8 text-center font-bold rounded-lg" />
              </div>
          </div>
        </div>

        {/* Detail Persalinan */}
        <div className="space-y-4 border-l pl-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary border-b pb-1">Kondisi Ibu & Placenta</h4>
            <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Placenta & Selaput</Label>
                <Input value={data.plasenta} onChange={(e) => setData({...data, plasenta: e.target.value})} className="rounded-xl" />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Perineum / Jalan Lahir</Label>
                <Input value={data.perineum} onChange={(e) => setData({...data, perineum: e.target.value})} className="rounded-xl" />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-muted-foreground">Ringkasan Tindakan</Label>
                <Textarea value={data.tindakan} onChange={(e) => setData({...data, tindakan: e.target.value})} className="rounded-xl h-24" />
            </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button className="rounded-xl px-12 font-bold shadow-lg shadow-primary/20">
          <Save className="h-4 w-4 mr-2" />
          Simpan Laporan
        </Button>
      </div>
    </div>
  );
}
