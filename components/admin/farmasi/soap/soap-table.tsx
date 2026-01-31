"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface FarmasiSOAP {
  id: string;
  pasien: string;
  tanggal: string;
  petugas: string;
  keterangan: string;
}

export const dummyFarmasiSOAP: FarmasiSOAP[] = [
  { id: "1", pasien: "Budi Santoso", tanggal: "2026-01-31", petugas: "Apt. Linda", keterangan: "Edukasi cara pakai antibiotik" },
  { id: "2", pasien: "Siti Aminah", tanggal: "2026-01-30", petugas: "Apt. Joni", keterangan: "Verifikasi resep polifarmasi" },
];

export function FarmasiSOAPTable({ data }: { data: FarmasiSOAP[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pasien</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Petugas</TableHead>
            <TableHead>Keterangan Edukasi/Verifikasi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.pasien}</TableCell>
              <TableCell>{item.tanggal}</TableCell>
              <TableCell>{item.petugas}</TableCell>
              <TableCell>{item.keterangan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
