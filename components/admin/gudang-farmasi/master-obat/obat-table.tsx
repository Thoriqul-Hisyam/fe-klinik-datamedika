"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Tag } from "lucide-react";
import { Obat } from "./data";
import { format } from "path";

interface ObatTableProps {
  data: Obat[];
  onEdit: (obat: Obat) => void;
  onDelete: (obat: Obat) => void;
  onSetPrice: (obat: Obat) => void;
}

export function ObatTable({ data, onEdit, onDelete, onSetPrice }: ObatTableProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Kode</TableHead>
            <TableHead>Nama Obat</TableHead>
            <TableHead>KFA</TableHead>
            <TableHead>Harga Beli</TableHead>
            <TableHead>Tipe Harga</TableHead>
            <TableHead>Harga Jual / Margin</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                Tidak ada data obat.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{item.kodeObat}</TableCell>
                <TableCell>{item.namaObat}</TableCell>
                <TableCell>{item.kfa}</TableCell>
                <TableCell>{formatCurrency(item.hargaBeli)}</TableCell>
                <TableCell>{item.tipeHarga}</TableCell>
                <TableCell>
                  {item.tipeHarga === "Fix" 
                    ? formatCurrency(item.hargaJualFix || 0)
                    : item.tipeHarga === "Persentase"
                    ? `${item.marginPersentase}%`
                    : "-"}
                </TableCell>
                <TableCell>
                  <Badge variant={item.status === "Show" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onSetPrice(item)} title="Set Price">
                    <Tag className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(item)} title="Edit">
                    <Edit className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(item)} title="Hapus">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
