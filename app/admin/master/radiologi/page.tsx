"use client";

import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Edit,
  Plus,
  Trash2,
  Camera,
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Mock Radiologi Data
const initialRadioTests = [
  { id: "RAD001", kode: "R001", nama: "Thorax Foto PA", modalitas: "X-Ray", harga: 250000 },
  { id: "RAD002", kode: "R002", nama: "Abdomen 3 Posisi", modalitas: "X-Ray", harga: 450000 },
  { id: "RAD003", kode: "R003", nama: "USG Abdomen Upper/Lower", modalitas: "USG", harga: 350000 },
  { id: "RAD004", kode: "R004", nama: "CT-Scan Kepala Non-Kontras", modalitas: "CT-Scan", harga: 1200000 },
  { id: "RAD005", kode: "R005", nama: "Panoramic Foto", modalitas: "Dental X-Ray", harga: 150000 },
];

export default function MasterRadiologiPage() {
  const [radioTests, setRadioTests] = useState(initialRadioTests);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<typeof initialRadioTests[0] | null>(null);
  const [formData, setFormData] = useState({ kode: "", nama: "", modalitas: "", harga: 0 });

  const filteredData = radioTests.filter(
    (test) =>
      test.nama.toLowerCase().includes(search.toLowerCase()) ||
      test.kode.toLowerCase().includes(search.toLowerCase()) ||
      test.modalitas.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingTest(null);
    setFormData({ kode: "", nama: "", modalitas: "", harga: 0 });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (test: typeof initialRadioTests[0]) => {
    setEditingTest(test);
    setFormData({ kode: test.kode, nama: test.nama, modalitas: test.modalitas, harga: test.harga });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus data pemeriksaan ini?")) {
      setRadioTests(radioTests.filter((test) => test.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingTest) {
      setRadioTests(radioTests.map((t) => (t.id === editingTest.id ? { ...t, ...formData } : t)));
    } else {
      const newTest = {
        id: `RAD${String(radioTests.length + 1).padStart(3, "0")}`,
        ...formData,
      };
      setRadioTests([...radioTests, newTest]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Master Radiologi</h1>
          <p className="text-sm text-muted-foreground">Kelola jenis pemeriksaan radiologi</p>
        </div>
        <Button size="sm" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Pemeriksaan
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Daftar Pemeriksaan</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pemeriksaan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama Pemeriksaan</TableHead>
                <TableHead>Modalitas</TableHead>
                <TableHead className="text-right">Harga</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-mono text-xs">{test.kode}</TableCell>
                  <TableCell className="font-medium">{test.nama}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">{test.modalitas}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(test.harga)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenEdit(test)}>
                          <Edit className="h-3.5 w-3.5 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(test.id)}>
                          <Trash2 className="h-3.5 w-3.5 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTest ? "Edit Pemeriksaan" : "Tambah Pemeriksaan"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="kode">Kode Pemeriksaan</Label>
              <Input
                id="kode"
                value={formData.kode}
                onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nama">Nama Pemeriksaan</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="modalitas">Modalitas</Label>
              <Input
                id="modalitas"
                value={formData.modalitas}
                onChange={(e) => setFormData({ ...formData, modalitas: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="harga">Harga</Label>
              <Input
                id="harga"
                type="number"
                value={formData.harga}
                onChange={(e) => setFormData({ ...formData, harga: Number(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSubmit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
