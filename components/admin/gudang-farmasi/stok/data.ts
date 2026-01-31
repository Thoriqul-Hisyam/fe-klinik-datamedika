export interface Stock {
  id: string;
  kodeObat: string;
  namaObat: string;
  batchNo: string;
  expiredDate: string;
  stokGudang: number;
  stokFarmasi: number;
  satuan: string;
}

export const dummyStocks: Stock[] = [
  {
    id: "1",
    kodeObat: "OBT001",
    namaObat: "Paracetamol 500mg",
    batchNo: "BCH001",
    expiredDate: "2026-12-31",
    stokGudang: 500,
    stokFarmasi: 120,
    satuan: "Tablet"
  },
  {
    id: "2",
    kodeObat: "OBT002",
    namaObat: "Amoxicillin 500mg",
    batchNo: "BCH002",
    expiredDate: "2025-06-15",
    stokGudang: 200,
    stokFarmasi: 45,
    satuan: "Kapsul"
  },
  {
    id: "3",
    kodeObat: "ALK001",
    namaObat: "Spuit 3cc",
    batchNo: "BCH003",
    expiredDate: "2027-01-01",
    stokGudang: 1000,
    stokFarmasi: 300,
    satuan: "Pcs"
  }
];
