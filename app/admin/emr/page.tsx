"use client";

import React, { useState } from "react";
import { VitalSignsSection } from "@/components/admin/emr/vital-signs-section";
import { CpptSection } from "@/components/admin/emr/cppt-section";
import { EmrTreatmentPlan } from "@/components/admin/emr/emr-treatment-plan";
import { DoctorActionBilling } from "@/components/admin/emr/doctor-action-billing";
import { OdontogramSection } from "@/components/admin/emr/odontogram-section";
import { EPrescriptionSection } from "@/components/admin/emr/e-prescription-section";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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
  pembayaran: "BPJS",
  noBPJS: "0001234567890",
  alergi: ["Penisilin", "Seafood"],
};

// Mock medical record data
const rekamMedisData = {
  keluhan: "Demam tinggi sejak 3 hari yang lalu, disertai batuk dan pilek.",
  riwayatPenyakit: "Hipertensi (terkontrol), Diabetes Mellitus Tipe 2",
  tekananDarah: "130/85",
  suhu: "38.5",
  nadi: "88",
  pernapasan: "20",
  beratBadan: "75",
  tinggiBadan: "170",
  pemeriksaanFisik: "Tenggorokan merah, tonsil membesar",
  diagnosis: "Faringitis Akut (J02.9)",
  tindakan: "Pemeriksaan fisik, Pemeriksaan swab test",
};

const riwayatKunjungan = [
  { tanggal: "2026-01-15", poli: "Poli Umum", diagnosis: "ISPA", dokter: "dr. Sarah" },
  { tanggal: "2025-12-10", poli: "Poli Umum", diagnosis: "Dispepsia", dokter: "dr. Ahmad" },
  { tanggal: "2025-11-05", poli: "Poli Dalam", diagnosis: "Hipertensi", dokter: "dr. Hendra, Sp.PD" },
];

const resepObat = [
  { nama: "Paracetamol 500mg", dosis: "3x1", jumlah: "15 tablet", aturan: "Sesudah makan" },
  { nama: "Ambroxol 30mg", dosis: "3x1", jumlah: "15 tablet", aturan: "Sesudah makan" },
  { nama: "Vitamin C 500mg", dosis: "1x1", jumlah: "10 tablet", aturan: "Pagi hari" },
];

export default function EMRPage() {
  const [activeTab, setActiveTab] = useState("pemeriksaan");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(rekamMedisData);

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(rekamMedisData);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Left Sidebar - Patient Info */}
      <aside className="w-72 shrink-0 border-r pr-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Patient Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h2 className="font-semibold">{patientData.nama}</h2>
                <p className="text-sm text-muted-foreground font-mono">
                  {patientData.noRM}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {patientData.pembayaran}
            </Badge>
          </div>

          {/* Patient Details */}
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-muted-foreground text-xs">NIK</p>
                <p className="font-mono text-xs">{patientData.nik}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-muted-foreground text-xs">Tanggal Lahir</p>
                <p>
                  {new Date(patientData.tanggalLahir).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {patientData.jenisKelamin} • Gol. Darah {patientData.golDarah}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-muted-foreground text-xs">Telepon</p>
                <p>{patientData.telepon}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-muted-foreground text-xs">Alamat</p>
                <p>{patientData.alamat}</p>
              </div>
            </div>
          </div>

          {/* Allergies Warning */}
          {patientData.alergi.length > 0 && (
            <div className="rounded-lg bg-destructive/10 p-3">
              <div className="flex items-center gap-2 text-destructive mb-2">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs font-medium">Alergi</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {patientData.alergi.map((item) => (
                  <Badge
                    key={item}
                    variant="destructive"
                    className="text-[10px] px-1.5"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="pt-3 border-t space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase">
              Statistik
            </p>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-muted p-2">
                <p className="text-lg font-semibold">12</p>
                <p className="text-[10px] text-muted-foreground">Kunjungan</p>
              </div>
              <div className="rounded-lg bg-muted p-2">
                <p className="text-lg font-semibold">3</p>
                <p className="text-[10px] text-muted-foreground">Tahun</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header with Actions */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Rekam Medis Elektronik</h1>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" />
                  Batal
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Simpan
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="cppt">
              <FileText className="h-4 w-4 mr-2" />
              CPPT
            </TabsTrigger>
            <TabsTrigger value="pemeriksaan">
              <Stethoscope className="h-4 w-4 mr-2" />
              Pemeriksaan
            </TabsTrigger>
            <TabsTrigger value="riwayat">
              <FileText className="h-4 w-4 mr-2" />
              Riwayat
            </TabsTrigger>
            <TabsTrigger value="resep">
              <Pill className="h-4 w-4 mr-2" />
              Resep (E-Resep)
            </TabsTrigger>
            <TabsTrigger value="treatment">
              <Edit3 className="h-4 w-4 mr-2" />
              Rencana
            </TabsTrigger>
            <TabsTrigger value="billing">
              <Receipt className="h-4 w-4 mr-2" />
              Tindakan
            </TabsTrigger>
            <TabsTrigger value="odontogram">
              <Stethoscope className="h-4 w-4 mr-2" />
              Odontogram
            </TabsTrigger>
            <TabsTrigger value="vital">
              <Activity className="h-4 w-4 mr-2" />
              Vital Signs
            </TabsTrigger>
          </TabsList>

          {/* CPPT Tab */}
          <TabsContent value="cppt">
            <CpptSection />
          </TabsContent>

          {/* Pemeriksaan Tab */}
          <TabsContent value="pemeriksaan">
            <div className="space-y-6">
              {/* Keluhan */}
              <FormSection title="Keluhan Utama">
                {isEditing ? (
                  <Textarea
                    value={formData.keluhan}
                    onChange={(e) =>
                      setFormData({ ...formData, keluhan: e.target.value })
                    }
                    rows={3}
                  />
                ) : (
                  <p className="text-sm">{formData.keluhan}</p>
                )}
              </FormSection>

              {/* Riwayat Penyakit */}
              <FormSection title="Riwayat Penyakit">
                {isEditing ? (
                  <Textarea
                    value={formData.riwayatPenyakit}
                    onChange={(e) =>
                      setFormData({ ...formData, riwayatPenyakit: e.target.value })
                    }
                    rows={2}
                  />
                ) : (
                  <p className="text-sm">{formData.riwayatPenyakit}</p>
                )}
              </FormSection>

              {/* Pemeriksaan Fisik */}
              <FormSection title="Pemeriksaan Fisik">
                {isEditing ? (
                  <Textarea
                    value={formData.pemeriksaanFisik}
                    onChange={(e) =>
                      setFormData({ ...formData, pemeriksaanFisik: e.target.value })
                    }
                    rows={3}
                  />
                ) : (
                  <p className="text-sm">{formData.pemeriksaanFisik}</p>
                )}
              </FormSection>

              {/* Diagnosis */}
              <FormSection title="Diagnosis">
                {isEditing ? (
                  <Input
                    value={formData.diagnosis}
                    onChange={(e) =>
                      setFormData({ ...formData, diagnosis: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-sm font-medium">{formData.diagnosis}</p>
                )}
              </FormSection>

              {/* Tindakan */}
              <FormSection title="Tindakan">
                {isEditing ? (
                  <Textarea
                    value={formData.tindakan}
                    onChange={(e) =>
                      setFormData({ ...formData, tindakan: e.target.value })
                    }
                    rows={2}
                  />
                ) : (
                  <p className="text-sm">{formData.tindakan}</p>
                )}
              </FormSection>
            </div>
          </TabsContent>

          {/* Riwayat Tab */}
          <TabsContent value="riwayat">
            <div className="space-y-3">
              {riwayatKunjungan.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium text-sm">{item.diagnosis}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.poli} • {item.dokter}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Resep Tab */}
          <TabsContent value="resep">
            <EPrescriptionSection patientAllergies={patientData.alergi} />
          </TabsContent>

          {/* Treatment Plan Tab */}
          <TabsContent value="treatment">
            <EmrTreatmentPlan />
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <DoctorActionBilling />
          </TabsContent>

          {/* Odontogram Tab */}
          <TabsContent value="odontogram">
            <OdontogramSection />
          </TabsContent>

          {/* Vital Tab */}
          <TabsContent value="vital">
            <VitalSignsSection />
          </TabsContent>
        </Tabs>
      </main>
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
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground uppercase tracking-wide">
        {title}
      </Label>
      {children}
    </div>
  );
}


