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

export interface ReturGudang {
  id: string;
  noRetur: string;
  unitAsal: string;
  tanggal: string;
  totalItem: number;
  status: "Diproses" | "Diterima" | "Ditolak";
}

export const dummyReturGudang: ReturGudang[] = [
  { id: "1", noRetur: "RT-G-001", unitAsal: "Farmasi RJ", tanggal: "2026-01-31", totalItem: 3, status: "Diproses" },
];

export function ReturGudangTable({ data }: { data: ReturGudang[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No. Retur</TableHead>
            <TableHead>Unit Asal</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="text-right">Total Item</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.noRetur}</TableCell>
              <TableCell>{item.unitAsal}</TableCell>
              <TableCell>{item.tanggal}</TableCell>
              <TableCell className="text-right">{item.totalItem}</TableCell>
              <TableCell>
                <Badge variant={item.status === "Diterima" ? "default" : item.status === "Diproses" ? "secondary" : "destructive"}>
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
