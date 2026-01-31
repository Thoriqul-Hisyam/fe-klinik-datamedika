export interface Retur {
  id: string;
  noRetur: string;
  tanggal: string;
  supplier: string;
  item: string;
  jumlah: number;
  alasan: string;
}

export const dummyRetur: Retur[] = [
  {
    id: "1",
    noRetur: "RTN-001",
    tanggal: "2026-01-31",
    supplier: "PT. Kimia Farma Trading",
    item: "Paracetamol 500mg",
    jumlah: 20,
    alasan: "Barang Rusak"
  }
];
