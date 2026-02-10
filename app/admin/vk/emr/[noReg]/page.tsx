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
import { AssessmentAwalKebidanan } from "@/components/admin/emr/assessment-awal-kebidanan-form";
import { PartografDigital } from "@/components/admin/emr/partograf-digital-form";
import { MonitoringVKForm } from "@/components/admin/emr/monitoring-vk-form";
import { LaporanPersalinanForm } from "@/components/admin/emr/laporan-persalinan-form";
import { RiwayatKunjunganForm } from "@/components/admin/emr/riwayat-kunjungan-form";
import { Stethoscope, Activity, Pill, FileText, Baby } from "lucide-react";

// Mock patient data
const patientData = {
  noRM: "RM-2024-050",
  nama: "Siti Aminah",
  tanggalLahir: "1995-07-25",
  jenisKelamin: "Perempuan",
  telepon: "081234567893",
  alergi: [],
};

const CATEGORIES: EMRCategory[] = [
  { 
    id: "obstetrics", 
    label: "Kebidanan", 
    icon: Baby,
    tabs: [
      { id: "pemeriksaan-ob", label: "Pemeriksaan" },
      { id: "partograf", label: "Partograf" },
      { id: "monitoring-vk", label: "Monitoring VK" },
      { id: "laporan-persalinan", label: "Laporan Persalinan" },
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

export default function VKEMRDetailPage({
  params,
}: {
  params: Promise<{ noReg: string }>;
}) {
  const { noReg } = use(params);

  const allTabs: EMRTab[] = [
    { id: "pemeriksaan-ob", label: "Pemeriksaan", content: <AssessmentAwalKebidanan patientData={patientData} noReg={noReg} /> },
    { id: "partograf", label: "Partograf", content: <PartografDigital patientData={patientData} noReg={noReg} /> },
    { id: "monitoring-vk", label: "Monitoring VK", content: <MonitoringVKForm patientData={patientData} noReg={noReg} /> },
    { id: "laporan-persalinan", label: "Laporan Persalinan", content: <LaporanPersalinanForm patientData={patientData} noReg={noReg} /> },
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
      basePath="/admin/vk/emr"
      title="EMR KAMAR BERSALIN (VK)"
    />
  );
}
