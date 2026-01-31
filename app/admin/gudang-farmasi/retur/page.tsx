"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { dummyRetur } from "@/components/admin/gudang-farmasi/retur/data";
import { ReturTable } from "@/components/admin/gudang-farmasi/retur/retur-table";

export default function ReturPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Retur Obat</h2>
          <p className="text-muted-foreground">
            Pengelolaan pengembalian obat ke supplier.
          </p>
        </div>
        <Button variant="destructive">
          <Undo2 className="mr-2 h-4 w-4" />
          Retur Baru
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Retur</CardTitle>
        </CardHeader>
        <CardContent>
          <ReturTable data={dummyRetur} />
        </CardContent>
      </Card>
    </div>
  );
}
