"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KFASearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    if (!query) {
      setResults([]);
      return;
    }
    // Dummy Search Logic
    const dummyData = [
      "KFA001 - Paracetamol 500mg",
      "KFA002 - Amoxicillin 500mg",
      "KFA003 - Spuit 3cc",
      "KFA004 - Asam Mefenamat",
      "KFA005 - Vitamin C",
    ];
    setResults(dummyData.filter(item => item.toLowerCase().includes(query.toLowerCase())));
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Pencarian Kamus Farmasi Alkes (KFA)</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex w-full items-center space-x-2 mb-4">
                <Input 
                placeholder="Cari Kode atau Nama KFA..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch}>
                    <Search className="h-4 w-4 mr-2" />
                    Cari
                </Button>
            </div>

            {hasSearched && (
                <div className="border rounded-md p-4 bg-muted/20">
                    {results.length > 0 ? (
                        <ul className="space-y-2">
                        {results.map((res, idx) => (
                            <li key={idx} className="p-2 bg-background rounded shadow-sm border">{res}</li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground text-center">Tidak ada hasil ditemukan.</p>
                    )}
                </div>
            )}
        </CardContent>
    </Card>
  );
}
