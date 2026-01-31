"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface APSTransaction {
  id: string;
  noKwitansi: string;
  pembeli: string;
  tanggal: string;
  total: number;
}

export const dummyAPSTransactions: APSTransaction[] = [
  { id: "1", noKwitansi: "APS-001", pembeli: "Anonim", tanggal: "2026-01-31", total: 15000 },
];

export function APSTransactionTable({ data }: { data: APSTransaction[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No. Kwitansi</TableHead>
            <TableHead>Pembeli</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.noKwitansi}</TableCell>
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
