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
type ToothSurface = "atas" | "bawah" | "kiri" | "kanan" | "tengah";

interface ToothState {
  id: number;
  surfaces: Partial<Record<ToothSurface, ToothCondition>>;
  notes: string;
}

const getSurfaceColor = (condition: ToothCondition | undefined) => {
  switch (condition) {
    case "caries": return "fill-red-500 stroke-red-700";
    case "filling": return "fill-green-500 stroke-green-700";
    case "crown": return "fill-blue-500 stroke-blue-700";
    case "missing": return "fill-neutral-200 stroke-neutral-400 opacity-50";
    default: return "fill-white stroke-neutral-300";
  }
};

const SurfacePath = ({ points, surface, current, onClick }: { 
  points: string, 
  surface: ToothSurface, 
  current: ToothCondition | undefined,
  onClick: () => void 
}) => (
  <polygon 
    points={points} 
    className={cn(
      getSurfaceColor(current), 
      "stroke-1 transition-colors hover:opacity-80"
    )}
    onClick={onClick}
  />
);

const ToothIcon = ({ 
  id, 
  teeth, 
  isFinalized, 
  onClick 
}: { 
  id: number, 
  teeth: Record<number, ToothState>,
  isFinalized: boolean,
  onClick: (id: number) => void
}) => {
  const state = teeth[id];
  const surfaces = state?.surfaces || {};
  const isMissing = Object.values(surfaces).some(c => c === "missing");

  return (
    <div 
      onClick={() => onClick(id)}
      className={cn(
        "flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-110",
        isFinalized && "cursor-default"
      )}
    >
      <span className="text-[10px] font-bold text-muted-foreground">{id}</span>
      <svg width="32" height="32" viewBox="0 0 32 32" className="drop-shadow-sm">
        {/* Surface Polygons */}
        <polygon points="0,0 32,0 24,8 8,8" className={cn(getSurfaceColor(surfaces.atas), "stroke-1")} />
        <polygon points="8,24 24,24 32,32 0,32" className={cn(getSurfaceColor(surfaces.bawah), "stroke-1")} />
        <polygon points="0,0 8,8 8,24 0,32" className={cn(getSurfaceColor(surfaces.kiri), "stroke-1")} />
        <polygon points="24,8 32,0 32,32 24,24" className={cn(getSurfaceColor(surfaces.kanan), "stroke-1")} />
        <rect x="8" y="8" width="16" height="16" className={cn(getSurfaceColor(surfaces.tengah), "stroke-1")} />
        
        {isMissing && (
          <path d="M0 0 L32 32 M32 0 L0 32" className="stroke-neutral-500 stroke-2 pointer-events-none" />
        )}
      </svg>
    </div>
  );
};

export function OdontogramSection() {
  const [teeth, setTeeth] = useState<Record<number, ToothState>>({});
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [isFinalized, setIsFinalized] = useState(false);

  // Modal temporary state
  const [tempSurfaces, setTempSurfaces] = useState<Partial<Record<ToothSurface, ToothCondition>>>({});
  const [tempNotes, setTempNotes] = useState("");
  const [activeCondition, setActiveCondition] = useState<ToothCondition>("caries");

  const handleToothClick = (id: number) => {
    if (isFinalized) return;
    const current = teeth[id] || { id, surfaces: {}, notes: "" };
    setSelectedTooth(id);
    setTempSurfaces(current.surfaces);
    setTempNotes(current.notes);
  };

  const toggleSurface = (surface: ToothSurface) => {
    setTempSurfaces((prev) => {
      const current = prev[surface];
      if (current === activeCondition) {
        // Toggle off if clicking the same condition
        const next = { ...prev };
        delete next[surface];
        return next;
      }
      return { ...prev, [surface]: activeCondition };
    });
  };

  const handleSaveTooth = () => {
    if (selectedTooth === null) return;
    setTeeth((prev) => ({
      ...prev,
      [selectedTooth]: {
        id: selectedTooth,
        surfaces: tempSurfaces,
        notes: tempNotes,
      },
    }));
    setSelectedTooth(null);
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
              {QUADRANTS.UR.map(id => <ToothIcon key={id} id={id} teeth={teeth} isFinalized={isFinalized} onClick={handleToothClick} />)}
            </div>
            <div className="flex gap-2 border-l pl-12">
              {QUADRANTS.UL.map(id => <ToothIcon key={id} id={id} teeth={teeth} isFinalized={isFinalized} onClick={handleToothClick} />)}
            </div>
          </div>

          {/* Lower Teeth */}
          <div className="flex justify-center gap-12 pt-8">
            <div className="flex gap-2">
              {QUADRANTS.LR.map(id => <ToothIcon key={id} id={id} teeth={teeth} isFinalized={isFinalized} onClick={handleToothClick} />)}
            </div>
            <div className="flex gap-2 border-l pl-12">
              {QUADRANTS.LL.map(id => <ToothIcon key={id} id={id} teeth={teeth} isFinalized={isFinalized} onClick={handleToothClick} />)}
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
          {Object.values(teeth).filter(t => Object.keys(t.surfaces).length > 0).map(t => (
            <div key={t.id} className="p-3 border rounded-lg bg-muted/30 flex items-start gap-3">
              <Badge variant="outline" className="h-6 w-8 justify-center shrink-0">{t.id}</Badge>
              <div className="space-y-1">
                <div className="flex flex-wrap gap-1">
                  {Object.entries(t.surfaces).map(([surface, cond]) => (
                    <Badge key={surface} variant="secondary" className="text-[9px] uppercase">
                      {surface}: {cond}
                    </Badge>
                  ))}
                </div>
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
          <div className="grid gap-6 py-4">
            <div className="flex justify-center py-4 bg-muted/20 rounded-lg">
              <div className="relative w-32 h-32">
                 <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md cursor-pointer">
                    <SurfacePath 
                      points="0,0 32,0 24,8 8,8" 
                      surface="atas" 
                      current={tempSurfaces.atas} 
                      onClick={() => toggleSurface("atas")} 
                    />
                    <SurfacePath 
                      points="8,24 24,24 32,32 0,32" 
                      surface="bawah" 
                      current={tempSurfaces.bawah} 
                      onClick={() => toggleSurface("bawah")} 
                    />
                    <SurfacePath 
                      points="0,0 8,8 8,24 0,32" 
                      surface="kiri" 
                      current={tempSurfaces.kiri} 
                      onClick={() => toggleSurface("kiri")} 
                    />
                    <SurfacePath 
                      points="24,8 32,0 32,32 24,24" 
                      surface="kanan" 
                      current={tempSurfaces.kanan} 
                      onClick={() => toggleSurface("kanan")} 
                    />
                    <rect 
                      x="8" y="8" width="16" height="16" 
                      className={cn(getSurfaceColor(tempSurfaces.tengah), "stroke-1 transition-colors hover:opacity-80")}
                      onClick={() => toggleSurface("tengah")}
                    />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold text-muted-foreground/50 opacity-0 group-hover:opacity-100 uppercase tracking-tighter">Click to toggle</span>
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                 {["caries", "filling", "crown", "missing"].map((cond) => (
                    <Button 
                      key={cond}
                      variant="outline" 
                      size="sm" 
                      className={cn(
                        "h-8 text-[10px] uppercase",
                        activeCondition === cond && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => setActiveCondition(cond as ToothCondition)}
                    >
                      {cond}
                    </Button>
                 ))}
                 <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-[10px] uppercase"
                    onClick={() => { setTempSurfaces({}); }}
                  >
                    Reset
                  </Button>
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

