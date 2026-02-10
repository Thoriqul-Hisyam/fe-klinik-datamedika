"use client";

import React, { useState } from "react";
import {
  User,
  Phone,
  Calendar,
  Edit,
  Save,
  X,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Printer,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface EMRTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface EMRCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  tabs: { id: string; label: string }[];
}

interface EMRDetailBaseProps {
  noReg: string;
  patientData: {
    noRM: string;
    nama: string;
    tanggalLahir: string;
    jenisKelamin: string;
    telepon: string;
    alergi: string[];
  };
  categories: EMRCategory[];
  allTabs: EMRTab[];
  basePath: string;
  title: string;
}

export function EMRDetailBase({
  noReg,
  patientData,
  categories,
  allTabs,
  basePath,
  title,
}: EMRDetailBaseProps) {
  const [activeTab, setActiveTab] = useState(categories[0].tabs[0].id);
  const [isEditing, setIsEditing] = useState(false);

  const activeCategory = categories.find(cat => cat.tabs.some(tab => tab.id === activeTab)) || categories[0];

  const handlePrint = () => {
    // Get the name of the current tab for the title
    const currentTabLabel = allTabs.find(t => t.id === activeTab)?.label || "Rekam Medis";
    
    // Preparation for general printing
    const printData = {
      title: `${title} - ${currentTabLabel}`,
      patientData: {
        ...patientData,
        noReg
      },
      htmlContent: `
        <div class="mt-8 space-y-8">
          <div class="border-b-2 border-black pb-2">
            <h1 class="text-2xl font-black uppercase tracking-tight text-center">${currentTabLabel}</h1>
            <p class="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1 text-center">Rekam Medis Elektronik Terintegrasi</p>
          </div>
          
          <div class="p-12 border border-black rounded-lg flex flex-col items-center justify-center text-center gap-6 bg-gray-50">
            <div class="w-20 h-20 bg-white border border-black rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
            </div>
            <div class="space-y-2">
              <h3 class="text-lg font-black uppercase tracking-tight">Dokumen Digital Terverifikasi</h3>
              <p class="text-xs text-gray-600 max-w-md mx-auto leading-relaxed italic">
                Seluruh data yang tercantum dalam lembar <strong>${currentTabLabel}</strong> ini telah divalidasi dan disimpan secara aman dalam basis data Sistem Informasi Klinik Data Medika.
              </p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-8 text-[10px]">
            <div class="p-4 border border-black bg-white space-y-2">
              <p class="font-black uppercase tracking-widest border-b border-black pb-1">Catatan Penting:</p>
              <p class="text-gray-800 leading-relaxed">
                Dokumen ini merupakan salinan dari rekam medis elektronik. Segala informasi bersifat rahasia (Medical Confidential) dan dilindungi oleh undang-undang.
              </p>
            </div>
            <div class="p-4 border border-black bg-white flex flex-col justify-between items-center">
               <div class="font-black uppercase tracking-widest mb-2">QR Validasi Dokumen</div>
               <div class="w-16 h-16 bg-gray-100 border border-black flex items-center justify-center text-[8px] text-gray-400 font-mono text-center px-2">
                  [ QR CODE ]
               </div>
            </div>
          </div>

          <div class="mt-12 text-center text-[10px] text-gray-400">
             Dicetak pada: ${new Date().toLocaleString("id-ID")}
          </div>
        </div>
      `,
    };

    sessionStorage.setItem("lastEMRPrintData", JSON.stringify(printData));
    window.open("/emr-print", "_blank");
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Patient Header Section */}
      <div className="sticky top-0 z-20 flex flex-col border-b bg-card shadow-sm">
        <div className="flex items-center gap-4 bg-muted/30 px-6 py-2">
            <Link href={basePath} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
               <ArrowLeft className="h-3 w-3" /> Kembali ke List
            </Link>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
               <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">NO REG: {noReg}</span>
               <ChevronRight className="h-3 w-3" />
               <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground">{title}</span>
            </div>
        </div>

        <div className="flex px-6 py-5 items-center justify-between group">
          <div className="flex items-center gap-0">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <h1 className="text-2xl font-black text-foreground tracking-tight">{patientData.nama}</h1>
                <span className="text-xs font-mono font-bold text-muted-foreground/60 bg-muted px-2 py-0.5 rounded">{patientData.noRM}</span>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Tgl Lahir / Usia</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">{new Date(patientData.tanggalLahir).toLocaleDateString("id-ID")}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Jenis Kelamin</p>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {patientData.jenisKelamin}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Kontak</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">{patientData.telepon}</span>
                  </div>
                </div>

                {patientData.alergi.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-[10px] text-destructive uppercase font-bold flex items-center gap-1 tracking-wider">
                      <AlertCircle className="h-3 w-3" /> Alergi
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {patientData.alergi.map((item) => (
                        <Badge key={item} variant="destructive" className="text-[10px] font-black px-2 py-0 h-4 uppercase tracking-tighter">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-l pl-8 h-12 items-center">
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="h-9 px-4 rounded-full font-bold uppercase text-[10px] tracking-wider">
                  <X className="h-3.5 w-3.5 mr-2" />
                  Batal
                </Button>
                <Button size="sm" onClick={() => setIsEditing(false)} className="h-9 px-6 rounded-full font-bold uppercase text-[10px] tracking-wider shadow-lg">
                  <Save className="h-3.5 w-3.5 mr-2" />
                  Simpan
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handlePrint} className="h-9 px-6 rounded-full font-bold uppercase text-[10px] tracking-wider hover:bg-primary/5 text-primary border-primary/20 transition-all">
                  <Printer className="h-3.5 w-3.5 mr-2" />
                  Cetak Dokumen
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-9 px-6 rounded-full font-bold uppercase text-[10px] tracking-wider hover:bg-primary hover:text-white transition-all">
                  <Edit className="h-3.5 w-3.5 mr-2" />
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden px-6 py-6">
        {/* Navigation Section */}
        <div className="flex flex-col gap-4 mb-6">
            {/* Level 1: Categories */}
            <div className="flex items-center gap-2 bg-muted/20 p-1.5 rounded-2xl w-fit">
                {categories.map((cat) => (
                    <Button
                        key={cat.id}
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "h-10 px-6 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all",
                            activeCategory.id === cat.id 
                                ? "bg-card text-primary shadow-sm ring-1 ring-border" 
                                : "text-muted-foreground hover:bg-muted"
                        )}
                        onClick={() => setActiveTab(cat.tabs[0].id)}
                    >
                        <cat.icon className={cn("h-4 w-4 mr-2", activeCategory.id === cat.id ? "text-primary" : "text-muted-foreground/50")} />
                        {cat.label}
                    </Button>
                ))}
            </div>

            {/* Level 2: Sub-tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-transparent border-b h-11 w-full justify-start rounded-none p-0 gap-8">
                    {activeCategory.tabs.map((tab) => (
                        <TabsTrigger 
                            key={tab.id} 
                            value={tab.id}
                            className="h-11 rounded-none border-b-2 border-transparent bg-transparent px-0 text-xs font-bold uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent transition-all"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            {allTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0 h-full">
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  );
}
