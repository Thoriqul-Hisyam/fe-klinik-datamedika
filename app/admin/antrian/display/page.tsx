"use client";

import { useState, useEffect } from "react";
import { 
  Volume2, 
  Building2, 
  Clock, 
  Calendar, 
  ChevronRight,
  Monitor,
  Bell,
  Activity
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data for the display
const servingData = [
  { poli: "Poli Umum", dokter: "dr. Sarah Amalia", nomor: "A-001", status: "calling" },
  { poli: "Poli Gigi", dokter: "dr. Budi Santoso", nomor: "B-005", status: "serving" },
  { poli: "Poli Anak", dokter: "dr. Rina Wijaya", nomor: "C-012", status: "serving" },
  { poli: "Poli Kandungan", dokter: "dr. Linda Yani", nomor: "D-003", status: "serving" },
  { poli: "Poli Dalam", dokter: "dr. Ahmad S.", nomor: "E-008", status: "serving" },
  { poli: "Lab", dokter: "Team Analis", nomor: "L-002", status: "serving" },
];

export default function QueueDisplayPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic text-primary">DataMedika</h1>
            <p className="text-sm font-medium text-slate-400 tracking-widest uppercase">Smart Clinic Solutions</p>
          </div>
        </div>

        <div className="flex items-center gap-8 text-right">
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase">
                <Calendar className="h-4 w-4" />
                {formatDate(currentTime)}
             </div>
             <div className="flex items-center gap-2 text-6xl font-black tabular-nums tracking-tighter text-white">
                <Clock className="h-8 w-8 text-primary" />
                {formatTime(currentTime)}
             </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        
        {/* Left Column: Now Calling (The Star of the Show) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="flex-1 bg-gradient-to-br from-primary via-primary/90 to-blue-700 border-none shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Volume2 className="h-64 w-64 -rotate-12" />
            </div>
            
            <CardContent className="h-full flex flex-col items-center justify-center text-center p-12 relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-6 py-2 rounded-full border border-white/30 mb-8 animate-pulse">
                    <Bell className="h-5 w-5 text-white" />
                    <span className="text-sm font-black uppercase tracking-widest text-white">Sedang Memanggil</span>
                </div>
                
                <h2 className="text-[14rem] font-black leading-none tracking-tighter text-white drop-shadow-2xl">
                    A-001
                </h2>
                
                <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mt-8 shadow-inner">
                    <p className="text-2xl font-bold uppercase tracking-widest text-white/70 mb-2">Menuju Ke:</p>
                    <h3 className="text-5xl font-black text-white uppercase italic">Poli Umum</h3>
                    <p className="text-xl font-medium text-white/60 mt-2">dr. Sarah Amalia</p>
                </div>
            </CardContent>
          </Card>

          {/* Video Placeholder or Info Slide */}
          <div className="h-48 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex items-center justify-center p-8 gap-6 overflow-hidden relative">
             <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/30" />
             <div className="p-4 bg-primary/20 rounded-2xl border border-primary/30">
                <Monitor className="h-10 w-10 text-primary" />
             </div>
             <div className="flex-1">
                <h4 className="text-xl font-bold text-white uppercase tracking-tight">Kesehatan Anda Prioritas Kami</h4>
                <p className="text-sm text-slate-400">Harap persiapkan kartu identitas atau kartu BPJS Anda.</p>
             </div>
          </div>
        </div>

        {/* Right Column: Status Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          {servingData.map((item, index) => (
            <Card key={index} className={cn(
              "border-none shadow-xl transition-all duration-500",
              item.status === "calling" 
                ? "bg-primary/20 border border-primary/40 scale-[0.98] ring-2 ring-primary ring-offset-4 ring-offset-[#0f172a]"
                : "bg-white/5 border border-white/10"
            )}>
              <CardContent className="p-6 flex flex-col justify-between h-full relative overflow-hidden">
                {item.status === "calling" && (
                    <div className="absolute top-0 right-0 p-2">
                         <div className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </div>
                    </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{item.poli}</p>
                    <h3 className="text-lg font-bold text-white truncate max-w-[180px]">{item.dokter}</h3>
                  </div>
                  <div className={cn(
                    "px-4 py-1 rounded-xl font-black text-2xl tracking-tighter",
                    item.status === "calling" ? "bg-primary text-white" : "bg-white/10 text-slate-300"
                  )}>
                    {item.nomor}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-auto">
                    <Badge variant="outline" className={cn(
                        "text-[10px] font-bold uppercase px-2 py-0 border-none rounded-full",
                        item.status === "calling" ? "bg-primary/20 text-primary" : "bg-green-500/20 text-green-500"
                    )}>
                        <Activity className="h-3 w-3 mr-1" />
                        {item.status === "calling" ? "Memanggil" : "Melayani"}
                    </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Legend / Info Cards at the bottom grid */}
          <div className="col-span-2 grid grid-cols-3 gap-4">
             {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 rounded-2xl border border-white/10 p-4 flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Total Hari Ini</p>
                    <p className="text-2xl font-black text-white tracking-tighter">12{i}</p>
                </div>
             ))}
          </div>
        </div>
      </main>

      {/* Footer: News Ticker */}
      <footer className="h-16 bg-white rounded-2xl flex items-center overflow-hidden border border-white/20 shadow-xl">
        <div className="bg-primary h-full px-8 flex items-center justify-center text-white font-black uppercase italic tracking-widest text-sm shrink-0 shadow-xl z-10 relative">
            <span className="animate-pulse">Pengumuman</span>
        </div>
        <div className="flex-1 overflow-hidden whitespace-nowrap flex items-center relative">
            <div className="animate-marquee flex gap-12 text-slate-800 font-bold uppercase tracking-tight">
                <span>Selamat datang di Klinik DataMedika. Pelayanan anda adalah kebahagiaan kami.</span>
                <span>Jam Operasional: Senin - Sabtu 08.00 - 21.00 WIB.</span>
                <span>Pendaftaran Online dapat dilakukan melalui Aplikasi DataMedika atau WhatsApp.</span>
                <span>Gunakan Masker di area Klinik demi kesehatan bersama.</span>
            </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
