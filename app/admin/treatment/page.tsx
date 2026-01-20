"use client";

import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  History,
  Plus,
  Check,
  Clock,
  Circle,
  AlertCircle,
  X,
  User,
  Calendar,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock treatment plans data
const treatmentPlans = [
  {
    id: "TP001",
    noRM: "RM-2024-001",
    pasien: "Ahmad Rizki",
    diagnosis: "Diabetes Mellitus Tipe 2",
    dokter: "dr. Hendra, Sp.PD",
    tanggalMulai: "2026-01-10",
    totalSteps: 5,
    completedSteps: 3,
    status: "in-progress",
  },
  {
    id: "TP002",
    noRM: "RM-2024-015",
    pasien: "Siti Nurhaliza",
    diagnosis: "Perawatan Gigi Berlubang",
    dokter: "drg. Budi",
    tanggalMulai: "2026-01-15",
    totalSteps: 3,
    completedSteps: 3,
    status: "completed",
  },
  {
    id: "TP003",
    noRM: "RM-2024-023",
    pasien: "Dewi Lestari",
    diagnosis: "Kehamilan Trimester 3",
    dokter: "dr. Maya, Sp.OG",
    tanggalMulai: "2025-09-01",
    totalSteps: 8,
    completedSteps: 6,
    status: "in-progress",
  },
  {
    id: "TP004",
    noRM: "RM-2024-045",
    pasien: "Eko Prasetyo",
    diagnosis: "Hipertensi Grade 2",
    dokter: "dr. Ahmad",
    tanggalMulai: "2026-01-18",
    totalSteps: 4,
    completedSteps: 1,
    status: "in-progress",
  },
  {
    id: "TP005",
    noRM: "RM-2024-067",
    pasien: "Fitri Handayani",
    diagnosis: "Post-Operasi Appendektomi",
    dokter: "dr. Surya, Sp.B",
    tanggalMulai: "2026-01-05",
    totalSteps: 6,
    completedSteps: 6,
    status: "completed",
  },
];

// Mock timeline steps for detail view
const timelineSteps = [
  {
    id: 1,
    title: "Pemeriksaan Awal",
    description: "Pemeriksaan fisik dan laboratorium darah lengkap",
    date: "2026-01-10",
    status: "completed",
    notes: "HbA1c: 8.5%, GDP: 180 mg/dL",
  },
  {
    id: 2,
    title: "Konsultasi Gizi",
    description: "Edukasi pola makan dan diet rendah gula",
    date: "2026-01-12",
    status: "completed",
    notes: "Pasien memahami diet DM",
  },
  {
    id: 3,
    title: "Pemberian Obat Fase 1",
    description: "Metformin 500mg 2x1",
    date: "2026-01-12",
    status: "completed",
    notes: "Tidak ada efek samping",
  },
  {
    id: 4,
    title: "Kontrol Minggu ke-2",
    description: "Evaluasi kadar gula darah dan penyesuaian dosis",
    date: "2026-01-24",
    status: "current",
    notes: "",
  },
  {
    id: 5,
    title: "Evaluasi Akhir",
    description: "Pemeriksaan HbA1c ulang dan evaluasi terapi",
    date: "2026-02-10",
    status: "pending",
    notes: "",
  },
];

// Mock revision history
const revisionHistory = [
  {
    id: 1,
    date: "2026-01-18 14:30",
    user: "dr. Hendra, Sp.PD",
    action: "Menambahkan step Kontrol Minggu ke-2",
    details: "Ditambahkan karena perlu evaluasi lebih awal",
  },
  {
    id: 2,
    date: "2026-01-12 10:15",
    user: "dr. Hendra, Sp.PD",
    action: "Mengubah dosis Metformin",
    details: "Dari 500mg 1x1 menjadi 500mg 2x1",
  },
  {
    id: 3,
    date: "2026-01-10 09:00",
    user: "dr. Hendra, Sp.PD",
    action: "Membuat Treatment Plan",
    details: "Treatment plan awal untuk penanganan DM Tipe 2",
  },
];

type PlanStatus = "in-progress" | "completed" | "pending" | "cancelled";
type StepStatus = "completed" | "current" | "pending";

const statusConfig: Record<
  PlanStatus,
  { label: string; variant: "default" | "secondary" | "success" | "destructive" }
> = {
  "in-progress": { label: "Berlangsung", variant: "default" },
  completed: { label: "Selesai", variant: "success" },
  pending: { label: "Menunggu", variant: "secondary" },
  cancelled: { label: "Dibatalkan", variant: "destructive" },
};

export default function TreatmentPlanPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<typeof treatmentPlans[0] | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const itemsPerPage = 8;

  // Filter treatment plans
  const filteredData = treatmentPlans.filter(
    (plan) =>
      plan.pasien.toLowerCase().includes(search.toLowerCase()) ||
      plan.noRM.toLowerCase().includes(search.toLowerCase()) ||
      plan.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Treatment Plan</h1>
          <p className="text-sm text-muted-foreground">
            Kelola rencana perawatan pasien
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Buat Treatment Plan
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Left: Table */}
        <div className={cn("flex-1", selectedPlan && "max-w-[55%]")}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  Daftar Treatment Plan
                </CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari pasien, RM, diagnosis..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-8 text-sm"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs h-9">Pasien</TableHead>
                    <TableHead className="text-xs h-9">Diagnosis</TableHead>
                    <TableHead className="text-xs h-9">Progress</TableHead>
                    <TableHead className="text-xs h-9">Status</TableHead>
                    <TableHead className="text-xs h-9 w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((plan) => {
                    const config = statusConfig[plan.status as PlanStatus];
                    const progress = Math.round(
                      (plan.completedSteps / plan.totalSteps) * 100
                    );
                    const isSelected = selectedPlan?.id === plan.id;

                    return (
                      <TableRow
                        key={plan.id}
                        className={cn(
                          "text-sm cursor-pointer",
                          isSelected && "bg-muted"
                        )}
                        onClick={() => setSelectedPlan(plan)}
                      >
                        <TableCell className="py-2.5">
                          <div>
                            <p className="font-medium">{plan.pasien}</p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {plan.noRM}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5 text-muted-foreground max-w-[150px] truncate">
                          {plan.diagnosis}
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {plan.completedSteps}/{plan.totalSteps}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <Badge
                            variant={config.variant}
                            className="text-[10px] px-1.5 py-0"
                          >
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPlan(plan);
                                }}
                              >
                                <Eye className="h-3.5 w-3.5 mr-2" />
                                Lihat Detail
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-3.5 w-3.5 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPlan(plan);
                                  setShowHistory(true);
                                }}
                              >
                                <History className="h-3.5 w-3.5 mr-2" />
                                Riwayat Revisi
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <p className="text-xs text-muted-foreground">
                  {filteredData.length} treatment plan
                </p>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                  <span className="text-xs font-medium px-2">
                    {currentPage} / {totalPages || 1}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Detail View with Timeline */}
        {selectedPlan && (
          <div className="w-[45%]">
            <Card className="sticky top-20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{selectedPlan.pasien}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {selectedPlan.diagnosis}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setSelectedPlan(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Patient Info */}
                <div className="flex gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b">
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {selectedPlan.dokter}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(selectedPlan.tanggalMulai).toLocaleDateString("id-ID")}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs ml-auto"
                    onClick={() => setShowHistory(true)}
                  >
                    <History className="h-3 w-3 mr-1" />
                    Riwayat
                  </Button>
                </div>

                {/* Timeline */}
                <div className="space-y-0">
                  {timelineSteps.map((step, index) => (
                    <div key={step.id} className="relative flex gap-3">
                      {/* Timeline Line */}
                      {index < timelineSteps.length - 1 && (
                        <div
                          className={cn(
                            "absolute left-[11px] top-6 w-0.5 h-[calc(100%-8px)]",
                            step.status === "completed"
                              ? "bg-primary"
                              : "bg-border"
                          )}
                        />
                      )}

                      {/* Step Indicator */}
                      <div className="relative z-10 shrink-0">
                        {step.status === "completed" ? (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                            <Check className="h-3.5 w-3.5 text-primary-foreground" />
                          </div>
                        ) : step.status === "current" ? (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 border-2 border-primary">
                            <Clock className="h-3 w-3 text-primary" />
                          </div>
                        ) : (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted border-2 border-border">
                            <Circle className="h-2 w-2 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p
                              className={cn(
                                "text-sm font-medium",
                                step.status === "pending" && "text-muted-foreground"
                              )}
                            >
                              {step.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {step.description}
                            </p>
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(step.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                        {step.notes && (
                          <div className="mt-2 rounded bg-muted px-2 py-1.5">
                            <p className="text-xs text-muted-foreground">
                              {step.notes}
                            </p>
                          </div>
                        )}
                        {step.status === "current" && (
                          <Button size="sm" className="mt-2 h-7 text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Tandai Selesai
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Revision History Modal */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">Riwayat Revisi</DialogTitle>
            <DialogDescription>
              {selectedPlan?.pasien} - {selectedPlan?.diagnosis}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {revisionHistory.map((rev) => (
              <div
                key={rev.id}
                className="flex gap-3 py-3 border-b last:border-0"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium">{rev.action}</p>
                    <span className="text-[10px] text-muted-foreground">
                      {rev.date}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {rev.details}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    oleh {rev.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
