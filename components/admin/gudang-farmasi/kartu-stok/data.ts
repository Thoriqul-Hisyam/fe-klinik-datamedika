export interface StockMovement {
  id: string;
  tanggal: string;
  referensi: string;
  keterangan: string;
  masuk: number;
  keluar: number;
  sisa: number;
}

export const dummyMovements: Record<string, StockMovement[]> = {
  "OBT001": [
    { id: "1", tanggal: "2026-01-01", referensi: "STOK-AWAL", keterangan: "Stok Awal Tahun", masuk: 500, keluar: 0, sisa: 500 },
    { id: "2", tanggal: "2026-01-10", referensi: "DIST-001", keterangan: "Distribusi ke Farmasi", masuk: 0, keluar: 100, sisa: 400 },
    { id: "3", tanggal: "2026-01-20", referensi: "PO-2026/01/01", keterangan: "Penerimaan PO", masuk: 200, keluar: 0, sisa: 600 }
  ],
  "OBT002": [
    { id: "1", tanggal: "2026-01-01", referensi: "STOK-AWAL", keterangan: "Stok Awal Tahun", masuk: 200, keluar: 0, sisa: 200 }
  ]
};
