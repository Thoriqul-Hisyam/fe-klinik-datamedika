"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface CostUsage {
  id: string;
  item: string;
  jumlah: number;
  biayaSatuan: number;
  totalBiaya: number;
  tanggal: string;
}

export const dummyCostUsage: CostUsage[] = [
  { id: "1", item: "Kapas Gulung", jumlah: 1, biayaSatuan: 5000, totalBiaya: 5000, tanggal: "2026-01-31" },
  { id: "2", item: "Alcohol Swab", jumlah: 10, biayaSatuan: 500, totalBiaya: 5000, tanggal: "2026-01-30" },
];

export function CostUsageTable({ data }: { data: CostUsage[] }) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead className="text-right">Biaya Satuan</TableHead>
            <TableHead className="text-right">Total Biaya</TableHead>
            <TableHead>Tanggal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.item}</TableCell>
              <TableCell className="text-right">{item.jumlah}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.biayaSatuan)}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.totalBiaya)}</TableCell>
              <TableCell>{item.tanggal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
