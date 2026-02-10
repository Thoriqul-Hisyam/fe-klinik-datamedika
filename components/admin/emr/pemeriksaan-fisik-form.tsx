"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, Printer, Stethoscope } from "lucide-react";

interface PemeriksaanFisikFormProps {
  noReg?: string;
  patientData?: {
    noRM: string;
    nama: string;
    tanggalLahir: string;
    jenisKelamin: string;
  };
}

export function PemeriksaanFisikForm({ noReg, patientData }: PemeriksaanFisikFormProps) {
  const [data, setData] = useState({
    kesadaran: "Compos Mentis",
    kepala: "Normocephal, tidak ada benjolan",
    mata: "Konjungtiva anemis (-/-), Sklera ikterik (-/-)",
    leher: "Pembesaran KGB (-), JVP normal",
    thoraks: "Cor: S1 S2 reguler, bising (-). Pulmo: Vesikuler (+/+), Ronkhi (-/-), Wheezing (-/-)",
    abdomen: "Supel, bising usus (+) normal, nyeri tekan (-) epigastrium",
    ekstremitas: "Akral hangat, edema (-/-), CRT < 2 detik",
    catatanTambahan: "",
  });

  const handlePrint = () => {
    if (!patientData || !noReg) {
      alert("Data pasien tidak lengkap untuk cetak.");
      return;
    }
    
    const printData = {
      title: "Pemeriksaan Fisik (Head-to-Toe)",
      patientData: {
        ...patientData,
        noReg
      },
      htmlContent: `
        <div class="mt-6 space-y-4">
          <div class="border border-black p-2 bg-gray-50 flex items-center gap-4">
            <span class="text-[10px] font-bold uppercase w-32">Kesadaran:</span>
            <span class="text-xs font-bold">${data.kesadaran}</span>
          </div>

          <table class="w-full border-collapse border border-black text-xs">
            <tr>
              <td class="border border-black p-2 font-bold w-1/3 bg-gray-50 uppercase text-[10px]">Kepala & Leher</td>
              <td class="border border-black p-2">${data.kepala}, ${data.leher}</td>
            </tr>
            <tr>
              <td class="border border-black p-2 font-bold bg-gray-50 uppercase text-[10px]">Mata</td>
              <td class="border border-black p-2">${data.mata}</td>
            </tr>
            <tr>
              <td class="border border-black p-2 font-bold bg-gray-50 uppercase text-[10px]">Thoraks (Cor/Pulmo)</td>
              <td class="border border-black p-2">${data.thoraks}</td>
            </tr>
            <tr>
              <td class="border border-black p-2 font-bold bg-gray-50 uppercase text-[10px]">Abdomen</td>
              <td class="border border-black p-2">${data.abdomen}</td>
            </tr>
            <tr>
              <td class="border border-black p-2 font-bold bg-gray-50 uppercase text-[10px]">Ekstremitas</td>
              <td class="border border-black p-2">${data.ekstremitas}</td>
            </tr>
          </table>

          <div class="border border-black p-3 text-xs min-h-[100px]">
            <p class="font-bold border-b border-black pb-1 mb-2 uppercase text-[10px]">Catatan Tambahan:</p>
            <p class="leading-relaxed whitespace-pre-wrap">${data.catatanTambahan || '-'}</p>
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
          <div className="bg-primary/10 p-2 rounded-xl">
             <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-primary">Pemeriksaan Fisik (Head to Toe)</h3>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Objective Assessment</p>
          </div>
        </div>
        <div className="flex gap-2">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-3 font-bold text-[10px]">VERIFIED</Badge>
            <Button variant="outline" size="sm" onClick={handlePrint} className="h-8 gap-2 border-primary/20 text-primary">
                <Printer className="h-3.5 w-3.5" />
                Cetak Fisik
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card border rounded-2xl p-6 shadow-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Kesadaran / Keadaan Umum</Label>
            <Input value={data.kesadaran} onChange={(e) => setData({...data, kesadaran: e.target.value})} className="rounded-xl border-muted-foreground/20 focus:border-primary" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Kepala & Leher</Label>
            <Textarea value={`${data.kepala}\n${data.leher}`} onChange={(e) => {}} className="rounded-xl border-muted-foreground/20 min-h-[80px]" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mata</Label>
            <Input value={data.mata} onChange={(e) => setData({...data, mata: e.target.value})} className="rounded-xl border-muted-foreground/20" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Abdomen</Label>
            <Input value={data.abdomen} onChange={(e) => setData({...data, abdomen: e.target.value})} className="rounded-xl border-muted-foreground/20" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Thoraks (Jantung & Paru)</Label>
            <Textarea value={data.thoraks} onChange={(e) => setData({...data, thoraks: e.target.value})} className="rounded-xl border-muted-foreground/20 min-h-[80px]" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Ekstremitas</Label>
            <Input value={data.ekstremitas} onChange={(e) => setData({...data, ekstremitas: e.target.value})} className="rounded-xl border-muted-foreground/20" />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2 pt-2 border-t mt-2">
             <Label className="text-[10px] font-black uppercase tracking-widest text-primary">Catatan Tambahan / Lain-lain</Label>
             <Textarea value={data.catatanTambahan} placeholder="Ketik temuan fisik lainnya (misal: integumen, neurologis, dll)..." onChange={(e) => setData({...data, catatanTambahan: e.target.value})} className="rounded-xl border-primary/20 bg-primary/5 min-h-[100px]" />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button className="rounded-xl px-12 font-bold shadow-lg shadow-primary/20">
          <Save className="h-4 w-4 mr-2" />
          Simpan Pemeriksaan
        </Button>
      </div>
    </div>
  );
}
