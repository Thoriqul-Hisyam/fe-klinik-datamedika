"use client";

import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Edit,
  Plus,
  Trash2,
  List,
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

// Mock Laboratorium Data
const initialLabTests = [
  { id: "LAB001", kode: "L001", nama: "Darah Lengkap", kategori: "Hematologi", harga: 150000 },
  { id: "LAB002", kode: "L002", nama: "Gula Darah Sewaktu", kategori: "Kimia Darah", harga: 50000 },
  { id: "LAB003", kode: "L003", nama: "Urine Lengkap", kategori: "Urinalisa", harga: 75000 },
  { id: "LAB004", kode: "L004", nama: "Kolesterol Total", kategori: "Kimia Darah", harga: 85000 },
  { id: "LAB005", kode: "L005", nama: "Asam Urat", kategori: "Kimia Darah", harga: 45000 },
];

export default function MasterLaboratoriumPage() {
  const [labTests, setLabTests] = useState(initialLabTests);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<typeof initialLabTests[0] | null>(null);
  const [formData, setFormData] = useState({ kode: "", nama: "", kategori: "", harga: 0 });

  const filteredData = labTests.filter(
    (test) =>
      test.nama.toLowerCase().includes(search.toLowerCase()) ||
      test.kode.toLowerCase().includes(search.toLowerCase()) ||
      test.kategori.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingTest(null);
    setFormData({ kode: "", nama: "", kategori: "", harga: 0 });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (test: typeof initialLabTests[0]) => {
    setEditingTest(test);
    setFormData({ kode: test.kode, nama: test.nama, kategori: test.kategori, harga: test.harga });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus data pemeriksaan ini?")) {
      setLabTests(labTests.filter((test) => test.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingTest) {
      setLabTests(labTests.map((t) => (t.id === editingTest.id ? { ...t, ...formData } : t)));
    } else {
      const newTest = {
        id: `LAB${String(labTests.length + 1).padStart(3, "0")}`,
        ...formData,
      };
      setLabTests([...labTests, newTest]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Master Laboratorium</h1>
          <p className="text-sm text-muted-foreground">Kelola jenis pemeriksaan laboratorium</p>
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
                <TableHead>Kategori</TableHead>
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
                    <Badge variant="secondary" className="text-[10px]">{test.kategori}</Badge>
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
              <Label htmlFor="kategori">Kategori</Label>
              <Input
                id="kategori"
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
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
