"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Download, 
  Filter, 
  Wallet, 
  TrendingUp, 
  CreditCard,
  Building2,
  Calendar
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

// Dummy data for revenue
const revenueData = [
  { id: "REV-001", source: "Pasien Umum", method: "Tunai", date: "2026-01-31 09:15", amount: 150000, status: "Success" },
  { id: "REV-002", source: "Farmasi RJ", method: "Transfer", date: "2026-01-31 10:20", amount: 450000, status: "Success" },
  { id: "REV-003", source: "Asuransi Mandiri", method: "Piutang", date: "2026-01-31 11:00", amount: 1250000, status: "Pending" },
  { id: "REV-004", source: "Pasien Gigi", method: "Debit", date: "2026-01-30 14:45", amount: 350000, status: "Success" },
  { id: "REV-005", source: "Laboratorium", method: "Tunai", date: "2026-01-30 15:30", amount: 200000, status: "Success" },
];

export default function PendapatanPage() {
  const [query, setQuery] = useState("");
  const filteredData = revenueData.filter(item => 
    item.source.toLowerCase().includes(query.toLowerCase()) || 
    item.id.toLowerCase().includes(query.toLowerCase())
  );

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Pendapatan" 
        description="Kelola dan pantau seluruh pendapatan Faskes."
        buttonLabel="Tambah Pemasukan"
      />

      <FinanceStatsGrid>
        <FinanceStatCard 
          title="Total Pendapatan Hari Ini"
          value={formatIDR(1850000)}
          trend={{ value: "+12.5%", isUp: true }}
          icon={TrendingUp}
          variant="primary"
        />
        <FinanceStatCard 
          title="Tunai"
          value={formatIDR(350000)}
          description="18.9% dari total"
          icon={Wallet}
          variant="success"
        />
        <FinanceStatCard 
          title="Non-Tunai (Transfer/Debit)"
          value={formatIDR(800000)}
          description="43.2% dari total"
          icon={CreditCard}
          variant="primary"
        />
        <FinanceStatCard 
          title="Pending / Piutang"
          value={formatIDR(1250000)}
          description="Membutuhkan verifikasi"
          icon={Calendar}
          variant="warning"
        />
      </FinanceStatsGrid>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <SearchFilter 
          placeholder="Cari sumber atau ID..." 
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
          <CardTitle className="text-lg">Riwayat Pemasukan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Sumber Pendapatan</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Nominal</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs">{item.id}</TableCell>
                  <TableCell className="font-medium">{item.source}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {item.method}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.date}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    {formatIDR(item.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={item.status === "Success" ? "default" : "secondary"}
                      className={cn(item.status === "Success" ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600")}
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
