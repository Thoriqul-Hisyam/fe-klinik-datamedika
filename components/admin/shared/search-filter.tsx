"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchFilterProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export function SearchFilter({ placeholder = "Cari...", value, onChange, className }: SearchFilterProps) {
  return (
    <div className={`flex items-center space-x-2 max-w-sm ${className}`}>
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder={placeholder} 
          className="pl-8"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
