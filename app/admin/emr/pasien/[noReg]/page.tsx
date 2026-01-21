"use client";

import React, { useState, use } from "react";
import { VitalSignsSection } from "@/components/admin/emr/vital-signs-section";
import { CpptSection } from "@/components/admin/emr/cppt-section";
import { ClinicalDocumentation } from "@/components/admin/emr/clinical-documentation";
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
  ArrowLeft,
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
  { tanggal: "2026-01-15", noReg: "NoReg202601150830152024001", poli: "Poli Umum", diagnosis: "ISPA", dokter: "dr. Sarah" },
  { tanggal: "2025-12-10", noReg: "NoReg202512100915222024015", poli: "Poli Umum", diagnosis: "Dispepsia", dokter: "dr. Ahmad" },
  { tanggal: "2025-11-05", noReg: "NoReg202511051010052024023", poli: "Poli Dalam", diagnosis: "Hipertensi", dokter: "dr. Hendra, Sp.PD" },
];

export default function EMRDetailPage({ params }: { params: Promise<{ noReg: string }> }) {
  const { noReg } = use(params);
  const [activeTab, setActiveTab] = useState("cppt");
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
    <div className="flex flex-col gap-4 h-[calc(100vh-6rem)]">
      {/* Top Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/emr">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Daftar
          </Link>
        </Button>
        <div className="h-4 w-px bg-border" />
        <h1 className="text-xl font-semibold">Rekam Medis Elektronik</h1>
      </div>

      <div className="flex gap-6 flex-1 overflow-hidden">
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

            {/* Registration Info */}
            <div className="rounded-lg bg-primary/5 p-3 border border-primary/10">
              <p className="text-[10px] text-muted-foreground uppercase font-medium mb-1">No. Registrasi</p>
              <p className="text-xs font-mono font-semibold text-primary break-all">
                {noReg}
              </p>
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
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header with Actions */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Detail Pemeriksaan</h2>
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
            <TabsList className="mb-4">
              <TabsTrigger value="cppt">CPPT</TabsTrigger>
              <TabsTrigger value="pemeriksaan">Pemeriksaan</TabsTrigger>
              <TabsTrigger value="vital">Vital Signs</TabsTrigger>
              <TabsTrigger value="odontogram">Odontogram</TabsTrigger>
              <TabsTrigger value="dokumentasi">Dokumentasi</TabsTrigger>
              <TabsTrigger value="treatment">Rencana</TabsTrigger>
              <TabsTrigger value="resep">E-Resep</TabsTrigger>
              <TabsTrigger value="billing">Tindakan & Billing</TabsTrigger>
              <TabsTrigger value="riwayat">Riwayat</TabsTrigger>
            </TabsList>

            <TabsContent value="cppt" className="mt-0">
              <CpptSection />
            </TabsContent>

            <TabsContent value="dokumentasi" className="mt-0">
              <ClinicalDocumentation />
            </TabsContent>

            <TabsContent value="pemeriksaan" className="mt-0">
              <div className="space-y-6">
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

            <TabsContent value="vital" className="mt-0">
              <VitalSignsSection />
            </TabsContent>

            <TabsContent value="odontogram" className="mt-0">
              <OdontogramSection />
            </TabsContent>

            <TabsContent value="treatment" className="mt-0">
              <EmrTreatmentPlan />
            </TabsContent>

            <TabsContent value="resep" className="mt-0">
              <EPrescriptionSection patientAllergies={patientData.alergi} />
            </TabsContent>

            <TabsContent value="billing" className="mt-0">
              <DoctorActionBilling />
            </TabsContent>

            <TabsContent value="riwayat" className="mt-0">
              <div className="space-y-3">
                {riwayatKunjungan.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between py-3 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.diagnosis}</p>
                      <p className="text-[10px] text-primary font-mono font-medium">
                        {item.noReg}
                      </p>
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
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground uppercase tracking-wide">
        {title}
      </Label>
      {children}
    </div>
  );
}
