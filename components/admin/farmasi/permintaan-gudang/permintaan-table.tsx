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

export interface Requisition {
  id: string;
  noPermintaan: string;
  tanggal: string;
  unitAsal: string;
  totalItem: number;
  status: "Draft" | "Dikirim" | "Selesai";
}

export const dummyRequisitions: Requisition[] = [
  { id: "1", noPermintaan: "REQ-001", tanggal: "2026-01-31", unitAsal: "Farmasi Rawat Jalan", totalItem: 5, status: "Dikirim" },
  { id: "2", noPermintaan: "REQ-002", tanggal: "2026-01-30", unitAsal: "Farmasi Rawat Inap", totalItem: 12, status: "Selesai" },
];

export function RequisitionTable({ data }: { data: Requisition[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No. Permintaan</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Unit Asal</TableHead>
            <TableHead className="text-right">Total Item</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.noPermintaan}</TableCell>
              <TableCell>{item.tanggal}</TableCell>
              <TableCell>{item.unitAsal}</TableCell>
              <TableCell className="text-right">{item.totalItem}</TableCell>
              <TableCell>
                <Badge variant={item.status === "Selesai" ? "default" : item.status === "Dikirim" ? "secondary" : "outline"}>
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
