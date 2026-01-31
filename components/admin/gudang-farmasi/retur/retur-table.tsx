"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Retur } from "./data";

export function ReturTable({ data }: { data: Retur[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No Retur</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Item</TableHead>
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead>Alasan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                Tidak ada data retur.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.noRetur}</TableCell>
                <TableCell>{item.tanggal}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.item}</TableCell>
                <TableCell className="text-right">{item.jumlah}</TableCell>
                <TableCell>{item.alasan}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
