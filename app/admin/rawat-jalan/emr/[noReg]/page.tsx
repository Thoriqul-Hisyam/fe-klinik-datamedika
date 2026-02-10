"use client";

import React, { use } from "react";
import { EMRDetailBase, type EMRCategory, type EMRTab } from "@/components/admin/emr/emr-detail-base";
import { VitalSignsSection } from "@/components/admin/emr/vital-signs-section";
import { CpptSection } from "@/components/admin/emr/cppt-section";
import { ClinicalDocumentation } from "@/components/admin/emr/clinical-documentation";
import { EmrTreatmentPlan } from "@/components/admin/emr/emr-treatment-plan";
import { DoctorActionBilling } from "@/components/admin/emr/doctor-action-billing";
import { OdontogramSection } from "@/components/admin/emr/odontogram-section";
import { EPrescriptionSection } from "@/components/admin/emr/e-prescription-section";
import { LaboratoryOrderSection } from "@/components/admin/emr/laboratory-order-section";
import { RadiologyOrderSection } from "@/components/admin/emr/radiology-order-section";
import { PemeriksaanFisikForm } from "@/components/admin/emr/pemeriksaan-fisik-form";
import { RiwayatKunjunganForm } from "@/components/admin/emr/riwayat-kunjungan-form";
import { Stethoscope, Activity, Pill, FileText } from "lucide-react";

// Mock patient data
const patientData = {
  noRM: "RM-2024-001",
  nama: "Ahmad Rizki",
  tanggalLahir: "1990-05-15",
  jenisKelamin: "Laki-laki",
  telepon: "081234567890",
  alergi: ["Amoxicillin", "Kacang"],
};

const CATEGORIES: EMRCategory[] = [
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

export default function RawatJalanEMRDetailPage({
  params,
}: {
  params: Promise<{ noReg: string }>;
}) {
  const { noReg } = use(params);

  const allTabs: EMRTab[] = [
    { id: "cppt", label: "CPPT", content: <CpptSection /> },
    { id: "pemeriksaan", label: "Pemeriksaan", content: <PemeriksaanFisikForm patientData={patientData} noReg={noReg} /> },
    { id: "vital", label: "Vital Signs", content: <VitalSignsSection /> },
    { id: "odontogram", label: "Odontogram", content: <OdontogramSection /> },
    { id: "laboratorium", label: "Laboratorium", content: <LaboratoryOrderSection /> },
    { id: "radiologi", label: "Radiologi", content: <RadiologyOrderSection /> },
    { id: "dokumentasi", label: "Dokumentasi", content: <ClinicalDocumentation /> },
    { id: "treatment", label: "Rencana", content: <EmrTreatmentPlan /> },
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
      basePath="/admin/rawat-jalan/emr"
      title="EMR RAWAT JALAN"
    />
  );
}
