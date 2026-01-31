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

export interface PaketObat {
  id: string;
  namaPaket: string;
  deskripsi: string;
  harga: number;
  items: string[];
}

export const dummyPaketObat: PaketObat[] = [
  { id: "1", namaPaket: "Paket Flu", deskripsi: "Paket obat flu ringan", harga: 25000, items: ["Paracetamol", "CTM", "Vitamin C"] },
  { id: "2", namaPaket: "Paket Batuk", deskripsi: "Paket obat batuk berdahak", harga: 35000, items: ["Ambroxol", "GG", "Vitamin C"] },
];

export function PaketObatTable({ data }: { data: PaketObat[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Paket</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Daftar Item</TableHead>
            <TableHead className="text-right">Harga</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.namaPaket}</TableCell>
              <TableCell>{item.deskripsi}</TableCell>
              <TableCell>{item.items.join(", ")}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.harga)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
