export interface Pembelian {
  id: string;
  noPO: string;
  tanggal: string;
  supplier: string;
  total: number;
  status: "Draft" | "Pending" | "Diterima" | "Dibatalkan";
}

export const dummyPembelian: Pembelian[] = [
  {
    id: "1",
    noPO: "PO-2026/01/01",
    tanggal: "2026-01-20",
    supplier: "PT. Kimia Farma Trading",
    total: 15500000,
    status: "Diterima"
  },
  {
    id: "2",
    noPO: "PO-2026/01/02",
    tanggal: "2026-01-25",
    supplier: "PT. Anugrah Argon Medica",
    total: 8200000,
    status: "Pending"
  },
  {
    id: "3",
    noPO: "PO-2026/01/03",
    tanggal: "2026-01-28",
    supplier: "PT. Kimia Farma Trading",
    total: 2100000,
    status: "Draft"
  }
];
