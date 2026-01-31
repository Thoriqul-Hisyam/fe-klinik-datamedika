export interface Distribusi {
  id: string;
  noDistribusi: string;
  tanggal: string;
  dari: string;
  ke: string;
  item: string;
  jumlah: number;
  status: "Selesai" | "Proses" | "Dibatalkan";
}

export const dummyDistribusi: Distribusi[] = [
  {
    id: "1",
    noDistribusi: "DIST-001",
    tanggal: "2026-01-29",
    dari: "Gudang Utama",
    ke: "Farmasi Rawat Jalan",
    item: "Paracetamol 500mg",
    jumlah: 100,
    status: "Selesai"
  },
  {
    id: "2",
    noDistribusi: "DIST-002",
    tanggal: "2026-01-30",
    dari: "Gudang Utama",
    ke: "Farmasi Rawat Inap",
    item: "Amoxicillin 500mg",
    jumlah: 50,
    status: "Proses"
  }
];
