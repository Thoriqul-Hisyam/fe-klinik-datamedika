"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Download, 
  Filter, 
  Receipt, 
  TrendingDown, 
  ShoppingCart,
  Truck,
  Lightbulb,
  Briefcase
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/admin/shared/page-header";
import { SearchFilter } from "@/components/admin/shared/search-filter";
import { FinanceStatCard, FinanceStatsGrid } from "@/components/admin/finance/finance-stats";
import { cn } from "@/lib/utils";

// Dummy data for expenses
const expenseData = [
  { id: "EXP-001", reason: "Pembelian Obat (PO-001)", category: "Logistik", date: "2026-01-31 08:30", amount: 15000000, status: "Lunas" },
  { id: "EXP-002", reason: "Listrik & Air (Januari)", category: "Utilitas", date: "2026-01-31 10:00", amount: 2500000, status: "Lunas" },
  { id: "EXP-003", reason: "Gaji Perawat (Cicilan)", category: "Gaji", date: "2026-01-30 16:00", amount: 5000000, status: "Proses" },
  { id: "EXP-004", reason: "Alat Tulis Kantor", category: "Operasional", date: "2026-01-29 11:45", amount: 450000, status: "Lunas" },
  { id: "EXP-005", reason: "Maintenance Lift", category: "Maintenance", date: "2026-01-28 09:15", amount: 1200000, status: "Lunas" },
];

export default function PengeluaranPage() {
  const [query, setQuery] = useState("");
  const filteredData = expenseData.filter(item => 
    item.reason.toLowerCase().includes(query.toLowerCase()) || 
    item.id.toLowerCase().includes(query.toLowerCase())
  );

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Pengeluaran" 
        description="Kelola dan catat seluruh biaya operasional Faskes."
        buttonLabel="Buat Pengeluaran"
      />

      <FinanceStatsGrid>
        <FinanceStatCard 
          title="Total Pengeluaran Bulan Ini"
          value={formatIDR(24150000)}
          trend={{ value: "+5.2%", isUp: false }}
          icon={TrendingDown}
          variant="destructive"
        />
        <FinanceStatCard 
          title="Logistik & Obat"
          value={formatIDR(15000000)}
          description="62.1% dari pengeluaran"
          icon={ShoppingCart}
          variant="primary"
        />
        <FinanceStatCard 
          title="Gaji & Honor"
          value={formatIDR(5000000)}
          description="20.7% dari pengeluaran"
          icon={Briefcase}
          variant="primary"
        />
        <FinanceStatCard 
          title="Utilitas"
          value={formatIDR(2500000)}
          description="10.3% dari pengeluaran"
          icon={Lightbulb}
          variant="primary"
        />
      </FinanceStatsGrid>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <SearchFilter 
          placeholder="Cari keperluan atau ID..." 
          value={query} 
          onChange={setQuery} 
          className="w-full md:max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daftar Pengeluaran</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Keperluan / Deskripsi</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Nominal</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs">{item.id}</TableCell>
                  <TableCell className="font-medium">{item.reason}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.date}</TableCell>
                  <TableCell className="text-right font-semibold text-destructive">
                    -{formatIDR(item.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={item.status === "Lunas" ? "default" : "secondary"}
                      className={cn(item.status === "Lunas" ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600")}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
