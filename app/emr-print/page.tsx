"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EMRPrintable } from "@/components/admin/emr/emr-printable";

function EMRPrintContent() {
  const searchParams = useSearchParams();
  const [sessionData, setSessionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("lastEMRPrintData");
      if (storedData) {
        setSessionData(JSON.parse(storedData));
        // Small delay to ensure styles are loaded before printing
        setTimeout(() => {
          window.print();
        }, 1000);
      } else {
        setError("Data cetak tidak ditemukan.");
      }
    } catch (e) {
      setError("Gagal membaca data cetak.");
      console.error(e);
    }
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8 text-center bg-white text-black">
        <p className="text-red-600 font-bold text-xl">Oops! Terjadi kesalahan.</p>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => window.close()} 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md font-medium hover:bg-blue-700 transition-colors"
        >
          Tutup Halaman
        </button>
      </div>
    );
  }

  if (!sessionData) return (
    <div className="flex items-center justify-center min-h-screen text-gray-400 italic bg-white">
         Menyiapkan dokumen EMR...
    </div>
  );

  return (
    <div className="bg-white min-h-screen py-8">
       <EMRPrintable 
         title={sessionData.title} 
         patientData={sessionData.patientData}
       >
          <div dangerouslySetInnerHTML={{ __html: sessionData.htmlContent }} />
       </EMRPrintable>
       
       <div className="fixed bottom-6 right-6 print:hidden flex gap-3">
            <button 
                onClick={() => window.print()} 
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow-xl font-bold hover:bg-blue-700 transition-all"
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

export default function EMRStandalonePrintPage() {
  return (
    <div className="print-mode">
      <Suspense fallback={<div className="p-8 text-center bg-white italic">Memuat transkip EMR...</div>}>
        <EMRPrintContent />
      </Suspense>
    </div>
  );
}
