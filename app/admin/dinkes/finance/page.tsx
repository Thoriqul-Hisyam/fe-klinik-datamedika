"use client";

import { useState } from "react";
import { 
  Building2, 
  Search, 
  Download, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  PieChart,
  Activity,
  BarChart3,
  Wallet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FinanceStatCard, FinanceStatsGrid } from "@/components/admin/finance/finance-stats";
import { cn } from "@/lib/utils";

// Dummy data for facility finance overview
const facilityFinanceData = [
  { id: "faskes-001", name: "Klinik Pratama Sehat", revenue: 150000000, expense: 95000000, profit: 55000000, status: "Healthy" },
  { id: "faskes-002", name: "RSUD Kota Harapan", revenue: 1250000000, expense: 1100000000, profit: 150000000, status: "Warning" },
  { id: "faskes-003", name: "Klinik Gigi Senyum", revenue: 45000000, expense: 32000000, profit: 13000000, status: "Healthy" },
  { id: "faskes-004", name: "Puskesmas Maju Jaya", revenue: 85000000, expense: 78000000, profit: 7000000, status: "Healthy" },
  { id: "faskes-005", name: "RSIA Bunda", revenue: 450000000, expense: 380000000, profit: 70000000, status: "Healthy" },
];

export default function DinkesFinancePage() {
  const [query, setQuery] = useState("");
  const filteredData = facilityFinanceData.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", { 
      style: "currency", 
      currency: "IDR", 
      notation: "compact",
      maximumFractionDigits: 1 
    }).format(val);
  };

  const totalRevenue = facilityFinanceData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpense = facilityFinanceData.reduce((acc, curr) => acc + curr.expense, 0);
  const totalProfit = totalRevenue - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Monitoring Finance (Wilayah)</h1>
        <p className="text-muted-foreground">
          Pantau kesehatan finansial seluruh fasilitas kesehatan di bawah naungan Dinkes.
        </p>
      </div>

      <FinanceStatsGrid>
        <FinanceStatCard 
          title="Total Omzet Wilayah"
          value={formatIDR(totalRevenue)}
          trend={{ value: "+8.4%", isUp: true }}
          icon={TrendingUp}
          variant="primary"
        />
        <FinanceStatCard 
          title="Total Pengeluaran"
          value={formatIDR(totalExpense)}
          trend={{ value: "+4.2%", isUp: false }}
          icon={TrendingDown}
          variant="destructive"
        />
        <FinanceStatCard 
          title="Total Profitabilitas"
          value={formatIDR(totalProfit)}
          trend={{ value: "+12.1%", isUp: true }}
          icon={BarChart3}
          variant="success"
        />
        <FinanceStatCard 
          title="Faskes Critical"
          value="1 Faskes"
          description="RSUD Kota Harapan (Margin Rendah)"
          icon={Activity}
          variant="warning"
        />
      </FinanceStatsGrid>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Cari faskes..." 
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipe Faskes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="rs">Rumah Sakit</SelectItem>
              <SelectItem value="klinik">Klinik</SelectItem>
              <SelectItem value="puskesmas">Puskesmas</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Wilayah
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performa Keuangan Per Faskes</CardTitle>
          <CardDescription>Peringkat kesehatan finansial faskes bulan ini.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fasilitas Kesehatan</TableHead>
                <TableHead className="text-right">Pendapatan</TableHead>
                <TableHead className="text-right">Pengeluaran</TableHead>
                <TableHead className="text-right">Laba Bersih</TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => {
                const margin = ((item.profit / item.revenue) * 100).toFixed(1);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {item.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{formatIDR(item.revenue)}</TableCell>
                    <TableCell className="text-right text-destructive">{formatIDR(item.expense)}</TableCell>
                    <TableCell className="text-right font-bold text-primary">{formatIDR(item.profit)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              parseFloat(margin) < 15 ? "bg-red-500" : "bg-green-500"
                            )} 
                            style={{ width: `${margin}%` }} 
                          />
                        </div>
                        <span className="text-xs">{margin}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.status === "Healthy" ? "default" : "destructive"}
                        className={cn(item.status === "Healthy" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600")}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/admin/dinkes/faskes/${item.id}`}>
                          Lihat Detail <ArrowUpRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
