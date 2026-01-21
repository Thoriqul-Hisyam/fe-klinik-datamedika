"use client";

import React, { useState } from "react";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Camera, 
  Maximize2,
  Trash2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DocumentationImage {
  id: string;
  url: string;
  timestamp: string;
  type: "before" | "after";
}

export function ClinicalDocumentation() {
  const [beforeImage, setBeforeImage] = useState<DocumentationImage | null>(null);
  const [afterImage, setAfterImage] = useState<DocumentationImage | null>(null);
  const [uploadingType, setUploadingType] = useState<"before" | "after" | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Mock photo history
  const photoHistory = [
    { tanggal: "2026-01-15", noReg: "NoReg202601150830", before: "/placeholder-b.jpg", after: "/placeholder-a.jpg" },
    { tanggal: "2025-12-10", noReg: "NoReg202512100915", before: "/placeholder-b.jpg", after: "/placeholder-a.jpg" },
  ];

  const triggerUpload = (type: "before" | "after") => {
    setUploadingType(type);
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadingType) {
      const url = URL.createObjectURL(file);
      const mockImage: DocumentationImage = {
        id: Math.random().toString(36).substr(2, 9),
        url: url,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        type: uploadingType
      };

      if (uploadingType === "before") setBeforeImage(mockImage);
      else setAfterImage(mockImage);
      
      // Reset input
      e.target.value = "";
      setUploadingType(null);
    }
  };

  const removeImage = (type: "before" | "after") => {
    if (type === "before") {
        if (beforeImage) URL.revokeObjectURL(beforeImage.url);
        setBeforeImage(null);
    } else {
        if (afterImage) URL.revokeObjectURL(afterImage.url);
        setAfterImage(null);
    }
  };

  return (
    <div className="space-y-8 pb-10 overflow-y-auto max-h-full pr-2">
      {/* Hidden File Input */}
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Dokumentasi Foto Klinis</h3>
          <p className="text-sm text-muted-foreground">Upload foto sebelum dan sesudah tindakan untuk kunjungan ini</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Before Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 uppercase px-3 py-1 text-[10px] font-bold tracking-wider">
              Before (Awal)
            </Badge>
            {beforeImage && (
              <span className="flex items-center text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {beforeImage.timestamp}
              </span>
            )}
          </div>
          
          <PhotoContainer 
            image={beforeImage} 
            onUpload={() => triggerUpload("before")} 
            onRemove={() => removeImage("before")}
            label="Upload Foto Awal"
          />
        </div>

        {/* After Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 uppercase px-3 py-1 text-[10px] font-bold tracking-wider">
              After (Akhir)
            </Badge>
            {afterImage && (
              <span className="flex items-center text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {afterImage.timestamp}
              </span>
            )}
          </div>
          
          <PhotoContainer 
            image={afterImage} 
            onUpload={() => triggerUpload("after")} 
            onRemove={() => removeImage("after")}
            label="Upload Foto Akhir"
          />
        </div>
      </div>

      {/* History Section */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center gap-2">
           <Clock className="h-4 w-4 text-muted-foreground" />
           <h4 className="font-semibold text-sm">Riwayat Foto Per Kunjungan</h4>
        </div>
        
        <div className="grid gap-3">
           {photoHistory.map((item, idx) => (
             <Card key={idx} className="overflow-hidden border-muted/60">
               <div className="bg-muted/30 px-3 py-2 flex items-center justify-between border-b">
                 <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold">{item.tanggal}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{item.noReg}</span>
                 </div>
                 <Button variant="ghost" size="sm" className="h-7 text-[10px]">Detail</Button>
               </div>
               <div className="p-3 grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                     <p className="text-[9px] uppercase font-bold text-muted-foreground px-1">Before</p>
                     <div className="aspect-video bg-neutral-100 rounded border flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-neutral-300" />
                     </div>
                  </div>
                  <div className="space-y-1.5">
                     <p className="text-[9px] uppercase font-bold text-muted-foreground px-1 text-right">After</p>
                     <div className="aspect-video bg-neutral-100 rounded border flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-neutral-300" />
                     </div>
                  </div>
               </div>
             </Card>
           ))}
        </div>
      </div>
    </div>
  );
}


function PhotoContainer({ 
  image, 
  onUpload, 
  onRemove,
  label 
}: { 
  image: DocumentationImage | null; 
  onUpload: () => void; 
  onRemove: () => void;
  label: string;
}) {
  return (
    <div 
      className={cn(
        "group relative aspect-[4/3] rounded-xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center bg-muted/30",
        image ? "border-transparent" : "hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
      )}
      onClick={!image ? onUpload : undefined}
    >
      {image ? (
        <>
          <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
            <img 
              src={image.url} 
              alt={image.type} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                   <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                     <Maximize2 className="h-4 w-4" />
                   </Button>
                   <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full" onClick={(e) => { e.stopPropagation(); onRemove(); }}>
                     <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4">
             <div className="bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md border border-white/20">
               PDR-DOC-{image.id.toUpperCase()}
             </div>
          </div>
        </>
      ) : (
        <div className="text-center space-y-3 p-6">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
             <Upload className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-xs text-muted-foreground mt-1">Klik atau drag gambar ke sini (JPG, PNG)</p>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
