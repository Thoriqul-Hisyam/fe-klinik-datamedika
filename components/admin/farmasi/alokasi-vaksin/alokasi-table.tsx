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

export interface VaksinAllocation {
  id: string;
  namaVaksin: string;
  pasien: string;
  tanggalAlokasi: string;
  status: "Sudah Digunakan" | "Menunggu" | "Dibatalkan";
  jumlah: number;
}

export const dummyVaksinAllocations: VaksinAllocation[] = [
  { id: "1", namaVaksin: "Sinovac", pasien: "Budi Santoso", tanggalAlokasi: "2026-02-01", status: "Menunggu", jumlah: 1 },
  { id: "2", namaVaksin: "AstraZeneca", pasien: "Siti Aminah", tanggalAlokasi: "2026-01-28", status: "Sudah Digunakan", jumlah: 1 },
];

export function VaksinAllocationTable({ data }: { data: VaksinAllocation[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Vaksin</TableHead>
            <TableHead>Pasien</TableHead>
            <TableHead>Tanggal Alokasi</TableHead>
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.namaVaksin}</TableCell>
              <TableCell>{item.pasien}</TableCell>
              <TableCell>{item.tanggalAlokasi}</TableCell>
              <TableCell className="text-right">{item.jumlah}</TableCell>
              <TableCell>
                <Badge variant={item.status === "Sudah Digunakan" ? "default" : item.status === "Menunggu" ? "secondary" : "destructive"}>
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
