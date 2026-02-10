"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Printer, Save } from "lucide-react";

interface LaporanOperasiProps {
  noReg?: string;
  patientData?: {
    noRM: string;
    nama: string;
    tanggalLahir: string;
    jenisKelamin: string;
  };
}

export function LaporanOperasi({ noReg, patientData }: LaporanOperasiProps) {
  const [report, setReport] = useState({
    diagnosaPreOp: "Apendisitis Akut",
    diagnosaPostOp: "Apendisitis Perforasi",
    prosedur: "Apendektomi Laparoskopi",
    operator: "dr. Syafira, Sp.B",
    asisten: "Ns. Farhan",
    jenisAnestesi: "General Anesthesia",
    durasi: "60 menit",
    temuan: "Apendiks tampak meradang, supuratif dengan sedikit perforasi di ujung.",
    tindakan: "Dilakukan pengangkatan apendiks, pencucian rongga perut dengan salin.",
    pendarahan: "50 cc",
    instruksiPostOp: "Puasa sampai bising usus (+), Cek DL post-op, IVFD RL 20 tpm.",
  });

  const handlePrint = () => {
    if (!patientData || !noReg) {
      alert("Data pasien tidak lengkap untuk cetak.");
      return;
    }
    
    const printData = {
      title: "Laporan Operasi",
      patientData: {
        ...patientData,
        noReg
      },
      htmlContent: `
        <div class="space-y-4 mt-6">
          <table class="w-full border-collapse border border-black text-xs">
            <tr>
              <td class="border border-black p-2 font-bold w-1/3 bg-gray-50">Diagnosa Pre-Operatif</td>
              <td class="border border-black p-2 font-bold">${report.diagnosaPreOp}</td>
            </tr>
            <tr>
              <td class="border border-black p-2 font-bold bg-gray-50">Diagnosa Post-Operatif</td>
              <td class="border border-black p-2 font-black">${report.diagnosaPostOp}</td>
            </tr>
            <tr>
              <td class="border border-black p-2 font-bold bg-gray-50">Prosedur / Tindakan</td>
              <td class="border border-black p-2">${report.prosedur}</td>
            </tr>
          </table>

          <table class="w-full border-collapse border border-black text-xs">
            <tr>
              <td class="border border-black p-2 font-bold bg-gray-50 w-32">Operator</td>
              <td class="border border-black p-2">${report.operator}</td>
              <td class="border border-black p-2 font-bold bg-gray-50 w-32">Asisten</td>
              <td class="border border-black p-2">${report.asisten}</td>
            </tr>
            <tr>
              <td class="border border-black p-2 font-bold bg-gray-50">Anestesi</td>
              <td class="border border-black p-2">${report.jenisAnestesi}</td>
              <td class="border border-black p-2 font-bold bg-gray-50">Durasi</td>
              <td class="border border-black p-2">${report.durasi}</td>
            </tr>
          </table>

          <div class="border border-black p-3 text-xs min-h-[150px]">
            <p class="font-bold border-b border-black pb-1 mb-2">TEMUAN & JALANNYA OPERASI:</p>
            <p class="leading-relaxed whitespace-pre-wrap">${report.temuan}</p>
            <p class="mt-4 font-bold border-b border-black pb-1 mb-2 uppercase">Instruksi Post-Operatif:</p>
            <p class="leading-relaxed bg-gray-50 p-2 border border-black">${report.instruksiPostOp}</p>
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
          <h3 className="text-sm font-black uppercase tracking-widest text-primary">Laporan Operasi</h3>
          <p className="text-xs text-muted-foreground mt-1">Dokumentasi detail tindakan pembedahan</p>
        </div>
        <Button variant="outline" size="sm" onClick={handlePrint} className="h-8 gap-2 border-primary/20 text-primary">
          <Printer className="h-3.5 w-3.5" />
          Cetak Laporan
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6 bg-card p-6 rounded-2xl border shadow-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Diagnosa Pre-Operatif</Label>
            <Input value={report.diagnosaPreOp} onChange={(e) => setReport({...report, diagnosaPreOp: e.target.value})} className="rounded-xl border-muted-foreground/20" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Diagnosa Post-Operatif</Label>
            <Input value={report.diagnosaPostOp} onChange={(e) => setReport({...report, diagnosaPostOp: e.target.value})} className="rounded-xl border-muted-foreground/20" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Prosedur Pembedahan</Label>
            <Input value={report.prosedur} onChange={(e) => setReport({...report, prosedur: e.target.value})} className="rounded-xl border-muted-foreground/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Operator</Label>
              <Input value={report.operator} onChange={(e) => setReport({...report, operator: e.target.value})} className="rounded-xl border-muted-foreground/20" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Asisten</Label>
              <Input value={report.asisten} onChange={(e) => setReport({...report, asisten: e.target.value})} className="rounded-xl border-muted-foreground/20" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Jenis Anestesi</Label>
              <Input value={report.jenisAnestesi} onChange={(e) => setReport({...report, jenisAnestesi: e.target.value})} className="rounded-xl border-muted-foreground/20" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lama Operasi</Label>
              <Input value={report.durasi} onChange={(e) => setReport({...report, durasi: e.target.value})} className="rounded-xl border-muted-foreground/20" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Temuan / Deskripsi</Label>
            <Textarea value={report.temuan} onChange={(e) => setReport({...report, temuan: e.target.value})} rows={3} className="rounded-xl border-muted-foreground/20" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Instruksi Post-Operatif</Label>
            <Textarea value={report.instruksiPostOp} onChange={(e) => setReport({...report, instruksiPostOp: e.target.value})} rows={3} className="rounded-xl border-primary/20 bg-primary/5" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="rounded-xl px-8 border-primary/20 text-primary font-bold">Draft</Button>
        <Button className="rounded-xl px-12 shadow-lg font-bold">
          <Save className="h-4 w-4 mr-2" />
          Kirim Laporan
        </Button>
      </div>
    </div>
  );
}
