"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  ArrowUpRight,
  Building2,
  Search,
  Users,
  AlertTriangle,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Pie,
  PieChart,
} from "recharts";

// Dummy data for facilities
const facilities = [
  {
    id: "faskes-001",
    name: "Klinik Pratama Sehat",
    type: "Klinik Pratama",
    address: "Jl. Merdeka No. 10",
    status: "Active",
    doctors: 5,
    patients_today: 45,
    bed_occupancy: "80%",
  },
  {
    id: "faskes-002",
    name: "RSUD Kota Harapan",
    type: "Rumah Sakit Umum",
    address: "Jl. Sudirman No. 45",
    status: "Warning",
    doctors: 32,
    patients_today: 128,
    bed_occupancy: "95%",
  },
  {
    id: "faskes-003",
    name: "Klinik Gigi Senyum",
    type: "Klinik Utama",
    address: "Jl. Gatot Subroto No. 12",
    status: "Active",
    doctors: 3,
    patients_today: 15,
    bed_occupancy: "N/A",
  },
  {
    id: "faskes-004",
    name: "Puskesmas Maju Jaya",
    type: "Puskesmas",
    address: "Jl. Ahmad Yani No. 88",
    status: "Active",
    doctors: 8,
    patients_today: 67,
    bed_occupancy: "60%",
  },
  {
    id: "faskes-005",
    name: "RSIA Bunda",
    type: "Rumah Sakit Ibu Anak",
    address: "Jl. Kartini No. 21",
    status: "Active",
    doctors: 12,
    patients_today: 55,
    bed_occupancy: "75%",
  },
];

// Dummy data for aggregate morbidity
const aggregateMorbidityData = [
  { name: "ISPA", cases: 2450, trend: "+5%" },
  { name: "Hipertensi", cases: 1890, trend: "+2%" },
  { name: "Diabetes Mellitus", cases: 1540, trend: "+1%" },
  { name: "Diare", cases: 1200, trend: "-3%" },
  { name: "Dyspepsia", cases: 980, trend: "0%" },
  { name: "Influenza", cases: 850, trend: "+8%" },
  { name: "Cephalgia", cases: 760, trend: "-1%" },
  { name: "Demam Typhoid", cases: 540, trend: "-2%" },
  { name: "Dermatitis", cases: 490, trend: "+1%" },
  { name: "Gastritis", cases: 450, trend: "0%" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1", "#a4de6c", "#d0ed57"];

export default function DinkesDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFacilities = facilities.filter((facility) =>
    facility.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Dinas Kesehatan
        </h1>
        <p className="text-muted-foreground">
          Monitoring fasilitas kesehatan dan statistik pelayanan wilayah.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faskes</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facilities.length}</div>
            <p className="text-xs text-muted-foreground">
              Terdaftar di wilayah ini
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pasien Hari Ini
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facilities.reduce((acc, curr) => acc + curr.patients_today, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% dari hari kemarin
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dokter Aktif</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facilities.reduce((acc, curr) => acc + curr.doctors, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Tersebar di semua faskes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peringatan</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facilities.filter((f) => f.status === "Warning").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Faskes butuh perhatian
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Morbidity Stats (Global) */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Top 10 Penyakit Terbanyak (Wilayah)</CardTitle>
                <CardDescription>
                    Akumulasi data morbiditas dari seluruh fasilitas kesehatan bulan ini.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={aggregateMorbidityData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                        <Tooltip 
                            formatter={(value: any) => [`${value} Kasus`, "Jumlah"]}
                            labelStyle={{ color: "black" }}
                        />
                        <Legend />
                        <Bar dataKey="cases" name="Jumlah Kasus" fill="#8884d8" radius={[0, 4, 4, 0]}>
                            {aggregateMorbidityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card className="col-span-3">
             <CardHeader>
                <CardTitle>Tren Penyakit Infeksi</CardTitle>
                <CardDescription>
                    Penyakit menular yang perlu diwaspadai.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="space-y-4">
                    {aggregateMorbidityData.slice(0, 5).map((item, i) => (
                        <div key={i} className="flex items-center">
                             <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted">
                                <Activity className="h-5 w-5 text-primary" />
                             </div>
                             <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{item.name}</p>
                                <p className="text-sm text-muted-foreground">{item.cases} Kasus</p>
                             </div>
                             <div className="ml-auto font-medium">
                                <span className={item.trend.startsWith("+") ? "text-red-500" : "text-green-500"}>
                                    {item.trend}
                                </span>
                             </div>
                        </div>
                    ))}
                 </div>
            </CardContent>
        </Card>
      </div>

      {/* Facilities List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Daftar Fasilitas Kesehatan</h2>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    placeholder="Cari faskes..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button>Export Data</Button>
            </div>
        </div>
        
        <Card>
            <CardContent className="p-0">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Nama Faskes</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Alamat</TableHead>
                    <TableHead>Dokter</TableHead>
                    <TableHead>Pasien (Hari Ini)</TableHead>
                    <TableHead>BOR (Bed Occupancy)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredFacilities.map((facility) => (
                    <TableRow key={facility.id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-primary/50" />
                                {facility.name}
                            </div>
                        </TableCell>
                        <TableCell>{facility.type}</TableCell>
                        <TableCell>{facility.address}</TableCell>
                        <TableCell>{facility.doctors}</TableCell>
                        <TableCell>{facility.patients_today}</TableCell>
                        <TableCell>
                            <Badge variant={facility.bed_occupancy === "N/A" ? "outline" : parseInt(facility.bed_occupancy) > 90 ? "destructive" : "secondary"}>
                                {facility.bed_occupancy}
                            </Badge>
                        </TableCell>
                        <TableCell>
                        <Badge
                            variant={
                            facility.status === "Active" ? "default" : "destructive"
                            }
                        >
                            {facility.status}
                        </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                        <Button asChild size="sm" variant="ghost">
                            <Link href={`/admin/dinkes/faskes/${facility.id}`}>
                            Detail <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                    {filteredFacilities.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                                Tidak ada data faskes yang ditemukan.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
