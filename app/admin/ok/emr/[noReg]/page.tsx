"use client";

import React, { use } from "react";
import { EMRDetailBase, type EMRCategory, type EMRTab } from "@/components/admin/emr/emr-detail-base";
import { VitalSignsSection } from "@/components/admin/emr/vital-signs-section";
import { CpptSection } from "@/components/admin/emr/cppt-section";
import { ClinicalDocumentation } from "@/components/admin/emr/clinical-documentation";
import { EmrTreatmentPlan } from "@/components/admin/emr/emr-treatment-plan";
import { DoctorActionBilling } from "@/components/admin/emr/doctor-action-billing";
import { EPrescriptionSection } from "@/components/admin/emr/e-prescription-section";
import { LaboratoryOrderSection } from "@/components/admin/emr/laboratory-order-section";
import { RadiologyOrderSection } from "@/components/admin/emr/radiology-order-section";
import { SurgicalSafetyChecklist } from "@/components/admin/emr/surgical-safety-checklist";
import { LaporanOperasi } from "@/components/admin/emr/laporan-operasi-form";
import { RiwayatKunjunganForm } from "@/components/admin/emr/riwayat-kunjungan-form";
import { Stethoscope, Activity, Pill, FileText, Scissors } from "lucide-react";

// Mock patient data
const patientData = {
  noRM: "RM-2024-045",
  nama: "Eko Prasetyo",
  tanggalLahir: "1978-03-12",
  jenisKelamin: "Laki-laki",
  telepon: "081234567892",
  alergi: ["Seafood"],
};

const CATEGORIES: EMRCategory[] = [
  { 
    id: "surgery", 
    label: "Operasi", 
    icon: Scissors,
    tabs: [
      { id: "pre-op", label: "Pre-OP" },
      { id: "intra-op", label: "Intra-OP" },
      { id: "post-op", label: "Post-OP" },
      { id: "laporan-op", label: "Laporan Operasi" },
    ] 
  },
  { 
    id: "assessment", 
    label: "Assessment", 
    icon: Stethoscope,
    tabs: [
      { id: "cppt", label: "CPPT" },
      { id: "vital", label: "Vital Signs" },
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

export default function OKEMRDetailPage({
  params,
}: {
  params: Promise<{ noReg: string }>;
}) {
  const { noReg } = use(params);

  const allTabs: EMRTab[] = [
    { id: "pre-op", label: "Pre-OP", content: <SurgicalSafetyChecklist patientData={patientData} noReg={noReg} /> },
    { id: "intra-op", label: "Intra-OP", content: <div className="p-4 bg-muted/20 rounded-xl">Monitoring Intra-Operatif</div> },
    { id: "post-op", label: "Post-OP", content: <div className="p-4 bg-muted/20 rounded-xl">Instruksi Post-Operatif (PACU)</div> },
    { id: "laporan-op", label: "Laporan Operasi", content: <LaporanOperasi patientData={patientData} noReg={noReg} /> },
    { id: "cppt", label: "CPPT", content: <CpptSection /> },
    { id: "vital", label: "Vital Signs", content: <VitalSignsSection /> },
    { id: "laboratorium", label: "Laboratorium", content: <LaboratoryOrderSection /> },
    { id: "radiologi", label: "Radiologi", content: <RadiologyOrderSection /> },
    { id: "dokumentasi", label: "Dokumentasi", content: <ClinicalDocumentation /> },
    { id: "resep", label: "E-Resep", content: <EPrescriptionSection patientAllergies={patientData.alergi} /> },
    { id: "billing", label: "Tindakan & Billing", content: <DoctorActionBilling /> },
    { id: "riwayat", label: "Riwayat Kunjungan", content: <RiwayatKunjunganForm /> },
  ];

  return (
    <EMRDetailBase
      noReg={noReg}
      patientData={patientData}
      categories={CATEGORIES}
      allTabs={allTabs}
      basePath="/admin/ok/emr"
      title="EMR KAMAR OPERASI (OK)"
    />
  );
}
