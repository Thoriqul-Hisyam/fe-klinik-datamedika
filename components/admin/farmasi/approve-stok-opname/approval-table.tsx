"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { StokOpname } from "../stok-opname/opname-table";

export function ApprovalTable({ data, onApprove, onReject }: { 
  data: StokOpname[], 
  onApprove: (id: string) => void,
  onReject: (id: string) => void
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No. Opname</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Petugas</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                Tidak ada antrian persetujuan.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.noOpname}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.tanggal}</TableCell>
                <TableCell>{item.petugas}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon" onClick={() => onApprove(item.id)}>
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => onReject(item.id)}>
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
