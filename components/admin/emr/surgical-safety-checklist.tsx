"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, Save } from "lucide-react";

interface SurgicalSafetyChecklistProps {
  noReg?: string;
  patientData?: {
    noRM: string;
    nama: string;
    tanggalLahir: string;
    jenisKelamin: string;
  };
}

export function SurgicalSafetyChecklist({ noReg, patientData }: SurgicalSafetyChecklistProps) {
  const [checklist, setChecklist] = useState({
    signIn: {
      identitas: true,
      lokasi: true,
      prosedur: true,
      persetujuan: true,
      mesinAnestesi: true,
      pulseOximeter: true,
      riwayatAlergi: false,
    },
    timeOut: {
      konfirmasiTim: true,
      konfirmasiIdentitas: true,
      antibiotik: false,
      masalahPeralatan: false,
    },
    signOut: {
      namaProsedur: true,
      jumlahKasa: true,
      labelSpesimen: false,
    }
  });

  const handlePrint = () => {
    if (!patientData || !noReg) {
      alert("Data pasien tidak lengkap untuk cetak.");
      return;
    }
    
    const renderItems = (items: any, title: string) => `
      <div class="border border-black mb-4">
        <div class="bg-gray-100 p-2 border-b border-black font-bold uppercase text-xs">${title}</div>
        <div class="p-2 space-y-1">
          ${Object.entries(items).map(([key, value]) => `
            <div class="flex items-center gap-2 text-xs">
              <div class="w-4 h-4 border border-black flex items-center justify-center font-bold">
                ${value ? '&#10003;' : ''}
              </div>
              <span class="${value ? 'font-bold' : 'text-gray-400'}">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const printData = {
      title: "Surgical Safety Checklist (WHO)",
      patientData: {
        ...patientData,
        noReg
      },
      htmlContent: `
        <div class="grid grid-cols-3 gap-4 mt-6">
          ${renderItems(checklist.signIn, "Sign In (Before Induction)")}
          ${renderItems(checklist.timeOut, "Time Out (Before Incision)")}
          ${renderItems(checklist.signOut, "Sign Out (Before Leaving)")}
        </div>
        <div class="mt-8 p-4 border border-dashed border-black text-[10px] italic">
          Seluruh item di atas telah dikonfirmasi oleh tim bedah, anestesi, dan perawat sesuai standar keselamatan pasien internasional.
        </div>
      `
    };

    sessionStorage.setItem("lastEMRPrintData", JSON.stringify(printData));
    window.open("/emr-print", "_blank");
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-primary">Surgical Safety Checklist (WHO)</h3>
          <p className="text-xs text-muted-foreground mt-1">Standar keselamatan pasien di kamar operasi</p>
        </div>
        <Button variant="outline" size="sm" onClick={handlePrint} className="h-8 gap-2 border-primary/20 text-primary">
          <Printer className="h-3.5 w-3.5" />
          Cetak Checklist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sign In */}
        <Card className="border-blue-100 bg-blue-50/10">
          <CardHeader className="bg-blue-600 text-white p-4 rounded-t-xl">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Before Induction (SIGN IN)</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {Object.keys(checklist.signIn).map((key) => (
              <div key={key} className="flex items-start space-x-3 group">
                <Checkbox 
                  id={`signin-${key}`} 
                  checked={(checklist.signIn as any)[key]} 
                  onCheckedChange={(val: boolean) => setChecklist({
                    ...checklist,
                    signIn: { ...checklist.signIn, [key]: val }
                  })}
                  className="mt-0.5 border-blue-400 data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor={`signin-${key}`} className="text-xs font-medium leading-tight group-hover:text-blue-600 cursor-pointer">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Time Out */}
        <Card className="border-orange-100 bg-orange-50/10">
          <CardHeader className="bg-orange-500 text-white p-4 rounded-t-xl">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Before Skin Incision (TIME OUT)</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {Object.keys(checklist.timeOut).map((key) => (
              <div key={key} className="flex items-start space-x-3 group">
                <Checkbox 
                  id={`timeout-${key}`} 
                  checked={(checklist.timeOut as any)[key]} 
                  onCheckedChange={(val: boolean) => setChecklist({
                    ...checklist,
                    timeOut: { ...checklist.timeOut, [key]: val }
                  })}
                  className="mt-0.5 border-orange-400 data-[state=checked]:bg-orange-500"
                />
                <Label htmlFor={`timeout-${key}`} className="text-xs font-medium leading-tight group-hover:text-orange-600 cursor-pointer">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card className="border-green-100 bg-green-50/10">
          <CardHeader className="bg-green-600 text-white p-4 rounded-t-xl">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Before Patient Leaves (SIGN OUT)</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {Object.keys(checklist.signOut).map((key) => (
              <div key={key} className="flex items-start space-x-3 group">
                <Checkbox 
                  id={`signout-${key}`} 
                  checked={(checklist.signOut as any)[key]} 
                  onCheckedChange={(val: boolean) => setChecklist({
                    ...checklist,
                    signOut: { ...checklist.signOut, [key]: val }
                  })}
                  className="mt-0.5 border-green-400 data-[state=checked]:bg-green-600"
                />
                <Label htmlFor={`signout-${key}`} className="text-xs font-medium leading-tight group-hover:text-green-600 cursor-pointer">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end p-4 border-t">
        <Button className="gap-2 rounded-xl px-8 shadow-lg font-bold">
          <Save className="h-4 w-4" />
          Simpan Checklist
        </Button>
      </div>
    </div>
  );
}
