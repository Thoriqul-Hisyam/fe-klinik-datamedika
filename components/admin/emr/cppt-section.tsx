"use client";

import { useState } from "react";
import { VoiceRecorder } from "@/components/admin/emr/voice-recorder";
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
  Edit3,
  AlertCircle,
  CheckCircle2,
  Copy,
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

  const handleCopy = (entry: SoapEntry) => {
    setEditingId(null); // Always a new entry when copying
    setIsAdding(true);
    setFormData({
      subjective: entry.subjective,
      objective: entry.objective,
      assessment: entry.assessment,
      plan: entry.plan,
    });
    // Scroll to form (top of the section)
    const element = document.getElementById("cppt-form-top");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div className="space-y-6" id="cppt-form-top">
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

      <div className="grid gap-6 lg:grid-cols-5 flex-1 overflow-hidden">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-2 space-y-4 overflow-y-auto pr-2">
          {/* Voice Recorder - Always visible */}
          <VoiceRecorder
            onSoapGenerated={(soap) => {
              setFormData({
                subjective: soap.subjective,
                objective: soap.objective,
                assessment: soap.assessment,
                plan: soap.plan,
              });
              setIsAdding(true);
              setEditingId(null);
            }}
          />

          {!isAdding && (
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center bg-muted/10">
              <FileText className="h-8 w-8 text-muted-foreground mb-3 opacity-20" />
              <h4 className="font-medium text-muted-foreground text-sm">Atau Isi Manual</h4>
              <p className="text-xs text-muted-foreground/60 mb-4">Klik tombol dibawah untuk menulis CPPT secara manual.</p>
              <Button onClick={handleAdd} size="sm" variant="outline" className="rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                Tulis Manual
              </Button>
            </div>
          )}

          {isAdding && (
            <Card className="border-2 border-primary/20 shadow-xl relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
              <CardHeader className="pb-3 bg-muted/30">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Edit3 className="h-4 w-4 text-primary" />
                    {editingId ? "EDIT CATATAN CPPT" : "CATATAN CPPT BARU"}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-normal text-muted-foreground uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3 w-3" />
                      {CURRENT_USER}
                    </span>
                    <span className="text-muted-foreground/30 text-lg">|</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 flex-1 overflow-y-auto px-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold w-7 h-7 flex items-center justify-center p-0 rounded-full text-xs">S</Badge>
                      <Label htmlFor="s" className="text-xs font-bold text-muted-foreground uppercase">Subjective</Label>
                    </div>
                    <Textarea
                      id="s"
                      placeholder="Keluhan pasien, riwayat, dll..."
                      value={formData.subjective}
                      onChange={(e) => setFormData({ ...formData, subjective: e.target.value })}
                      className="resize-none min-h-[100px] border-muted-foreground/20 focus-visible:ring-primary/30"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold w-7 h-7 flex items-center justify-center p-0 rounded-full text-xs">O</Badge>
                      <Label htmlFor="o" className="text-xs font-bold text-muted-foreground uppercase">Objective</Label>
                    </div>
                    <Textarea
                      id="o"
                      placeholder="Hasil pemeriksaan fisik, lab, dll..."
                      value={formData.objective}
                      onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                      className="resize-none min-h-[100px] border-muted-foreground/20 focus-visible:ring-primary/30"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold w-7 h-7 flex items-center justify-center p-0 rounded-full text-xs">A</Badge>
                      <Label htmlFor="a" className="text-xs font-bold text-muted-foreground uppercase">Assessment</Label>
                    </div>
                    <Textarea
                      id="a"
                      placeholder="Diagnosa kerja, masalah, dll..."
                      value={formData.assessment}
                      onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
                      className="resize-none min-h-[80px] border-muted-foreground/20 focus-visible:ring-primary/30"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold w-7 h-7 flex items-center justify-center p-0 rounded-full text-xs">P</Badge>
                      <Label htmlFor="p" className="text-xs font-bold text-muted-foreground uppercase">Plan</Label>
                    </div>
                    <Textarea
                      id="p"
                      placeholder="Rencana terapi, tindakan, edukasi, dll..."
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                      className="resize-none min-h-[100px] border-muted-foreground/20 focus-visible:ring-primary/30"
                    />
                  </div>
                </div>
              </CardContent>
              <div className="p-4 border-t bg-muted/10 flex justify-end gap-3">
                <Button variant="ghost" className="hover:bg-destructive/10 hover:text-destructive" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </Button>
                <Button onClick={handleSave} className="px-8 shadow-md">
                  <Save className="h-4 w-4 mr-2" />
                  Simpan CPPT
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: History Timeline */}
        <div className="lg:col-span-3 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-4 px-1">
             <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Riwayat Perkembangan</h4>
             </div>
             <Select defaultValue="all">
                <SelectTrigger className="w-[140px] h-8 text-xs bg-background">
                    <SelectValue placeholder="Semua Profesi" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Semua Profesi</SelectItem>
                    <SelectItem value="dokter">Dokter</SelectItem>
                    <SelectItem value="perawat">Perawat</SelectItem>
                </SelectContent>
             </Select>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6 relative pl-6 border-l-2 border-muted">
            {entries.length === 0 ? (
               <div className="text-center py-12">
                  <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-20" />
                  <p className="text-sm text-muted-foreground">Belum ada riwayat CPPT.</p>
               </div>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className={cn(
                    "absolute -left-[31px] top-4 h-4 w-4 rounded-full border-2 border-background",
                    entry.role === 'Dokter' ? "bg-primary" : "bg-muted-foreground"
                  )} />
                  
                  <Card className="group-hover:shadow-md border-muted/60 transition-all duration-300">
                    <CardHeader className="py-2.5 px-4 flex flex-row items-center justify-between space-y-0 bg-muted/20">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-7 w-7 ring-2 ring-background">
                          <AvatarFallback className={cn("text-[10px] font-bold", entry.role === 'Dokter' ? "bg-primary text-primary-foreground" : "bg-muted-foreground text-white")}>
                              {entry.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                              <span className="text-xs font-bold leading-none">{entry.author}</span>
                              <Badge variant={getRoleBadgeVariant(entry.role)} className="text-[9px] px-1.5 py-0 h-4 uppercase font-bold">
                                  {entry.role}
                              </Badge>
                          </div>
                          <div className="flex items-center text-[10px] text-muted-foreground mt-0.5">
                              <Clock className="h-2.5 w-2.5 mr-1" />
                              {entry.timestamp}
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-full transition-colors" 
                            onClick={() => handleCopy(entry)}
                            title="Salin ke form"
                          >
                              <Copy className="h-3.5 w-3.5" />
                          </Button>
                          
                          {entry.author === CURRENT_USER && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-full transition-colors" 
                                onClick={() => handleEdit(entry)}
                                title="Edit catatan"
                              >
                                  <Edit2 className="h-3.5 w-3.5" />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors" 
                                onClick={() => handleDelete(entry.id)}
                                title="Hapus catatan"
                              >
                                  <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </>
                          )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 grid gap-3 text-sm">
                      <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                            <span>Subjective</span>
                            <div className="h-[1px] flex-1 bg-muted" />
                          </div>
                          <p className="text-[13px] leading-relaxed text-foreground/90 whitespace-pre-wrap pl-1">{entry.subjective}</p>
                      </div>
                      
                      <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                            <span>Objective</span>
                            <div className="h-[1px] flex-1 bg-muted" />
                          </div>
                          <p className="text-[13px] leading-relaxed text-foreground/90 whitespace-pre-wrap pl-1">{entry.objective}</p>
                      </div>

                      <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                            <span>Assessment</span>
                            <div className="h-[1px] flex-1 bg-muted" />
                          </div>
                          <p className="text-[13px] font-medium text-foreground/90 whitespace-pre-wrap pl-1">{entry.assessment}</p>
                      </div>

                      <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                            <span>Plan</span>
                            <div className="h-[1px] flex-1 bg-muted" />
                          </div>
                          <p className="text-[13px] leading-relaxed text-foreground/90 whitespace-pre-wrap pl-1 italic">{entry.plan}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
