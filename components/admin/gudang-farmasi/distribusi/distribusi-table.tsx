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
import { Distribusi } from "./data";

export function DistribusiTable({ data }: { data: Distribusi[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No Distribusi</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Dari</TableHead>
            <TableHead>Ke</TableHead>
            <TableHead>Item</TableHead>
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.noDistribusi}</TableCell>
              <TableCell>{item.tanggal}</TableCell>
              <TableCell>{item.dari}</TableCell>
              <TableCell>{item.ke}</TableCell>
              <TableCell>{item.item}</TableCell>
              <TableCell className="text-right">{item.jumlah}</TableCell>
              <TableCell>
                <Badge variant={item.status === "Selesai" ? "default" : "secondary"}>
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
