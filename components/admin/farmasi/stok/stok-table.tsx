"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface FarmasiStock {
  id: string;
  kode: string;
  nama: string;
  batch: string;
  expired: string;
  stokAsal: number;
  stokJual: number;
  satuan: string;
}

export const dummyFarmasiStocks: FarmasiStock[] = [
  { id: "1", kode: "OBT001", nama: "Paracetamol 500mg", batch: "BCH-F01", expired: "2026-12-31", stokAsal: 100, stokJual: 80, satuan: "Tablet" },
  { id: "2", kode: "OBT005", nama: "Vitamin C 500mg", batch: "BCH-F02", expired: "2025-08-20", stokAsal: 50, stokJual: 45, satuan: "Tablet" },
];

export function FarmasiStockTable({ data }: { data: FarmasiStock[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kode</TableHead>
            <TableHead>Nama Obat</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Expired</TableHead>
            <TableHead className="text-right">Stok Asal</TableHead>
            <TableHead className="text-right">Stok Jual</TableHead>
            <TableHead>Satuan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.kode}</TableCell>
              <TableCell>{item.nama}</TableCell>
              <TableCell>{item.batch}</TableCell>
              <TableCell>{item.expired}</TableCell>
              <TableCell className="text-right">{item.stokAsal}</TableCell>
              <TableCell className="text-right">{item.stokJual}</TableCell>
              <TableCell>{item.satuan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
