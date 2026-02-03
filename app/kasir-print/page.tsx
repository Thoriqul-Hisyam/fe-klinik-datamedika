"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PrintableDocument } from "@/components/admin/kasir/printable-document";

function PrintContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as "Invoice" | "Summary" | "Medicine";
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("lastPrintData");
      if (storedData) {
        setData(JSON.parse(storedData));
        // Small delay to ensure styles are loaded before printing
        setTimeout(() => {
          window.print();
        }, 800);
      } else {
        setError("Data cetak tidak ditemukan. Silakan coba lagi dari menu Kasir.");
      }
    } catch (e) {
      setError("Gagal membaca data cetak.");
      console.error(e);
    }
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8 text-center">
        <p className="text-destructive font-bold text-xl">Oops! Terjadi kesalahan.</p>
        <p className="text-muted-foreground">{error}</p>
        <button 
          onClick={() => window.close()} 
          className="px-6 py-3 bg-primary text-white rounded-lg shadow-md font-medium hover:bg-primary/90 transition-colors"
        >
          Tutup Halaman
        </button>
      </div>
    );
  }

  if (!data) return (
    <div className="flex items-center justify-center min-h-screen text-muted-foreground italic">
         Menyiapkan dokumen...
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
       <PrintableDocument type={type || "Invoice"} data={data} />
       
       <div className="fixed bottom-6 right-6 print:hidden flex gap-3">
            <button 
                onClick={() => window.print()} 
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
            >
                Cetak Ulang
            </button>
            <button 
                onClick={() => window.close()} 
                className="px-5 py-2.5 bg-gray-700 text-white rounded-xl shadow-xl font-bold hover:bg-gray-800 transition-all"
            >
                Tutup
            </button>
       </div>
    </div>
  );
}

export default function KasirPrintPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center italic">Memuat transkip...</div>}>
      <PrintContent />
    </Suspense>
  );
}
