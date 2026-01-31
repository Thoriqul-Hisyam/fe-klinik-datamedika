export interface Supplier {
  id: string;
  namaSupplier: string;
  alamat: string;
  telp: string;
}

export const dummySuppliers: Supplier[] = [
  {
    id: "1",
    namaSupplier: "PT. Kimia Farma Trading",
    alamat: "Jl. Budi Utomo No. 1, Jakarta",
    telp: "021-3456789"
  },
  {
    id: "2",
    namaSupplier: "PT. Anugrah Argon Medica",
    alamat: "Jl. Industri Raya, Cikarang",
    telp: "021-8901234"
  }
];
