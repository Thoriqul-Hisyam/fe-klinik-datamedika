"use client";

import { useState } from "react";
import {
  User,
  Clock,
  Plus,
  Edit2,
  Save,
  X,
  Trash2,
  Stethoscope,
  Activity,
  FileText,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Types
type Role = "Dokter" | "Perawat" | "Apoteker" | "Ahli Gizi";

interface SoapEntry {
  id: string;
  timestamp: string;
  author: string;
  role: Role;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  isVerified?: boolean;
}

// Mock Data
const initialEntries: SoapEntry[] = [
  {
    id: "1",
    timestamp: "2026-01-20 10:30",
    author: "dr. Sarah",
    role: "Dokter",
    subjective: "Pasien mengeluh nyeri tenggorokan berkurang setelah minum obat. Demam sudah turun.",
    objective: "Suhu: 36.8°C, Nadi: 80x/m, TD: 120/80 mmHg. Faring hiperemis (-), Tonsil T1-T1.",
    assessment: "Faringitis Akut perbaikan",
    plan: "Lanjutkan terapi antibiotik sampai habis. Boleh pulang besok jika tidak ada keluhan.",
    isVerified: true,
  },
  {
    id: "2",
    timestamp: "2026-01-20 08:00",
    author: "Sr. Siti",
    role: "Perawat",
    subjective: "Pasien sudah makan pagi, nafsu makan baik. Tidak ada mual muntah.",
    objective: "Suhu: 37.0°C, TD: 120/80 mmHg, Infus lancar.",
    assessment: "Kebutuhan nutrisi terpenuhi",
    plan: "Observasi TTV per 4 jam. Ganti cairan infus jam 12.00.",
    isVerified: true,
  },
];

const CURRENT_USER = "dr. Sarah"; // Mock current logged in user

export function CpptSection() {
  const [entries, setEntries] = useState<SoapEntry[]>(initialEntries);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<SoapEntry>>({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      subjective: "",
      objective: "",
      assessment: "",
      plan: "",
    });
  };

  const handleEdit = (entry: SoapEntry) => {
    setEditingId(entry.id);
    setIsAdding(true);
    setFormData({
      subjective: entry.subjective,
      objective: entry.objective,
      assessment: entry.assessment,
      plan: entry.plan,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  const handleSave = () => {
    if (editingId) {
      // Edit existing
      setEntries((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? { ...e, ...formData } as SoapEntry
            : e
        )
      );
    } else {
      // Add new
      const newEntry: SoapEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        author: CURRENT_USER,
        role: "Dokter", // Mock role
        subjective: formData.subjective || "",
        objective: formData.objective || "",
        assessment: formData.assessment || "",
        plan: formData.plan || "",
        isVerified: true,
      };
      setEntries((prev) => [newEntry, ...prev]);
    }
    handleCancel();
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus catatan ini?")) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const getRoleBadgeVariant = (role: Role) => {
    switch (role) {
      case "Dokter":
        return "default"; // Primary color
      case "Perawat":
        return "secondary"; // Secondary color
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Catatan Perkembangan (CPPT)
        </h3>
        {!isAdding && (
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Catatan
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Timeline List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add/Edit Form */}
          {isAdding && (
            <Card className="border-2 border-primary/20 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <CardHeader className="pb-3 bg-muted/30">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {editingId ? "Edit Catatan" : "Catatan Baru"}
                  <div className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
                    <User className="h-3 w-3" />
                    {CURRENT_USER}
                    <span className="text-muted-foreground/30">|</span>
                    <Clock className="h-3 w-3" />
                    {new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="s" className="text-xs font-bold text-muted-foreground uppercase">Subjective (S)</Label>
                    <Textarea
                      id="s"
                      placeholder="Keluhan pasien, riwayat, dll..."
                      value={formData.subjective}
                      onChange={(e) => setFormData({ ...formData, subjective: e.target.value })}
                      className="resize-none min-h-[80px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="o" className="text-xs font-bold text-muted-foreground uppercase">Objective (O)</Label>
                    <Textarea
                      id="o"
                      placeholder="Hasil pemeriksaan fisik, lab, dll..."
                      value={formData.objective}
                      onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                      className="resize-none min-h-[80px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="a" className="text-xs font-bold text-muted-foreground uppercase">Assessment (A)</Label>
                    <Textarea
                      id="a"
                      placeholder="Diagnosa kerja, masalah, dll..."
                      value={formData.assessment}
                      onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
                      className="resize-none min-h-[60px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="p" className="text-xs font-bold text-muted-foreground uppercase">Plan (P)</Label>
                    <Textarea
                      id="p"
                      placeholder="Rencana terapi, tindakan, edukasi, dll..."
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                      className="resize-none min-h-[80px]"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    Batal
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Simpan CPPT
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline Items */}
          <div className="relative pl-6 border-l-2 border-muted space-y-8">
            {entries.map((entry) => (
              <div key={entry.id} className="relative">
                 {/* Timeline Dot */}
                <div className={cn(
                  "absolute -left-[31px] top-4 h-4 w-4 rounded-full border-2 border-background",
                   entry.role === 'Dokter' ? "bg-primary" : "bg-muted-foreground"
                )} />
                
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="py-3 px-4 flex flex-row items-start justify-between space-y-0 bg-muted/20">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn("text-xs", entry.role === 'Dokter' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                            {entry.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{entry.author}</span>
                            <Badge variant={getRoleBadgeVariant(entry.role)} className="text-[10px] px-1.5 py-0 h-5">
                                {entry.role}
                            </Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                            <Clock className="h-3 w-3 mr-1" />
                            {entry.timestamp}
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    {entry.author === CURRENT_USER && (
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => handleEdit(entry)}>
                                <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(entry.id)}>
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 grid gap-4 text-sm">
                    <div className="grid grid-cols-[24px_1fr] gap-2">
                        <span className="font-bold text-muted-foreground">S</span>
                        <p className="whitespace-pre-wrap">{entry.subjective}</p>
                    </div>
                     <Separator className="bg-border/50" />
                    <div className="grid grid-cols-[24px_1fr] gap-2">
                        <span className="font-bold text-muted-foreground">O</span>
                        <p className="whitespace-pre-wrap">{entry.objective}</p>
                    </div>
                    <Separator className="bg-border/50" />
                    <div className="grid grid-cols-[24px_1fr] gap-2">
                        <span className="font-bold text-muted-foreground">A</span>
                        <p className="whitespace-pre-wrap">{entry.assessment}</p>
                    </div>
                    <Separator className="bg-border/50" />
                    <div className="grid grid-cols-[24px_1fr] gap-2">
                        <span className="font-bold text-muted-foreground">P</span>
                        <p className="whitespace-pre-wrap">{entry.plan}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info (Optional) */}
        <div className="hidden lg:block space-y-4">
             <Card>
                <CardHeader className="py-3">
                    <CardTitle className="text-sm">Filter</CardTitle>
                </CardHeader>
                <CardContent className="py-3 text-sm space-y-2">
                    <div className="flex items-center justify-between">
                         <Label className="font-normal text-muted-foreground">Tampilkan</Label>
                         <Select defaultValue="all">
                            <SelectTrigger className="w-[120px] h-8 text-xs">
                                <SelectValue placeholder="Semua" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="dokter">Dokter</SelectItem>
                                <SelectItem value="perawat">Perawat</SelectItem>
                            </SelectContent>
                         </Select>
                    </div>
                </CardContent>
             </Card>
             
             <Card className="bg-blue-50/50 border-blue-100">
                 <CardContent className="p-4 flex gap-3">
                     <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                     <div className="space-y-1">
                         <h4 className="text-sm font-semibold text-blue-900">Instruksi DPJP</h4>
                         <p className="text-xs text-blue-700 leading-relaxed">
                             Harap pantau balance cairan ketat dan laporkan jika urin output {"<"} 0.5cc/kgBB/jam.
                         </p>
                     </div>
                 </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
