"use client";

import React, { useState, useMemo } from "react";
import { 
  Plus, 
  Trash2, 
  Receipt, 
  CheckCircle2, 
  AlertCircle,
  Calculator,
  Lock,
  Unlock
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

// Mock Master Tindakan
const MASTER_TINDAKAN = [
  { id: "T001", name: "Konsultasi Dokter Umum", price: 50000 },
  { id: "T002", name: "Konsultasi Spesialis", price: 150000 },
  { id: "T003", name: "Nebulizer", price: 75000 },
  { id: "T004", name: "Tindakan Luka Ringan", price: 100000 },
  { id: "T005", name: "Tindakan Luka Sedang", price: 250000 },
  { id: "T006", name: "Swab Antigen", price: 125000 },
  { id: "T007", name: "EKG", price: 150000 },
  { id: "T008", name: "Admin Klinik", price: 25000 },
];

interface BillingAction {
  id: string;
  actionId: string;
  name: string;
  price: number;
  qty: number;
}

export function DoctorActionBilling() {
  const [actions, setActions] = useState<BillingAction[]>([
    { id: "1", actionId: "T001", name: "Konsultasi Dokter Umum", price: 50000, qty: 1 },
    { id: "2", actionId: "T008", name: "Admin Klinik", price: 25000, qty: 1 },
  ]);
  const [isFinalized, setIsFinalized] = useState(false);

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const currentTotal = useMemo(() => {
    return actions.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [actions]);

  const addAction = () => {
    if (isFinalized) return;
    const newAction: BillingAction = {
      id: Math.random().toString(36).substr(2, 9),
      actionId: "",
      name: "",
      price: 0,
      qty: 1,
    };
    setActions([...actions, newAction]);
  };

  const removeAction = (id: string) => {
    if (isFinalized) return;
    setActions(actions.filter((a) => a.id !== id));
  };

  const updateAction = (id: string, actionId: string) => {
    if (isFinalized) return;
    const master = MASTER_TINDAKAN.find((m) => m.id === actionId);
    if (!master) return;

    setActions(
      actions.map((a) =>
        a.id === id
          ? { ...a, actionId, name: master.name, price: master.price }
          : a
      )
    );
  };

  const updateQty = (id: string, qtyStr: string) => {
    if (isFinalized) return;
    const qty = parseInt(qtyStr) || 0;
    setActions(
      actions.map((a) => (a.id === id ? { ...a, qty: Math.max(0, qty) } : a))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Tindakan & Biaya Layanan
        </h3>
        <div className="flex gap-2">
          {isFinalized ? (
            <Button 
                variant="outline" 
                size="sm" 
                className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100"
                onClick={() => setIsFinalized(false)}
            >
              <Unlock className="h-4 w-4 mr-2" />
              Buka Kunci
            </Button>
          ) : (
            <Button 
                size="sm" 
                variant="default" 
                className="bg-green-600 hover:bg-green-700"
                disabled={actions.length === 0 || actions.some(a => !a.actionId)}
                onClick={() => setIsFinalized(true)}
            >
              <Lock className="h-4 w-4 mr-2" />
              Finalisasi Billing
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs h-9 w-[300px]">Tindakan / Layanan</TableHead>
              <TableHead className="text-xs h-9 text-right w-[150px]">Harga Satuan</TableHead>
              <TableHead className="text-xs h-9 text-center w-[100px]">Qty</TableHead>
              <TableHead className="text-xs h-9 text-right">Subtotal</TableHead>
              {!isFinalized && <TableHead className="text-xs h-9 w-10"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {actions.map((action) => (
              <TableRow key={action.id} className="text-sm">
                <TableCell className="py-2">
                  {isFinalized ? (
                    <span className="font-medium">{action.name}</span>
                  ) : (
                    <Select
                      value={action.actionId}
                      onValueChange={(val) => updateAction(action.id, val)}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Pilih tindakan..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MASTER_TINDAKAN.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
                <TableCell className="py-2 text-right font-mono text-xs">
                  {formatIDR(action.price)}
                </TableCell>
                <TableCell className="py-2 text-center">
                  {isFinalized ? (
                    <span>{action.qty}</span>
                  ) : (
                    <Input
                      type="number"
                      value={action.qty}
                      onChange={(e) => updateQty(action.id, e.target.value)}
                      className="h-8 w-16 text-center mx-auto text-xs"
                    />
                  )}
                </TableCell>
                <TableCell className="py-2 text-right font-semibold">
                  {formatIDR(action.price * action.qty)}
                </TableCell>
                {!isFinalized && (
                  <TableCell className="py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => removeAction(action.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {actions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Belum ada tindakan yang ditambahkan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Footer Info */}
        <div className="p-4 bg-muted/20 border-t flex flex-col md:flex-row items-center justify-between gap-4">
            {!isFinalized ? (
                <Button variant="outline" size="sm" onClick={addAction} className="text-xs">
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Tambah Baris
                </Button>
            ) : (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1.5 rounded-md border border-green-100">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs font-medium">Billing telah difinalisasi dan dikunci.</span>
                </div>
            )}

            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Tagihan</p>
                    <p className="text-2xl font-bold text-primary">{formatIDR(currentTotal)}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Warning Box */}
      {!isFinalized && (
        <div className="rounded-lg bg-orange-50 border border-orange-100 p-3 flex gap-3 text-orange-800">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
                <h4 className="text-sm font-semibold">Perhatian Pembiayaan</h4>
                <p className="text-xs leading-relaxed opacity-90">
                    Pastikan semua tindakan medik dan alat kesehatan yang digunakan telah tercatat dengan benar sebelum melakukan finalisasi. Finalisasi akan mengirimkan tagihan ke bagian kasir secara otomatis.
                </p>
            </div>
        </div>
      )}
    </div>
  );
}
