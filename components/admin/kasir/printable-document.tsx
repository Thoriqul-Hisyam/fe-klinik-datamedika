"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PrintableDocumentProps {
  type: "Invoice" | "Summary" | "Medicine";
  data: {
    noInvoice?: string;
    noReg: string;
    noRM: string;
    namaPasien: string;
    penjamin: string;
    dokter: string;
    poli: string;
    date: string;
    items: any[];
    subTotal: number;
    discount: number;
    total: number;
  };
}

export function PrintableDocument({ type, data }: PrintableDocumentProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div id="printable-area-wrapper">
      <div className="p-8 bg-white text-black font-serif print:p-0 print:m-0 w-full max-w-[800px] mx-auto border print:border-none rounded-lg shadow-sm print:shadow-none" id="printable-area">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">DM</div>
            <div>
                <h1 className="text-xl font-bold uppercase tracking-tight">Klinik Data Medika</h1>
                <p className="text-[10px] text-gray-600">Jl. Raya Kesehatan No. 123, Jakarta Selatan</p>
                <p className="text-[10px] text-gray-600">Telp: (021) 12345678 | Email: info@datamedika.com</p>
            </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-black uppercase text-gray-800">{type === "Medicine" ? "Nota Obat" : type}</h2>
          <p className="text-xs font-bold">{data.noInvoice || data.noReg}</p>
        </div>
      </div>

      {/* Patient Info Section */}
      <div className="grid grid-cols-2 gap-8 mb-8 text-xs">
        <div className="space-y-1">
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">Nama Pasien</span>
            <span className="font-bold">{data.namaPasien}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">No. Rekam Medis</span>
            <span className="font-medium">{data.noRM}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">No. Registrasi</span>
            <span>{data.noReg}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">Tanggal</span>
            <span>{data.date}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">Unit / Poli</span>
            <span>{data.poli}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-500">Dokter</span>
            <span>{data.dokter}</span>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="mb-8">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-2 font-bold uppercase">Item / Deskripsi</th>
              <th className="text-center py-2 font-bold uppercase w-16">Qty</th>
              <th className="text-right py-2 font-bold uppercase">Harga</th>
              <th className="text-right py-2 font-bold uppercase">Diskon</th>
              <th className="text-right py-2 font-bold uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-2">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-[10px] text-gray-500 italic uppercase">{item.category}</div>
                </td>
                <td className="py-2 text-center">{item.qty}</td>
                <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                <td className="py-2 text-right">{item.discount > 0 ? `(${formatCurrency(item.discount)})` : "-"}</td>
                <td className="py-2 text-right font-bold">{formatCurrency((item.price * item.qty) - item.discount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Totaling Section */}
      <div className="flex justify-end gap-12 pt-4 border-t-2 border-black">
        <div className="w-64 space-y-2">
            <div className="flex justify-between text-xs">
            <span className="text-gray-600 uppercase font-bold">Subtotal</span>
            <span className="font-bold">{formatCurrency(data.subTotal)}</span>
            </div>
            <div className="flex justify-between text-xs">
            <span className="text-gray-600 uppercase font-bold">Diskon Total</span>
            <span className="font-bold text-red-600">-{formatCurrency(data.discount)}</span>
            </div>
            <div className="flex justify-between text-base font-black border-t border-black pt-2 bg-gray-50 p-2">
            <span className="uppercase">Grand Total</span>
            <span className="text-primary">{formatCurrency(data.total)}</span>
            </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-32 mt-16 text-xs text-center">
        <div>
          <p className="mb-20 text-gray-500 italic">Pasien / Keluarga</p>
          <div className="border-b border-black w-48 mx-auto"></div>
          <p className="mt-2 font-bold">{data.namaPasien}</p>
        </div>
        <div>
          <p className="mb-20 text-gray-500 italic uppercase">Kasir / Administrasi</p>
          <div className="border-b border-black w-48 mx-auto"></div>
          <p className="mt-2 font-bold">Administrasi Klinik</p>
        </div>
      </div>

      {/* Small print */}
      <div className="mt-16 pt-8 border-t border-dotted border-gray-300 text-[10px] text-center text-gray-400">
        <p>Dokumen ini adalah bukti transaksi sah dari Klinik Data Medika.</p>
        <p>Dicetak otomatis oleh Sistem Informasi Klinik pada {new Date().toLocaleString('id-ID')}</p>
      </div>

      <style jsx global>{`
        @media print {
          /* General resets */
          body {
            background: white !important;
            color: black !important;
          }

          /* Show only the wrapper */
          #printable-area-wrapper {
            display: block !important;
            visibility: visible !important;
          }

          /* Hidden elements */
          .print-hidden, .no-print {
            display: none !important;
          }

          /* Ensure content visibility */
          #printable-area, #printable-area * {
            visibility: visible !important;
          }

          @page {
            size: A4;
            margin: 15mm;
          }
        }
      `}</style>
      </div>
    </div>
  );
}
