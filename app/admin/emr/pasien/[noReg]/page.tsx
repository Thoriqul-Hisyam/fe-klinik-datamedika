"use client";

import React, { useState, use } from "react";
import { VitalSignsSection } from "@/components/admin/emr/vital-signs-section";
import { CpptSection } from "@/components/admin/emr/cppt-section";
import { ClinicalDocumentation } from "@/components/admin/emr/clinical-documentation";
import { EmrTreatmentPlan } from "@/components/admin/emr/emr-treatment-plan";
import { DoctorActionBilling } from "@/components/admin/emr/doctor-action-billing";
import { OdontogramSection } from "@/components/admin/emr/odontogram-section";
import { EPrescriptionSection } from "@/components/admin/emr/e-prescription-section";
import { LaboratoryOrderSection } from "@/components/admin/emr/laboratory-order-section";
import { RadiologyOrderSection } from "@/components/admin/emr/radiology-order-section";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Edit,
  Save,
  X,
  FileText,
  Pill,
  Edit3,
  Activity,
  Stethoscope,
  AlertCircle,
  Receipt,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock patient data
const patientData = {
  noRM: "RM-2024-001",
  nik: "3201234567890001",
  nama: "Ahmad Rizki",
  tanggalLahir: "1990-05-15",
  jenisKelamin: "Laki-laki",
  golDarah: "O",
  alamat: "Jl. Merdeka No. 123, Bandung",
  telepon: "081234567890",
  pekerjaan: "Karyawan Swasta",
  alergi: ["Amoxicillin", "Kacang"],
};

// Mock visit history
const riwayatKunjungan = [
  {
    tanggal: "2024-01-10",
    poli: "Poli Umum",
    dokter: "dr. Hendra",
    diagnosis: "Common Cold",
    noReg: "REG-2024-01-10-001",
  },
  {
    tanggal: "2023-11-20",
    poli: "Farmasi",
    dokter: "Apt. Sarah",
    diagnosis: "Pengambilan Obat Rutin",
    noReg: "REG-2023-11-20-045",
  },
];

// Navigation Categories
const EMR_CATEGORIES = [
  { 
    id: "assessment", 
    label: "Assessment", 
    icon: Stethoscope,
    tabs: [
      { id: "cppt", label: "CPPT" },
      { id: "pemeriksaan", label: "Pemeriksaan" },
      { id: "vital", label: "Vital Signs" },
      { id: "odontogram", label: "Odontogram" },
    ] 
  },
  { 
    id: "penunjang", 
    label: "Penunjang", 
    icon: Activity,
    tabs: [
      { id: "laboratorium", label: "Laboratorium" },
      { id: "radiologi", label: "Radiologi" },
      { id: "dokumentasi", label: "Dokumentasi" },
    ] 
  },
  { 
    id: "terapi", 
    label: "Terapi", 
    icon: Pill,
    tabs: [
      { id: "treatment", label: "Rencana" },
      { id: "resep", label: "E-Resep" },
      { id: "billing", label: "Tindakan & Billing" },
    ] 
  },
  { 
    id: "history", 
    label: "Riwayat", 
    icon: FileText,
    tabs: [
      { id: "riwayat", label: "Riwayat Kunjungan" },
    ] 
  },
];

export default function PatientEMRDetail({
  params,
}: {
  params: Promise<{ noReg: string }>;
}) {
  const { noReg } = use(params);
  const [activeTab, setActiveTab] = useState("cppt");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    keluhan: "Pasien mengeluh nyeri tenggorokan dan demam sejak 2 hari yang lalu.",
    riwayatPenyakit: "Pasien memiliki riwayat asma di masa kecil.",
    pemeriksaanFisik: "Tenggorokan hiperemis (+), Tonsil T1-T1.",
    diagnosis: "Faringitis Akut",
    tindakan: "Pemberian antibiotik dan obat penurun panas.",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Logic to save data
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset or keep data
  };

  const activeCategory = EMR_CATEGORIES.find(cat => cat.tabs.some(tab => tab.id === activeTab)) || EMR_CATEGORIES[0];

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Patient Header Section */}
      <div className="sticky top-0 z-20 flex flex-col border-b bg-card shadow-sm">
        <div className="flex items-center gap-4 bg-muted/30 px-6 py-2">
            <Link href="/admin/emr" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
               <ArrowLeft className="h-3 w-3" /> Kembali ke List
            </Link>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
               <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">NO REG: {noReg}</span>
               <ChevronRight className="h-3 w-3" />
               <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground">KUNJUNGAN: 26 JAN 2026</span>
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
                    <span className="text-sm font-medium">{new Date(patientData.tanggalLahir).toLocaleDateString("id-ID")} (33 Thn)</span>
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
                <Button variant="outline" size="sm" onClick={handleCancel} className="h-9 px-4 rounded-full font-bold uppercase text-[10px] tracking-wider">
                  <X className="h-3.5 w-3.5 mr-2" />
                  Batal
                </Button>
                <Button size="sm" onClick={handleSave} className="h-9 px-6 rounded-full font-bold uppercase text-[10px] tracking-wider shadow-lg">
                  <Save className="h-3.5 w-3.5 mr-2" />
                  Simpan
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-9 px-6 rounded-full font-bold uppercase text-[10px] tracking-wider hover:bg-primary hover:text-white transition-all">
                <Edit className="h-3.5 w-3.5 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden px-6 py-6">
        {/* Navigation Section */}
        <div className="flex flex-col gap-4 mb-6">
            {/* Level 1: Categories */}
            <div className="flex items-center gap-2 bg-muted/20 p-1.5 rounded-2xl w-fit">
                {EMR_CATEGORIES.map((cat) => (
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
            <TabsContent value="cppt" className="mt-0 h-full">
              <CpptSection />
            </TabsContent>

            <TabsContent value="laboratorium" className="mt-0 h-full">
              <LaboratoryOrderSection />
            </TabsContent>

            <TabsContent value="radiologi" className="mt-0 h-full">
              <RadiologyOrderSection />
            </TabsContent>

            <TabsContent value="dokumentasi" className="mt-0 h-full">
              <ClinicalDocumentation />
            </TabsContent>

            <TabsContent value="pemeriksaan" className="mt-0 h-full pb-10">
              <div className="grid grid-cols-2 gap-8 max-w-6xl">
                <FormSection title="Keluhan Utama">
                  <div className="bg-card p-6 rounded-2xl border shadow-sm">
                    {isEditing ? (
                      <Textarea
                        value={formData.keluhan}
                        onChange={(e) =>
                          setFormData({ ...formData, keluhan: e.target.value })
                        }
                        rows={3}
                        className="rounded-xl border-muted-foreground/20"
                      />
                    ) : (
                      <p className="text-sm leading-relaxed">{formData.keluhan}</p>
                    )}
                  </div>
                </FormSection>

                <FormSection title="Riwayat Penyakit">
                  <div className="bg-card p-6 rounded-2xl border shadow-sm">
                    {isEditing ? (
                      <Textarea
                        value={formData.riwayatPenyakit}
                        onChange={(e) =>
                          setFormData({ ...formData, riwayatPenyakit: e.target.value })
                        }
                        rows={3}
                        className="rounded-xl border-muted-foreground/20"
                      />
                    ) : (
                      <p className="text-sm leading-relaxed">{formData.riwayatPenyakit}</p>
                    )}
                  </div>
                </FormSection>

                <FormSection title="Pemeriksaan Fisik">
                  <div className="bg-card p-6 rounded-2xl border shadow-sm h-full">
                    {isEditing ? (
                      <Textarea
                        value={formData.pemeriksaanFisik}
                        onChange={(e) =>
                          setFormData({ ...formData, pemeriksaanFisik: e.target.value })
                        }
                        rows={4}
                        className="rounded-xl border-muted-foreground/20"
                      />
                    ) : (
                      <p className="text-sm leading-relaxed">{formData.pemeriksaanFisik}</p>
                    )}
                  </div>
                </FormSection>

                <div className="space-y-8">
                    <FormSection title="Diagnosis">
                      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 shadow-sm">
                        {isEditing ? (
                          <Input
                            value={formData.diagnosis}
                            onChange={(e) =>
                              setFormData({ ...formData, diagnosis: e.target.value })
                            }
                            className="rounded-xl border-primary/20 bg-background"
                          />
                        ) : (
                          <p className="text-base font-bold text-primary">{formData.diagnosis}</p>
                        )}
                      </div>
                    </FormSection>

                    <FormSection title="Tindakan">
                      <div className="bg-card p-6 rounded-2xl border shadow-sm">
                        {isEditing ? (
                          <Textarea
                            value={formData.tindakan}
                            onChange={(e) =>
                              setFormData({ ...formData, tindakan: e.target.value })
                            }
                            rows={3}
                            className="rounded-xl border-muted-foreground/20"
                          />
                        ) : (
                          <p className="text-sm leading-relaxed">{formData.tindakan}</p>
                        )}
                      </div>
                    </FormSection>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vital" className="mt-0 h-full">
              <VitalSignsSection />
            </TabsContent>

            <TabsContent value="odontogram" className="mt-0 h-full">
              <OdontogramSection />
            </TabsContent>

            <TabsContent value="treatment" className="mt-0 h-full">
              <EmrTreatmentPlan />
            </TabsContent>

            <TabsContent value="resep" className="mt-0 h-full">
              <EPrescriptionSection patientAllergies={patientData.alergi} />
            </TabsContent>

            <TabsContent value="billing" className="mt-0 h-full">
              <DoctorActionBilling />
            </TabsContent>

            <TabsContent value="riwayat" className="mt-0 h-full">
              <div className="grid gap-4 max-w-4xl">
                {riwayatKunjungan.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-6 bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex gap-6 items-center">
                        <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center font-bold text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                           {index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-base">{item.diagnosis}</p>
                          <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded">
                                {item.noReg}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {item.poli} • {item.dokter}
                              </span>
                          </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold">
                          {new Date(item.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Tanggal Kunjungan</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

// Helper Components
function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <Label className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] ml-2">
        {title}
      </Label>
      {children}
    </div>
  );
}
