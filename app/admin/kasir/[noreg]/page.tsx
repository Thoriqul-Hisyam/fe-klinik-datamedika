"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Printer, 
  Lock, 
  Unlock, 
  Save, 
  CreditCard, 
  FileText, 
  Pill, 
  History,
  AlertCircle,
  ChevronDown,
  Edit2,
  Trash2,
  Check,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { PrintableDocument } from "@/components/admin/kasir/printable-document";

// Dummy data fetching simulator
const getRegistrationData = (noReg: string) => {
  return {
    noReg: noReg,
    noRM: "001234",
    namaPasien: "Budi Santoso",
    jenisKelamin: "Laki-laki",
    tglLahir: "1985-05-12 (38 Thn)",
    poli: "Poli Umum",
    dokter: "dr. Andi Wijaya",
    tanggal: "2026-02-03",
    penjamin: "Umum",
    status: "Terbuka"
  };
};

const dummyBillingItems = [
  { id: 1, category: "Tindakan", name: "Konsultasi Dokter Umum", qty: 1, price: 50000, discount: 0, status: "Pending" },
  { id: 2, category: "Tindakan", name: "Nebulizer", qty: 1, price: 75000, discount: 0, status: "Pending" },
  { id: 3, category: "Obat", name: "Amoxicillin 500mg", qty: 10, price: 2500, discount: 0, status: "Pending" },
  { id: 4, category: "Obat", name: "Paracetamol 500mg", qty: 10, price: 1000, discount: 0, status: "Pending" },
  { id: 5, category: "Alkes", name: "Masker Nebulizer", qty: 1, price: 15000, discount: 0, status: "Pending" },
];

export default function KasirDetailPage() {
  const params = useParams();
  const router = useRouter();
  const noReg = params.noreg as string;
  
  const [patient, setPatient] = useState(getRegistrationData(noReg));
  const [items, setItems] = useState(dummyBillingItems);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Tunai");
  const [isEditPenjaminOpen, setIsEditPenjaminOpen] = useState(false);
  const [tempPenjamin, setTempPenjamin] = useState(patient.penjamin);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  

  // Calculations
  const subTotalSelected = useMemo(() => {
    return items
      .filter(item => selectedIds.includes(item.id))
      .reduce((acc, item) => acc + (item.price * item.qty) - item.discount, 0);
  }, [items, selectedIds]);

  const totalSelected = useMemo(() => {
    return Math.max(0, subTotalSelected - globalDiscount);
  }, [subTotalSelected, globalDiscount]);

  const handleUpdateItemDiscount = (id: number, discount: number) => {
    if (isLocked) return;
    setItems(items.map(item => item.id === id ? { ...item, discount } : item));
  };

  const toggleSelectItem = (id: number) => {
    if (isLocked) return;
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAllPending = () => {
    if (isLocked) return;
    const pendingIds = items.filter(i => i.status === "Pending").map(i => i.id);
    setSelectedIds(pendingIds);
  };

  const handleProcessPayment = () => {
    if (selectedIds.length === 0) return;
    
    const newInvoice = {
      id: `INV-${Date.now()}`,
      items: items.filter(item => selectedIds.includes(item.id)),
      subTotal: subTotalSelected,
      discount: globalDiscount,
      total: totalSelected,
      method: paymentMethod,
      date: new Date().toLocaleString('id-ID'),
    };

    setPaymentHistory([...paymentHistory, newInvoice]);
    setItems(items.map(item => 
      selectedIds.includes(item.id) ? { ...item, status: "Paid" } : item
    ));
    setSelectedIds([]);
    setGlobalDiscount(0);
    // In a real app, logic to check if all items paid to auto-lock might go here
  };

  const handleToggleLock = () => {
    setIsLocked(!isLocked);
  };

  const handleOpenPrint = (type: "Invoice" | "Summary" | "Medicine", invoiceData?: any) => {
    let data;
    if (invoiceData) {
        data = {
            ...patient,
            noInvoice: invoiceData.id,
            items: invoiceData.items,
            subTotal: invoiceData.subTotal,
            discount: invoiceData.discount,
            total: invoiceData.total,
            date: invoiceData.date
        };
    } else {
        // Global / Summary mode
        const paidItems = items.filter(i => i.status === "Paid");
        const displayItems = type === "Medicine" ? items.filter(i => i.category === "Obat") : items;
        
        data = {
            ...patient,
            items: displayItems,
            subTotal: displayItems.reduce((acc, i) => acc + (i.price * i.qty) - i.discount, 0),
            discount: type === "Summary" ? globalDiscount : 0, // Global discount applies to summary usually
            total: 0, // calculated below
            date: new Date().toLocaleString('id-ID')
        };
        data.total = data.subTotal - data.discount;
    }

    // Instead of showing modal, process and open print tab directly
    sessionStorage.setItem("lastPrintData", JSON.stringify(data));
    window.open(`/kasir-print?type=${type}`, "_blank");
  };

  const handleSavePenjamin = () => {
    setPatient({ ...patient, penjamin: tempPenjamin });
    setIsEditPenjaminOpen(false);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/kasir")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Panel Kasir & Billing</h1>
            <p className="text-sm text-muted-foreground">{noReg}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={cn(isLocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700")} variant="outline">
            {isLocked ? <Lock className="h-3 w-3 mr-1" /> : <Unlock className="h-3 w-3 mr-1" />}
            Status: {isLocked ? "Terkunci" : "Terbuka"}
          </Badge>
          <Button variant={isLocked ? "outline" : "destructive"} size="sm" onClick={handleToggleLock}>
            {isLocked ? "Buka Transaksi" : "Tutup Transaksi"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Billing Table & Payment Process */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Daftar Billing & Tagihan</CardTitle>
                  <CardDescription>Pilih item yang ingin dibayar pada transaksi ini.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={selectAllPending} disabled={isLocked}>
                    Pilih Semua Pending
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2" disabled={isLocked}>
                    <Plus className="h-4 w-4" /> Tambah Manual
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Nama Item</TableHead>
                    <TableHead className="text-center w-20">Qty</TableHead>
                    <TableHead className="text-right">Harga</TableHead>
                    <TableHead className="text-right">Diskon Item</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    const isPaid = item.status === "Paid";
                    
                    return (
                      <TableRow key={item.id} className={cn(isSelected && "bg-primary/5", isPaid && "opacity-60 bg-muted/30")}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectItem(item.id)}
                            disabled={isLocked || isPaid}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-[10px] text-muted-foreground uppercase">{item.category}</div>
                        </TableCell>
                        <TableCell className="text-center text-sm">{item.qty}</TableCell>
                        <TableCell className="text-right text-sm">{formatCurrency(item.price)}</TableCell>
                        <TableCell className="text-right">
                          <Input
                            type="number"
                            className="h-8 w-24 ml-auto text-right text-xs"
                            value={item.discount}
                            onChange={(e) => handleUpdateItemDiscount(item.id, Number(e.target.value))}
                            disabled={isLocked || isPaid}
                          />
                        </TableCell>
                        <TableCell className="text-right text-sm font-semibold">
                          {formatCurrency((item.price * item.qty) - item.discount)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={isPaid ? "default" : "secondary"} className={cn("text-[10px]", isPaid ? "bg-emerald-100 text-emerald-700" : "")}>
                            {isPaid ? "Lunas" : "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-primary/20 bg-primary/[0.02]">
              <CardHeader className="py-4">
                <CardTitle className="text-base text-primary">Proses Pembayaran Terpilih</CardTitle>
                <CardDescription>Finalisasi item-item yang sudah dipilih di atas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Metode</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod} disabled={isLocked}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Metode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tunai">Tunai</SelectItem>
                        <SelectItem value="Transfer">Transfer</SelectItem>
                        <SelectItem value="Debit">Kartu Debit</SelectItem>
                        <SelectItem value="QRIS">QRIS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Diskon Tambahan (Rp)</Label>
                    <Input
                      type="number"
                      className="h-9"
                      value={globalDiscount}
                      onChange={(e) => setGlobalDiscount(Number(e.target.value))}
                      disabled={isLocked || selectedIds.length === 0}
                    />
                  </div>
                </div>
                
                <div className="pt-2 space-y-2 border-t border-primary/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal Item Terpilih</span>
                    <span>{formatCurrency(subTotalSelected)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Diskon Tambahan</span>
                    <span className="text-red-600">-{formatCurrency(globalDiscount)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-primary pt-1">
                    <span>Grand Total</span>
                    <span>{formatCurrency(totalSelected)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-4">
                <Button 
                  className="w-full gap-2 shadow-lg" 
                  disabled={isLocked || selectedIds.length === 0}
                  onClick={handleProcessPayment}
                >
                  <Save className="h-4 w-4" />
                  Bayar & Terbitkan Invoice
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Opsi Pencetakan Global</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button 
                    variant="outline" className="flex-col h-16 text-[10px] gap-1 px-1"
                    onClick={() => handleOpenPrint("Medicine")}
                >
                   <Printer className="h-5 w-5 mb-1" />
                   Cetak Nota Obat
                </Button>
                <Button 
                    variant="outline" className="flex-col h-16 text-[10px] gap-1 px-1"
                    onClick={() => router.push("/admin/laporan/keuangan")}
                >
                   <History className="h-5 w-5 mb-1" />
                   Riwayat Transaksi
                </Button>
                <Button 
                    className="col-span-2 h-16 flex-col gap-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleOpenPrint("Summary")}
                >
                   <Printer className="h-6 w-6" />
                   <span className="text-sm">Cetak Rincian Seluruh Billing (Noreg)</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: Patient Info & History */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Informasi Pasien
                <Dialog open={isEditPenjaminOpen} onOpenChange={setIsEditPenjaminOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={isLocked}>
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ubah Penjamin / Cara Bayar</DialogTitle>
                      <DialogDescription>
                        Mengubah penjamin akan mempengaruhi perhitungan billing dan klaim di sistem.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Penjamin Pasien</Label>
                        <Select value={tempPenjamin} onValueChange={setTempPenjamin}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Penjamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Umum">Umum (Mandiri)</SelectItem>
                            <SelectItem value="BPJS">BPJS Kesehatan</SelectItem>
                            <SelectItem value="Asuransi Lain">Asuransi Swasta</SelectItem>
                            <SelectItem value="Perusahaan">Tagihan Perusahaan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditPenjaminOpen(false)}>Batal</Button>
                      <Button onClick={handleSavePenjamin}>Simpan Perubahan</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nama</span>
                <span className="font-semibold text-right">{patient.namaPasien}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">No. RM</span>
                <span className="text-right">{patient.noRM}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Penjamin</span>
                <Badge variant="secondary">{patient.penjamin}</Badge>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Poli/Unit</span>
                <span className="text-right">{patient.poli}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dokter</span>
                <span className="text-right">{patient.dokter}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment History / Invoices */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Riwayat Pembayaran</CardTitle>
              <CardDescription className="text-[10px]">Invoice yang sudah diterbitkan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {paymentHistory.length === 0 ? (
                <p className="text-xs text-center text-muted-foreground py-4 border border-dashed rounded-lg">Belum ada pembayaran</p>
              ) : (
                <div className="space-y-2">
                  {paymentHistory.map((inv) => (
                    <div key={inv.id} className="p-2 border rounded-lg text-xs space-y-1 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between font-bold">
                        <span>{inv.id}</span>
                        <span className="text-primary">{formatCurrency(inv.total)}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">{inv.date}</div>
                      <div className="flex gap-1 mt-2">
                        <Button 
                            variant="outline" size="xs" className="h-6 text-[10px] px-2 gap-1 flex-1"
                            onClick={() => handleOpenPrint("Invoice", inv)}
                        >
                          <Printer className="h-2 w-2" /> Invoice
                        </Button>
                        <Button 
                            variant="outline" size="xs" className="h-6 text-[10px] px-2 gap-1 flex-1"
                            onClick={() => handleOpenPrint("Summary", inv)}
                        >
                          <FileText className="h-2 w-2" /> Summary
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="secondary" size="sm" className="w-full mt-2 text-xs gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                    onClick={() => handleOpenPrint("Summary")}
                  >
                    <Printer className="h-3 w-3" /> Cetak Semua Rincian
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}

