"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ReportTable({ data, slug }: { data: any[], slug: string }) {
  if (!data || data.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">Tidak ada data untuk laporan ini.</div>;
  }

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val);
  };

  // Define headers and cells based on slug
  const getRenderConfig = () => {
    switch (slug) {
      case "stok-bhp":
        return {
          headers: ["Item", "Unit", "Stok", "Expired"],
          renderRow: (item: any) => (
            <>
              <TableCell className="font-medium">{item.item}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.expiry}</TableCell>
            </>
          )
        };
      case "slow-moving":
        return {
          headers: ["Item", "Inventory Days", "Penjualan Terakhir"],
          renderRow: (item: any) => (
            <>
              <TableCell className="font-medium">{item.item}</TableCell>
              <TableCell>{item.days} hari</TableCell>
              <TableCell>{item.lastSale}</TableCell>
            </>
          )
        };
      case "persediaan":
        return {
          headers: ["Item", "Batch", "Stok", "Nilai Persediaan"],
          renderRow: (item: any) => (
            <>
              <TableCell className="font-medium">{item.item}</TableCell>
              <TableCell>{item.batch}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell className="text-right">{formatIDR(item.value)}</TableCell>
            </>
          )
        };
      case "rekap-penjualan":
        return {
          headers: ["Tanggal", "Jumlah Transaksi", "Total Pendapatan"],
          renderRow: (item: any) => (
            <>
              <TableCell>{item.tanggal}</TableCell>
              <TableCell className="text-center">{item.transaksi}</TableCell>
              <TableCell className="text-right font-medium">{formatIDR(item.total)}</TableCell>
            </>
          )
        };
      case "rekap-paket":
        return {
          headers: ["Nama Paket", "Jumlah Terjual", "Total Revenue"],
          renderRow: (item: any) => (
            <>
              <TableCell className="font-medium">{item.paket}</TableCell>
              <TableCell className="text-center">{item.terjual}</TableCell>
              <TableCell className="text-right">{formatIDR(item.revenue)}</TableCell>
            </>
          )
        };
      case "waktu-tunggu":
        return {
          headers: ["Order ID", "Pasien", "Durasi Tunggu"],
          renderRow: (item: any) => (
            <>
              <TableCell className="font-mono text-xs">{item.orderId}</TableCell>
              <TableCell>{item.pasien}</TableCell>
              <TableCell>{item.durasi}</TableCell>
            </>
          )
        };
      case "pembelian":
        return {
          headers: ["No. PO", "Supplier", "Total Pembelian"],
          renderRow: (item: any) => (
            <>
              <TableCell className="font-medium">{item.po}</TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell className="text-right">{formatIDR(item.total)}</TableCell>
            </>
          )
        };
      case "history-pasien":
        return {
          headers: ["Pasien", "Tanggal", "Obat", "Dosis/Aturan"],
          renderRow: (item: any) => (
            <>
              <TableCell className="font-medium">{item.pasien}</TableCell>
              <TableCell>{item.tanggal}</TableCell>
              <TableCell>{item.obat}</TableCell>
              <TableCell>{item.aturan}</TableCell>
            </>
          )
        };
      default:
        // Generic fallback for simple items
        const keys = Object.keys(data[0]);
        return {
          headers: keys.map(k => k.charAt(0).toUpperCase() + k.slice(1)),
          renderRow: (item: any) => (
            <>
              {keys.map(k => (
                <TableCell key={k}>{typeof item[k] === "number" && item[k] > 1000 ? formatIDR(item[k]) : item[k]}</TableCell>
              ))}
            </>
          )
        };
    }
  };

  const config = getRenderConfig();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {config.headers.map((h, i) => (
              <TableHead key={i} className={h.toLowerCase().includes("total") || h.toLowerCase().includes("nilai") || h.toLowerCase().includes("revenue") ? "text-right" : ""}>
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              {config.renderRow(item)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
