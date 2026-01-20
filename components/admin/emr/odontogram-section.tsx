"use client";

import React, { useState } from "react";
import { 
  Info, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// FDI Tooth Numbers
const QUADRANTS = {
  UR: [18, 17, 16, 15, 14, 13, 12, 11], // Upper Right
  UL: [21, 22, 23, 24, 25, 26, 27, 28], // Upper Left
  LL: [31, 32, 33, 34, 35, 36, 37, 38], // Lower Left
  LR: [48, 47, 46, 45, 44, 43, 42, 41], // Lower Right
};

type ToothCondition = "normal" | "caries" | "filling" | "missing" | "crown";

interface ToothState {
  id: number;
  condition: ToothCondition;
  notes: string;
}

export function OdontogramSection() {
  const [teeth, setTeeth] = useState<Record<number, ToothState>>({});
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [isFinalized, setIsFinalized] = useState(false);

  // Modal temporary state
  const [tempCondition, setTempCondition] = useState<ToothCondition>("normal");
  const [tempNotes, setTempNotes] = useState("");

  const handleToothClick = (id: number) => {
    if (isFinalized) return;
    const current = teeth[id] || { id, condition: "normal", notes: "" };
    setSelectedTooth(id);
    setTempCondition(current.condition);
    setTempNotes(current.notes);
  };

  const handleSaveTooth = () => {
    if (selectedTooth === null) return;
    setTeeth((prev) => ({
      ...prev,
      [selectedTooth]: {
        id: selectedTooth,
        condition: tempCondition,
        notes: tempNotes,
      },
    }));
    setSelectedTooth(null);
  };

  const getToothColor = (condition: ToothCondition) => {
    switch (condition) {
      case "caries": return "fill-red-500 stroke-red-700";
      case "filling": return "fill-green-500 stroke-green-700";
      case "missing": return "fill-neutral-200 stroke-neutral-400 opacity-50";
      case "crown": return "fill-blue-500 stroke-blue-700";
      default: return "fill-white stroke-neutral-300";
    }
  };

  const ToothIcon = ({ id }: { id: number }) => {
    const state = teeth[id];
    const colorClass = getToothColor(state?.condition || "normal");
    const isMissing = state?.condition === "missing";

    return (
      <div 
        onClick={() => handleToothClick(id)}
        className={cn(
          "flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-110",
          isFinalized && "cursor-default"
        )}
      >
        <span className="text-[10px] font-bold text-muted-foreground">{id}</span>
        <svg width="32" height="32" viewBox="0 0 32 32" className="drop-shadow-sm">
          {/* Main tooth body - simplified as a rectangle for clinical representation */}
          <rect 
            x="4" y="4" width="24" height="24" rx="4" 
            className={cn(colorClass, "stroke-2")}
          />
          {/* Internal surfaces marking (simplified) */}
          <line x1="10" y1="4" x2="10" y2="28" className="stroke-white/30 stroke-1" />
          <line x1="22" y1="4" x2="22" y2="28" className="stroke-white/30 stroke-1" />
          <line x1="4" y1="10" x2="28" y2="10" className="stroke-white/30 stroke-1" />
          <line x1="4" y1="22" x2="28" y2="22" className="stroke-white/30 stroke-1" />
          
          {isMissing && (
            <path d="M4 4 L28 28 M28 4 L4 28" className="stroke-neutral-500 stroke-2" />
          )}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Odontogram Terintegrasi
        </h3>
        <div className="flex gap-2">
          {!isFinalized ? (
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsFinalized(true)}
            >
              <Save className="h-4 w-4 mr-2" />
              Finalisasi Odontogram
            </Button>
          ) : (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setIsFinalized(false)}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Buka Revisi
            </Button>
          )}
        </div>
      </div>

      <div className="bg-card border rounded-xl p-8 shadow-sm">
        {/* FDI Odontogram Layout */}
        <div className="space-y-12">
          {/* Upper Teeth */}
          <div className="flex justify-center gap-12 border-b pb-8">
            <div className="flex gap-2">
              {QUADRANTS.UR.map(id => <ToothIcon key={id} id={id} />)}
            </div>
            <div className="flex gap-2 border-l pl-12">
              {QUADRANTS.UL.map(id => <ToothIcon key={id} id={id} />)}
            </div>
          </div>

          {/* Lower Teeth */}
          <div className="flex justify-center gap-12 pt-8">
            <div className="flex gap-2">
              {QUADRANTS.LR.map(id => <ToothIcon key={id} id={id} />)}
            </div>
            <div className="flex gap-2 border-l pl-12">
              {QUADRANTS.LL.map(id => <ToothIcon key={id} id={id} />)}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 pt-8 border-t">
          <LegendItem color="bg-red-500" label="Caries (Karies/Berlubang)" />
          <LegendItem color="bg-green-500" label="Filling (Tumpatan)" />
          <LegendItem color="bg-blue-500" label="Crown (Jaket)" />
          <LegendItem color="bg-neutral-200" label="Missing (Hilang)" isX />
          <LegendItem color="bg-white border-neutral-300" label="Normal" />
        </div>
      </div>

      {/* Conditions Summary */}
      {Object.keys(teeth).length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(teeth).filter(t => t.condition !== 'normal').map(t => (
            <div key={t.id} className="p-3 border rounded-lg bg-muted/30 flex items-start gap-3">
              <Badge variant="outline" className="h-6 w-8 justify-center shrink-0">{t.id}</Badge>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.condition}</p>
                <p className="text-sm">{t.notes || "Tidak ada catatan."}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tooth Edit Modal */}
      <Dialog open={selectedTooth !== null} onOpenChange={() => setSelectedTooth(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>Detail Gigi {selectedTooth}</span>
              <Badge variant="outline">FDI Notation</Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Kondisi Klinis</Label>
              <Select value={tempCondition} onValueChange={(v: ToothCondition) => setTempCondition(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal / Sehat</SelectItem>
                  <SelectItem value="caries">Caries (Karies)</SelectItem>
                  <SelectItem value="filling">Filling (Tumpat)</SelectItem>
                  <SelectItem value="missing">Missing (Hilang)</SelectItem>
                  <SelectItem value="crown">Crown (Mahkota Jaket)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Catatan Gigi</Label>
              <Textarea 
                placeholder="Tambahkan detail klinis..."
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTooth(null)}>Batal</Button>
            <Button onClick={handleSaveTooth}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LegendItem({ color, label, isX }: { color: string, label: string, isX?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-4 w-4 rounded border flex items-center justify-center relative shadow-sm", color)}>
        {isX && <span className="text-[10px] font-bold text-neutral-500">X</span>}
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
