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

export interface StokOpname {
  id: string;
  noOpname: string;
  unit: string;
  tanggal: string;
  petugas: string;
  status: "Draft" | "Pending Approval" | "Approved";
}

export const dummyStokOpname: StokOpname[] = [
  { id: "1", noOpname: "SO-F-001", unit: "Farmasi RJ", tanggal: "2026-01-31", petugas: "Admin Farmasi", status: "Pending Approval" },
];

export function StokOpnameTable({ data }: { data: StokOpname[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No. Opname</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Petugas</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.noOpname}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.tanggal}</TableCell>
              <TableCell>{item.petugas}</TableCell>
              <TableCell>
                <Badge variant={item.status === "Approved" ? "default" : "secondary"}>
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
