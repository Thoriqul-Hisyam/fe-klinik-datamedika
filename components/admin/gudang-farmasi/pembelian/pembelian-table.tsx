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
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Pembelian } from "./data";

export function PembelianTable({ data }: { data: Pembelian[] }) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val);
  };

  const statusVariant = (status: string) => {
    switch (status) {
      case "Diterima": return "default";
      case "Pending": return "destructive"; // yellow in some themes, using destructive/outline for now
      case "Draft": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No PO</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.noPO}</TableCell>
              <TableCell>{item.tanggal}</TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
