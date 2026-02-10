"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Printer, Save } from "lucide-react";

interface AssessmentAwalKebidananProps {
  noReg?: string;
  patientData?: {
    noRM: string;
    nama: string;
    tanggalLahir: string;
    jenisKelamin: string;
  };
}

export function AssessmentAwalKebidanan({ noReg, patientData }: AssessmentAwalKebidananProps) {
  const [data, setData] = useState({
    gravida: "2",
    para: "1",
    abortus: "0",
    hpht: "2025-05-10",
    tp: "2026-02-15",
    keluhanUtama: "Kenceng-kenceng sejak jam 03.00 pagi, keluar lendir darah.",
    riwayatPersalinan: "Anak 1: 2022, Spontan, Bidan, 3000g, Sehat.",
     Leopold1: "TFU 32cm, teraba bokong",
     Leopold2: "Punggung kanan",
     Leopold3: "Kepala",
     Leopold4: "Sudah masuk PAP",
    djj: "144 x/m, reguler",
    his: "3x dalam 10 menit, durasi 35 detik",
  });

  const handlePrint = () => {
    if (!patientData || !noReg) {
      alert("Data pasien tidak lengkap untuk cetak.");
      return;
    }
    
    const printData = {
      title: "Assessment Awal Kebidanan",
      patientData: {
        ...patientData,
        noReg
      },
      htmlContent: `
        <div class="mt-6 space-y-6">
          <div class="border border-black p-3">
            <h4 class="font-bold border-b border-black mb-2 pb-1 text-xs uppercase bg-gray-50">Riwayat Kehamilan & Persalinan Sekarang</h4>
            <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
              <div class="grid grid-cols-2">
                <span class="text-gray-600">GPA</span>
                <span class="font-bold">: G${data.gravida} P${data.para} A${data.abortus}</span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-600">HPHT</span>
                <span>: ${data.hpht}</span>
              </div>
              <div class="grid grid-cols-2">
                <span class="text-gray-600">TP</span>
                <span>: ${data.tp}</span>
              </div>
              <div class="col-span-2 mt-2">
                <span class="text-gray-600">Keluhan Utama:</span>
                <p class="mt-1 border border-black p-2 bg-gray-50 min-h-[40px]">${data.keluhanUtama}</p>
              </div>
            </div>
          </div>

          <div class="border border-black p-3">
            <h4 class="font-bold border-b border-black mb-2 pb-1 text-xs uppercase bg-gray-50">Hasil Pemeriksaan Fisik Kebidanan</h4>
            <div class="grid grid-cols-2 gap-4 text-xs">
              <div class="grid grid-cols-[80px_1fr] border-b border-gray-200 pb-1">
                <span>Leopold I</span>
                <span>: ${data.Leopold1}</span>
              </div>
              <div class="grid grid-cols-[80px_1fr] border-b border-gray-200 pb-1">
                <span>Leopold II</span>
                <span>: ${data.Leopold2}</span>
              </div>
              <div class="grid grid-cols-[80px_1fr] border-b border-gray-200 pb-1">
                <span>Leopold III</span>
                <span>: ${data.Leopold3}</span>
              </div>
              <div class="grid grid-cols-[80px_1fr] border-b border-gray-200 pb-1">
                <span>Leopold IV</span>
                <span>: ${data.Leopold4}</span>
              </div>
              <div class="grid grid-cols-[80px_1fr] mt-2 font-bold text-blue-800 print:text-black">
                <span>DJJ</span>
                <span>: ${data.djj}</span>
              </div>
              <div class="grid grid-cols-[80px_1fr] mt-2 font-bold">
                <span>HIS</span>
                <span>: ${data.his}</span>
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
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-primary">Assessment Awal Kebidanan</h3>
          <p className="text-xs text-muted-foreground mt-1">Pengkajian awal pasien masuk kamar bersalin</p>
        </div>
        <Button variant="outline" size="sm" onClick={handlePrint} className="h-8 gap-2 border-primary/20 text-primary">
          <Printer className="h-3.5 w-3.5" />
          Cetak Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Riwayat Kehamilan */}
        <div className="space-y-4 bg-card p-6 rounded-2xl border shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary border-b pb-2">Riwayat Kehamilan (G P A)</h4>
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Gravida (G)</Label>
                    <Input value={data.gravida} onChange={(e) => setData({...data, gravida: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Para (P)</Label>
                    <Input value={data.para} onChange={(e) => setData({...data, para: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Abortus (A)</Label>
                    <Input value={data.abortus} onChange={(e) => setData({...data, abortus: e.target.value})} className="rounded-xl" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">HPHT</Label>
                    <Input type="date" value={data.hpht} onChange={(e) => setData({...data, hpht: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Taksiran Persalinan (TP)</Label>
                    <Input type="date" value={data.tp} onChange={(e) => setData({...data, tp: e.target.value})} className="rounded-xl" />
                </div>
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Keluhan Utama</Label>
                <Textarea value={data.keluhanUtama} onChange={(e) => setData({...data, keluhanUtama: e.target.value})} className="rounded-xl h-20" />
            </div>
        </div>

        {/* Pemeriksaan Fisik Kebidanan */}
        <div className="space-y-4 bg-card p-6 rounded-2xl border shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary border-b pb-2">Pemeriksaan Leopold</h4>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Leopold I</Label>
                    <Input value={data.Leopold1} onChange={(e) => setData({...data, Leopold1: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Leopold II</Label>
                    <Input value={data.Leopold2} onChange={(e) => setData({...data, Leopold2: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Leopold III</Label>
                    <Input value={data.Leopold3} onChange={(e) => setData({...data, Leopold1: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Leopold IV</Label>
                    <Input value={data.Leopold4} onChange={(e) => setData({...data, Leopold2: e.target.value})} className="rounded-xl" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground font-black text-blue-600">DJJ (Fetal Heart Rate)</Label>
                    <Input value={data.djj} onChange={(e) => setData({...data, djj: e.target.value})} className="rounded-xl border-blue-200 bg-blue-50/30" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Kontraksi (HIS)</Label>
                    <Input value={data.his} onChange={(e) => setData({...data, his: e.target.value})} className="rounded-xl" />
                </div>
            </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button className="rounded-xl px-12 shadow-lg font-bold">
          <Save className="h-4 w-4 mr-2" />
          Simpan Assessment
        </Button>
      </div>
    </div>
  );
}
