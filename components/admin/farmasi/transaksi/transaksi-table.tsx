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

export interface FarmasiTransaction {
  id: string;
  noInvoice: string;
  namaPasien: string;
  tanggal: string;
  total: number;
  status: "Lunas" | "Pending" | "Dibatalkan";
}

export const dummyFarmasiTransactions: FarmasiTransaction[] = [
  { id: "1", noInvoice: "INV-F-001", namaPasien: "Ahmad Dahlan", tanggal: "2026-01-31", total: 150000, status: "Lunas" },
  { id: "2", noInvoice: "INV-F-002", namaPasien: "Dewi Sartika", tanggal: "2026-01-30", total: 75000, status: "Pending" },
];

export function FarmasiTransactionTable({ data }: { data: FarmasiTransaction[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No. Invoice</TableHead>
            <TableHead>Nama Pasien</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.noInvoice}</TableCell>
              <TableCell>{item.namaPasien}</TableCell>
              <TableCell>{item.tanggal}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.total)}
              </TableCell>
              <TableCell>
                <Badge variant={item.status === "Lunas" ? "default" : item.status === "Pending" ? "secondary" : "destructive"}>
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
