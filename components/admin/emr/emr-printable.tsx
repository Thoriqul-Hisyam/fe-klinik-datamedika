"use client";

import React from "react";

interface EMRPrintableProps {
  title: string;
  patientData: {
    noRM: string;
    nama: string;
    tanggalLahir: string;
    jenisKelamin: string;
    noReg: string;
  };
  children: React.ReactNode;
}

export function EMRPrintable({ title, patientData, children }: EMRPrintableProps) {
  return (
    <div className="p-10 bg-white text-black font-serif print:p-0 print:m-0 w-full max-w-[900px] mx-auto print:border-none">
      {/* Header Fasyankes */}
      <div className="flex items-center justify-between border-b-4 border-double border-black pb-4 mb-6">
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 border-2 border-black flex items-center justify-center font-bold text-2xl">
              <span className="text-black">DM</span>
            </div>
            <div className="leading-tight">
                <h1 className="text-2xl font-black uppercase tracking-tight">Klinik Data Medika</h1>
                <p className="text-xs font-bold">Layanan Kesehatan Utama & Terintegrasi</p>
                <p className="text-[10px] mt-1">Jl. Raya Kesehatan No. 123, Jakarta Selatan, 12345</p>
                <p className="text-[10px]">Telp: (021) 12345678 | Email: admin@datamedika.com</p>
            </div>
        </div>
        <div className="w-[320px] border-2 border-black p-2 text-[11px] leading-relaxed">
            <div className="grid grid-cols-[80px_1fr] gap-x-1 border-b border-black pb-1 mb-1">
                <span className="font-bold">NAMA</span>
                <span className="font-bold">: {patientData.nama}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-x-1">
                <span>NO. RM</span>
                <span className="font-bold">: {patientData.noRM}</span>
                <span>TGL LAHIR</span>
                <span>: {patientData.tanggalLahir}</span>
                <span>JK</span>
                <span>: {patientData.jenisKelamin}</span>
                <span>NO. REG</span>
                <span className="font-mono">: {patientData.noReg}</span>
            </div>
        </div>
      </div>

      <div className="mb-6 text-center">
         <h2 className="text-xl font-bold uppercase underline decoration-2 underline-offset-4">{title}</h2>
         <p className="text-[10px] uppercase font-bold text-gray-500 mt-2 tracking-widest print:text-black">Rekam Medis Elektronik Terverifikasi</p>
      </div>

      {/* Main Content Area - Content should be minimal and high contrast */}
      <div className="min-h-[500px] border-black py-4">
        {children}
      </div>

      {/* Footer Signatures */}
      <div className="mt-12 flex justify-end gap-20">
        <div className="text-center w-64">
           <p className="text-xs mb-1">Dicetak pada: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
           <p className="text-xs font-bold uppercase mt-4 underline underline-offset-8">DOKTER PEMERIKSA / PETUGAS</p>
           <div className="h-24"></div>
           <p className="text-xs font-bold">( ............................................................ )</p>
           <p className="text-[9px] mt-1 italic italic text-gray-400 print:text-black">Tanda tangan dan nama terang</p>
        </div>
      </div>

      {/* Formal vertical border on the left side (optional, but professional) */}
      <div className="fixed left-4 top-0 bottom-0 border-l border-gray-100 print:hidden"></div>

      <style jsx global>{`
        @media print {
          body { padding: 0 !important; margin: 0 !important; background: white !important; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          footer, header, nav, .sidebar, .header { display: none !important; }
          @page { size: A4; margin: 15mm 10mm 15mm 10mm; }
          * { border-color: black !important; color: black !important; }
          .bg-primary, .bg-blue-600, .bg-pink-100 { background: none !important; border: 1px solid black !important; }
          .text-primary, .text-blue-600, .text-pink-600 { color: black !important; }
        }
        /* Higher contrast for print readability */
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid black; padding: 6px 10px; text-align: left; }
        th { background-color: #f2f2f2 !important; -webkit-print-color-adjust: exact; }
      `}</style>
    </div>
  );
}
