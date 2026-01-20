"use client";

import React, { useState } from "react";
import {
  Plus,
  History,
  CheckCircle2,
  Clock,
  Circle,
  XCircle,
  ChevronDown,
  ChevronRight,
  Edit3,
  FileText,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Types
type TreatmentStatus = "planned" | "ongoing" | "done" | "canceled";

interface TreatmentItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: TreatmentStatus;
  notes?: string;
  doctor: string;
}

interface PlanVersion {
  version: number;
  date: string;
  author: string;
  changeNote: string;
}

// Mock Data
const initialTreatments: TreatmentItem[] = [
  {
    id: "1",
    title: "Pemberian Insulin Awal",
    description: "Dosis 10 unit sebelum tidur malam",
    date: "2026-01-20",
    status: "done",
    notes: "Pasien kooperatif, tidak ada keluhan nyeri hebat",
    doctor: "dr. Sarah",
  },
  {
    id: "2",
    title: "Monitoring GDS Pagi",
    description: "Cek gula darah sewaktu setiap jam 07:00",
    date: "2026-01-21",
    status: "ongoing",
    notes: "Terpantau stabil di kisaran 180-200",
    doctor: "dr. Sarah",
  },
  {
    id: "3",
    title: "Konsultasi Diet DM",
    description: "Edukasi diet rendah karbohidrat oleh Ahli Gizi",
    date: "2026-01-22",
    status: "planned",
    doctor: "dr. Hendra",
  },
  {
    id: "4",
    title: "Pemeriksaan Profil Lipid",
    description: "Cek kolesterol total, LDL, HDL, Trigliserid",
    date: "2026-01-23",
    status: "planned",
    doctor: "dr. Sarah",
  },
];

const planHistory: PlanVersion[] = [
  {
    version: 3,
    date: "2026-01-20 09:00",
    author: "dr. Sarah",
    changeNote: "Menambahkan monitoring GDS harian",
  },
  {
    version: 2,
    date: "2026-01-19 14:00",
    author: "dr. Sarah",
    changeNote: "Penyesuaian dosis insulin dari 8 unit ke 10 unit",
  },
  {
    version: 1,
    date: "2026-01-19 08:00",
    author: "dr. Sarah",
    changeNote: "Draft rencana awal perawatan Diabetes",
  },
];

export function EmrTreatmentPlan() {
  const [treatments, setTreatments] = useState<TreatmentItem[]>(initialTreatments);
  const [expandedId, setExpandedId] = useState<string | null>("2"); // Open ongoing by default

  const getStatusConfig = (status: TreatmentStatus) => {
    switch (status) {
      case "done":
        return {
          icon: CheckCircle2,
          color: "text-green-600",
          bg: "bg-green-100",
          border: "border-green-200",
          label: "Selesai",
        };
      case "ongoing":
        return {
          icon: Clock,
          color: "text-blue-600",
          bg: "bg-blue-100",
          border: "border-blue-200",
          label: "Berjalan",
        };
      case "canceled":
        return {
          icon: XCircle,
          color: "text-destructive",
          bg: "bg-destructive/10",
          border: "border-destructive/20",
          label: "Batal",
        };
      default:
        return {
          icon: Circle,
          color: "text-muted-foreground",
          bg: "bg-muted",
          border: "border-border",
          label: "Direncanakan",
        };
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Edit3 className="h-5 w-5" />
          Rencana Perawatan (Treatment Plan)
        </h3>
        <div className="flex gap-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <History className="h-4 w-4 mr-2" />
                        Riwayat Revisi
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Riwayat Versi Rencana</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                        {planHistory.map((v) => (
                            <div key={v.version} className="flex gap-3 relative pb-4 last:pb-0">
                                {v.version !== 1 && (
                                     <div className="absolute left-[11px] top-6 w-0.5 h-full bg-border" />
                                )}
                                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center shrink-0 relative z-10">
                                    <span className="text-[10px] font-bold">{v.version}</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">{v.changeNote}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {v.author} • {v.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
            <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Rencana
            </Button>
        </div>
      </div>

      {/* Main Timeline */}
      <div className="relative pl-6 border-l-2 border-muted space-y-6 ml-2">
        {treatments.map((item, index) => {
          const config = getStatusConfig(item.status);
          const isExpanded = expandedId === item.id;
          const StatusIcon = config.icon;

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Connector Dot */}
              <div
                className={cn(
                  "absolute -left-[35px] top-1 h-4 w-4 rounded-full border-4 border-background transition-colors",
                  config.bg,
                  config.color
                )}
              />

              <div className={cn(
                  "rounded-xl border transition-all duration-200",
                  isExpanded ? "shadow-md bg-card ring-1 ring-primary/5" : "hover:bg-muted/30"
              )}>
                <div 
                    className="p-4 cursor-pointer flex items-start gap-4"
                    onClick={() => toggleExpand(item.id)}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{item.title}</span>
                      <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-5 font-normal capitalize", config.color, config.border)}>
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                       {item.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                     <span className="text-xs text-muted-foreground">
                        {item.date}
                     </span>
                     {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase">Deskripsi Detail</label>
                            <p className="text-sm text-balance leading-relaxed">{item.description}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase">Penanggung Jawab</label>
                            <div className="flex items-center gap-2">
                                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-sm">{item.doctor}</span>
                            </div>
                        </div>
                    </div>

                    {item.notes && (
                         <div className="space-y-1.5 p-3 rounded-lg bg-blue-50/50 border border-blue-100 flex gap-3">
                            <AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                                <label className="text-[10px] font-bold text-blue-700 uppercase">Catatan Perkembangan</label>
                                <p className="text-sm text-blue-900">{item.notes}</p>
                            </div>
                         </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t mt-4">
                        <div className="flex gap-2">
                             {item.status !== 'done' && (
                                <Button size="sm" variant="outline" className="h-8 text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                                    <CheckCircle2 className="h-3.5 w-3.5 mr-2" />
                                    Tandai Selesai
                                </Button>
                             )}
                             <Button size="sm" variant="outline" className="h-8 text-xs">
                                <Edit3 className="h-3.5 w-3.5 mr-2" />
                                Revisi
                             </Button>
                        </div>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Batalkan Rencana</DropdownMenuItem>
                                <DropdownMenuItem>Ubah Prioritas</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
