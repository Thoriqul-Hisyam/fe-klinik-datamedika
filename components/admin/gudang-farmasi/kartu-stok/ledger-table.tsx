"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StockMovement } from "./data";

export function StockLedger({ data }: { data: StockMovement[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Referensi</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead className="text-right">Masuk</TableHead>
            <TableHead className="text-right">Keluar</TableHead>
            <TableHead className="text-right font-bold">Sisa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                Pilih obat untuk melihat riwayat stok.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.tanggal}</TableCell>
                <TableCell className="font-medium">{item.referensi}</TableCell>
                <TableCell>{item.keterangan}</TableCell>
                <TableCell className="text-right text-green-600">{item.masuk || "-"}</TableCell>
                <TableCell className="text-right text-red-600">{item.keluar || "-"}</TableCell>
                <TableCell className="text-right font-bold">{item.sisa}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
