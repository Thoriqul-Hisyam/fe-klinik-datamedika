"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  FileText,
  Clock,
  Camera,
  Search,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Mock Radiology Master Data
const radioMaster = [
  { id: "R001", nama: "Thorax Foto PA", modalitas: "X-Ray", harga: 250000 },
  { id: "R002", nama: "Abdomen 3 Posisi", modalitas: "X-Ray", harga: 450000 },
  { id: "R003", nama: "USG Abdomen Upper/Lower", modalitas: "USG", harga: 350000 },
  { id: "R004", nama: "CT-Scan Kepala Non-Kontras", modalitas: "CT-Scan", harga: 1200000 },
  { id: "R005", nama: "Panoramic Foto", modalitas: "Dental X-Ray", harga: 150000 },
  { id: "R006", nama: "USG Mammae", modalitas: "USG", harga: 400000 },
  { id: "R007", nama: "MRI Lumbal Non-Kontras", modalitas: "MRI", harga: 2500000 },
];

// Mock Orders
const initialOrders = [
  {
    id: "ORD-RAD-001",
    tanggal: "2026-01-26 10:15",
    dokter: "dr. Sarah",
    items: ["Thorax Foto PA"],
    status: "pending",
  },
];

export function RadiologyOrderSection() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filteredMaster = radioMaster.filter((test) =>
    test.nama.toLowerCase().includes(search.toLowerCase())
  );

  const toggleTest = (testId: string) => {
    setSelectedTests((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  const handleCreateOrder = () => {
    if (selectedTests.length === 0) return;

    const testNames = selectedTests.map(
      (id) => radioMaster.find((t) => t.id === id)?.nama || ""
    );

    const newOrder = {
      id: `ORD-RAD-${String(orders.length + 1).padStart(3, "0")}`,
      tanggal: new Date().toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      dokter: "dr. Sarah", // Mock current user
      items: testNames,
      status: "pending",
    };

    setOrders([newOrder, ...orders]);
    setSelectedTests([]);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5 h-[calc(100vh-20rem)]">
      {/* Left: Selection */}
      <Card className="lg:col-span-2 flex flex-col overflow-hidden">
        <CardHeader className="pb-3 border-b bg-muted/20">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" />
            PILIH PEMERIKSAAN RADIOLOGI
          </CardTitle>
        </CardHeader>
        <div className="p-4 border-b bg-background">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari jenis pemeriksaan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
        <CardContent className="flex-1 overflow-hidden p-0">
          <div className="h-full overflow-y-auto">
            <div className="p-4 space-y-4">
              {filteredMaster.map((test) => {
                const isSelected = selectedTests.includes(test.id);
                return (
                  <div
                    key={test.id}
                    className={cn(
                      "flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors",
                      isSelected ? "bg-primary/10 border-primary/20 border" : "hover:bg-muted/50 border border-transparent"
                    )}
                    onClick={() => toggleTest(test.id)}
                  >
                    <div className={cn(
                      "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                      isSelected ? "bg-primary border-primary" : "bg-background border-input"
                    )}>
                      {isSelected && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <Label className="text-sm font-medium cursor-pointer">
                        {test.nama}
                      </Label>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {test.modalitas}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(test.harga)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
        <div className="p-4 border-t bg-muted/5">
          <Button
            className="w-full shadow-md"
            disabled={selectedTests.length === 0}
            onClick={handleCreateOrder}
          >
            <Plus className="h-4 w-4 mr-2" />
            Buat Order Radiologi ({selectedTests.length})
          </Button>
        </div>
      </Card>

      {/* Right: Order History */}
      <div className="lg:col-span-3 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center gap-2 px-1">
          <Clock className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Riwayat Order Radiologi
          </h4>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-3 space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/5">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-20" />
                <p className="text-sm text-muted-foreground">Belum ada order radiologi.</p>
              </div>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 bg-muted/20">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-primary">
                          {order.id}
                        </span>
                        <Badge
                          variant={order.status === "pending" ? "outline" : "success"}
                          className="text-[9px] px-1.5 py-0 h-4 uppercase font-bold"
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5 mr-1" />
                        {order.tanggal} • Oleh {order.dokter}
                      </div>
                    </div>
                    {order.status === "pending" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={() =>
                          setOrders(orders.filter((o) => o.id !== order.id))
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 bg-muted/50 border rounded-full px-3 py-1"
                        >
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                          <span className="text-xs font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
