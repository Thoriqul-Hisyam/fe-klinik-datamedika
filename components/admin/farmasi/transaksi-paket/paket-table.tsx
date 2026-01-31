"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface TransaksiPaket {
  id: string;
  noTransaksi: string;
  namaPaket: string;
  pembeli: string;
  tanggal: string;
  total: number;
}

export const dummyTransaksiPaket: TransaksiPaket[] = [
  { id: "1", noTransaksi: "TP-001", namaPaket: "Paket Flu", pembeli: "Rudi Ansyah", tanggal: "2026-01-31", total: 25000 },
];

export function TransaksiPaketTable({ data }: { data: TransaksiPaket[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No. Transaksi</TableHead>
            <TableHead>Nama Paket</TableHead>
            <TableHead>Pembeli</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.noTransaksi}</TableCell>
              <TableCell>{item.namaPaket}</TableCell>
              <TableCell>{item.pembeli}</TableCell>
              <TableCell>{item.tanggal}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
