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
import { Stock } from "./data";

export function StokTable({ data }: { data: Stock[] }) {
  const isExpiredSoon = (date: string) => {
    const exp = new Date(date);
    const now = new Date();
    const diff = exp.getTime() - now.getTime();
    return diff < 1000 * 60 * 60 * 24 * 90; // 90 days
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Kode</TableHead>
            <TableHead>Nama Obat</TableHead>
            <TableHead>Batch No</TableHead>
            <TableHead>Expired</TableHead>
            <TableHead className="text-right">Stok Gudang</TableHead>
            <TableHead className="text-right">Stok Farmasi</TableHead>
            <TableHead>Satuan</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{item.kodeObat}</TableCell>
              <TableCell>{item.namaObat}</TableCell>
              <TableCell>{item.batchNo}</TableCell>
              <TableCell>{item.expiredDate}</TableCell>
              <TableCell className="text-right">{item.stokGudang}</TableCell>
              <TableCell className="text-right">{item.stokFarmasi}</TableCell>
              <TableCell>{item.satuan}</TableCell>
              <TableCell>
                {isExpiredSoon(item.expiredDate) ? (
                  <Badge variant="destructive">Exp. Soon</Badge>
                ) : (
                  <Badge variant="default">Aman</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
