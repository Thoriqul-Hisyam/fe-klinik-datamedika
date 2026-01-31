export type TipeHarga = 'Default' | 'Fix' | 'Persentase';
export type TipeBarang = 'Obat' | 'Alkes' | 'BMHP' | 'Selain Obat';
export type StatusObat = 'Show' | 'Hide';
export type BooleanString = 'Ya' | 'Tidak';

export interface Obat {
  id: string;
  kodeObat: string;
  namaObat: string;
  kfa: string; // Kode Farmasi Alkes? assuming string code
  namaAlias?: string;
  hargaBeli: number;
  tipeHarga: TipeHarga;
  hargaJualFix?: number;
  marginPersentase?: number;
  tipeBarang: TipeBarang;
  jenisObat: string;
  satuanJual: string;
  zatAktif?: string;
  isiDosis?: string;
  ukuranDosis?: string;
  formulariumNasional: BooleanString;
  formulariumRS: BooleanString;
  manufaktur?: string;
  status: StatusObat;
}

export const dummyObat: Obat[] = [
  {
    id: "1",
    kodeObat: "OBT001",
    namaObat: "Paracetamol 500mg",
    kfa: "KFA001",
    namaAlias: "Panadol",
    hargaBeli: 5000,
    tipeHarga: "Default",
    tipeBarang: "Obat",
    jenisObat: "Tablet",
    satuanJual: "Strip",
    zatAktif: "Paracetamol",
    isiDosis: "10",
    ukuranDosis: "500mg",
    formulariumNasional: "Ya",
    formulariumRS: "Ya",
    manufaktur: "Kimia Farma",
    status: "Show"
  },
  {
    id: "2",
    kodeObat: "OBT002",
    namaObat: "Amoxicillin 500mg",
    kfa: "KFA002",
    hargaBeli: 12000,
    tipeHarga: "Persentase",
    marginPersentase: 10,
    tipeBarang: "Obat",
    jenisObat: "Kapsul",
    satuanJual: "Strip",
    zatAktif: "Amoxicillin",
    isiDosis: "10",
    ukuranDosis: "500mg",
    formulariumNasional: "Ya",
    formulariumRS: "Ya",
    manufaktur: "Phapros",
    status: "Show"
  },
  {
    id: "3",
    kodeObat: "ALK001",
    namaObat: "Spuit 3cc",
    kfa: "KFA003",
    hargaBeli: 1500,
    tipeHarga: "Fix",
    hargaJualFix: 2500,
    tipeBarang: "Alkes",
    jenisObat: "Alat Suntik",
    satuanJual: "Pcs",
    formulariumNasional: "Tidak",
    formulariumRS: "Ya",
    status: "Show"
  }
];
