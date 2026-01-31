export const dummyReportData: Record<string, any[]> = {
  "stok-bhp": [
    { item: "Kapas Gulung", unit: "Roll", stock: 50, expiry: "2027-12-01" },
    { item: "Alcohol Swab", unit: "Box", stock: 120, expiry: "2026-06-15" },
  ],
  "slow-moving": [
    { item: "Obat Langka A", days: 180, lastSale: "2025-08-10" },
    { item: "Suplemen Khusus", days: 120, lastSale: "2025-11-20" },
  ],
  "persediaan": [
    { item: "Paracetamol 500mg", batch: "B123", stock: 1000, value: 500000 },
    { item: "Amoxicillin", batch: "A456", stock: 500, value: 750000 },
  ],
  "rekap-penjualan": [
    { tanggal: "2026-01-31", transaksi: 45, total: 3500000 },
    { tanggal: "2026-01-30", transaksi: 38, total: 2800000 },
  ],
  "rekap-paket": [
    { paket: "Paket Flu", terjual: 15, revenue: 375000 },
    { paket: "Paket Vitamin", terjual: 25, revenue: 1250000 },
  ],
  "waktu-tunggu": [
    { orderId: "ORD-001", pasien: "Budi Santoso", durasi: "12 menit" },
    { orderId: "ORD-002", pasien: "Siti Aminah", durasi: "18 menit" },
  ],
  "penjualan-per-obat": [
    { item: "Paracetamol", qty: 200, revenue: 100000 },
    { item: "Obat Batuk Syrup", qty: 45, revenue: 675000 },
  ],
  "distribusi": [
    { ref: "DIST-001", asal: "Gudang Utama", tujuan: "Farmasi RJ", qty: 100 },
    { ref: "DIST-002", asal: "Gudang Utama", tujuan: "Farmasi RI", qty: 50 },
  ],
  "pembelian": [
    { po: "PO-001", supplier: "Kimia Farma", total: 15000000 },
    { po: "PO-002", supplier: "Enseval", total: 8500000 },
  ],
  "fast-moving": [
    { item: "Paracetamol 500mg", qty: 1500, rank: 1 },
    { item: "Vitamin C 1000mg", qty: 1200, rank: 2 },
  ],
  "rekap-pembelian": [
    { tanggal: "2026-01-31", po: 3, total: 25000000 },
    { tanggal: "2026-01-30", po: 2, total: 12000000 },
  ],
  "stok-opname": [
    { so: "SO-F-001", tanggal: "2026-01-25", status: "Approved" },
    { so: "SO-F-002", tanggal: "2026-01-10", status: "Approved" },
  ],
  "kartu-stok": [
    { tanggal: "2026-01-31", ref: "SALES-001", in: 0, out: 10, balance: 490 },
    { tanggal: "2026-01-30", ref: "RECEIVE-005", in: 100, out: 0, balance: 500 },
  ],
  "history-pasien": [
    { pasien: "Ani Wijaya", tanggal: "2026-01-31", obat: "Amoxicillin", aturan: "3x1" },
    { pasien: "Ani Wijaya", tanggal: "2026-01-15", obat: "Paracetamol", aturan: "K/P" },
  ],
};
