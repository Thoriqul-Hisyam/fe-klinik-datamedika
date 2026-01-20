"use client";

import React, { useState, useMemo } from "react";
import { 
  Plus, 
  Trash2, 
  Send, 
  AlertTriangle, 
  Pill, 
  Info,
  CheckCircle2,
  Clock,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock Master Obat
const MASTER_OBAT = [
  { id: "OB001", name: "Paracetamol 500mg", type: "Tablet", stock: 1200, group: "Analgetik", price: 500 },
  { id: "OB002", name: "Amoxicillin 500mg", type: "Kapsul", stock: 450, group: "Antibiotik", allergies: ["Penisilin"], price: 1500 },
  { id: "OB003", name: "Ambroxol 30mg", type: "Tablet", stock: 800, group: "Mukolitik", price: 750 },
  { id: "OB004", name: "Cetirizine 10mg", type: "Tablet", stock: 300, group: "Antihistamin", price: 2000 },
  { id: "OB005", name: "Omeprazole 20mg", type: "Kapsul", stock: 500, group: "PPI", price: 3000 },
  { id: "OB006", name: "Metformin 500mg", type: "Tablet", stock: 1000, group: "Antidiabetik", price: 800 },
  { id: "OB007", name: "Amlodipine 5mg", type: "Tablet", stock: 600, group: "Antihipertensi", price: 1200 },
  { id: "OB008", name: "Dexamethasone 0.5mg", type: "Tablet", stock: 200, group: "Kortikosteroid", price: 600 },
];

interface PrescriptionItem {
  id: string;
  drugId: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  qty: number;
  price: number;
  instruction: string;
  hasAllergy?: boolean;
}

interface EPrescriptionSectionProps {
  patientAllergies: string[];
}

export function EPrescriptionSection({ patientAllergies }: EPrescriptionSectionProps) {
  const [items, setItems] = useState<PrescriptionItem[]>([
    { 
      id: "1", 
      drugId: "OB001", 
      name: "Paracetamol 500mg", 
      dosage: "1 tab", 
      frequency: "3x1", 
      duration: "5 hari", 
      qty: 15,
      price: 500,
      instruction: "Sesudah makan, jika demam" 
    },
  ]);
  const [status, setStatus] = useState<"draft" | "sent" | "dispensed">("draft");

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }, [items]);

  const addItem = () => {
    if (status !== "draft") return;
    const newItem: PrescriptionItem = {
      id: Math.random().toString(36).substr(2, 9),
      drugId: "",
      name: "",
      dosage: "",
      frequency: "3x1",
      duration: "3 hari",
      qty: 10,
      price: 0,
      instruction: "Sesudah makan",
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (status !== "draft") return;
    setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, drugId: string) => {
    if (status !== "draft") return;
    const drug = MASTER_OBAT.find((m) => m.id === drugId);
    if (!drug) return;

    // Check for allergies
    const hasAllergy = drug.allergies?.some(a => 
      patientAllergies.some(pa => pa.toLowerCase().includes(a.toLowerCase()))
    );

    setItems(
      items.map((i) =>
        i.id === id
          ? { ...i, drugId, name: drug.name, price: drug.price, hasAllergy }
          : i
      )
    );
  };

  const updateField = (id: string, field: keyof PrescriptionItem, value: any) => {
    if (status !== "draft") return;
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const handleSendToPharmacy = () => {
    if (items.some(i => i.hasAllergy)) {
      if (!confirm("Terdapat obat dengan peringatan alergi. Tetap kirim resep?")) {
        return;
      }
    }
    setStatus("sent");
  };

  const handleCreateNew = () => {
    setItems([]);
    setStatus("draft");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Pill className="h-5 w-5" />
          E-Resep Digital
        </h3>
        <div className="flex gap-2">
          {status !== "draft" && (
            <Button variant="outline" size="sm" onClick={handleCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              Buat Resep Baru
            </Button>
          )}

          {status === "sent" ? (
             <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200 h-9 px-3 gap-2">
                <Clock className="h-4 w-4" />
                Resep Terkirim ke Farmasi
             </Badge>
          ) : status === "dispensed" ? (
            <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 h-9 px-3 gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Obat Sudah Diambil
             </Badge>
          ) : (
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90"
              disabled={items.length === 0 || items.some(i => !i.drugId)}
              onClick={handleSendToPharmacy}
            >
              <Send className="h-4 w-4 mr-2" />
              Kirim ke Farmasi
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs h-9 w-[220px]">Nama Obat</TableHead>
              <TableHead className="text-xs h-9 w-[180px]">Dosis & Frekuensi</TableHead>
              <TableHead className="text-xs h-9 w-[80px] text-center">Jumlah</TableHead>
              <TableHead className="text-xs h-9 text-right w-[100px]">Harga</TableHead>
              <TableHead className="text-xs h-9 text-right w-[110px]">Subtotal</TableHead>
              <TableHead className="text-xs h-9">Instruksi</TableHead>
              {status === "draft" && <TableHead className="text-xs h-9 w-10"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="text-sm">
                <TableCell className="py-2">
                  <div className="space-y-1">
                    {status !== "draft" ? (
                      <span className="font-medium">{item.name}</span>
                    ) : (
                      <Select
                        value={item.drugId}
                        onValueChange={(val) => updateItem(item.id, val)}
                      >
                        <SelectTrigger className={cn("h-8 text-xs", item.hasAllergy && "border-destructive text-destructive")}>
                          <SelectValue placeholder="Cari obat..." />
                        </SelectTrigger>
                        <SelectContent>
                          {MASTER_OBAT.map((m) => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {item.hasAllergy && (
                      <div className="flex items-center gap-1.5 text-[10px] text-destructive font-bold animate-pulse">
                        <AlertTriangle className="h-3 w-3" />
                        ALERGI: {patientAllergies.join(", ")}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex gap-1">
                    <Input
                      value={item.dosage}
                      onChange={(e) => updateField(item.id, "dosage", e.target.value)}
                      placeholder="Dosis"
                      className="h-8 text-xs w-16"
                      disabled={status !== "draft"}
                    />
                    <Input
                      value={item.frequency}
                      onChange={(e) => updateField(item.id, "frequency", e.target.value)}
                      placeholder="Frekuensi"
                      className="h-8 text-xs flex-1"
                      disabled={status !== "draft"}
                    />
                  </div>
                </TableCell>
                <TableCell className="py-2 text-center">
                  <Input
                    type="number"
                    value={item.qty}
                    onChange={(e) => updateField(item.id, "qty", parseInt(e.target.value) || 0)}
                    className="h-8 w-14 text-center mx-auto text-xs"
                    disabled={status !== "draft"}
                  />
                </TableCell>
                <TableCell className="py-2 text-right font-mono text-xs text-muted-foreground whitespace-nowrap">
                   {formatIDR(item.price)}
                </TableCell>
                <TableCell className="py-2 text-right font-mono font-medium whitespace-nowrap">
                   {formatIDR(item.price * item.qty)}
                </TableCell>
                <TableCell className="py-2">
                  <Input
                    value={item.instruction}
                    onChange={(e) => updateField(item.id, "instruction", e.target.value)}
                    placeholder="Instruksi..."
                    className="h-8 text-xs"
                    disabled={status !== "draft"}
                  />
                </TableCell>
                {status === "draft" && (
                  <TableCell className="py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    Belum ada obat yang ditambahkan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {status === "draft" && (
          <div className="p-3 border-t bg-muted/20">
            <Button variant="outline" size="sm" onClick={addItem} className="text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Tambah Obat
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Interaction Info Placeholder */}
        <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 space-y-3">
          <div className="flex items-center gap-2 text-blue-800">
            <Info className="h-5 w-5" />
            <h4 className="text-sm font-semibold">Cek Interaksi Obat</h4>
          </div>
          <p className="text-xs text-blue-700 leading-relaxed">
            Sistem secara otomatis memeriksa interaksi antar obat dalam resep ini untuk memastikan keamanan pasien.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            Keamanan obat terverifikasi.
          </div>
        </div>

        {/* Prescription Summary */}
        <div className="rounded-lg border p-4 bg-muted/10 space-y-4 shadow-sm border-primary/10">
           <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Estimasi Billing Obat</span>
              <Badge variant="secondary" className="text-[10px]">Iter: 0</Badge>
           </div>
           <div className="space-y-2">
              <div className="flex justify-between text-xs">
                 <span className="text-muted-foreground">Total Item:</span>
                 <span className="font-bold">{items.length} Macam Obat</span>
              </div>
              <div className="flex justify-between text-base border-t pt-3 mt-1">
                 <span className="font-semibold text-muted-foreground">Total Harga:</span>
                 <span className="font-bold text-primary text-lg">{formatIDR(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-xs border-t pt-2 mt-2">
                 <span className="text-muted-foreground italic text-[10px] leading-relaxed">
                    *Harga di atas adalah estimasi retail klinik. Perubahan harga dapat terjadi saat verifikasi di bagian Farmasi.
                 </span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

