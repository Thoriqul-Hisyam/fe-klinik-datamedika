"use client";

import { use, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  MoreHorizontal,
  Phone,
  Stethoscope,
  Users,
  Activity,
  AlertCircle,
  Table as TableIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Area,
  AreaChart,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy data for facility details
const facilityData = {
  "faskes-001": {
    name: "Klinik Pratama Sehat",
    type: "Klinik Pratama",
    address: "Jl. Merdeka No. 10",
    phone: "(021) 555-0123",
    director: "Dr. Budi Santoso",
    status: "Active",
    accreditation: "Paripurna",
  },
  "faskes-002": {
    name: "RSUD Kota Harapan",
    type: "Rumah Sakit Umum",
    address: "Jl. Sudirman No. 45",
    phone: "(021) 555-0812",
    director: "Dr. Siti Aminah",
    status: "Warning",
    accreditation: "Utama",
  },
};

// Dummy data for charts
const visitData = [
  { name: "Sen", visits: 120, poli: 80, igd: 40 },
  { name: "Sel", visits: 132, poli: 90, igd: 42 },
  { name: "Rab", visits: 101, poli: 70, igd: 31 },
  { name: "Kam", visits: 134, poli: 95, igd: 39 },
  { name: "Jum", visits: 90, poli: 60, igd: 30 },
  { name: "Sab", visits: 230, poli: 150, igd: 80 },
  { name: "Min", visits: 210, poli: 130, igd: 80 },
];

const diseaseData = [
  { name: "ISPA", value: 400, trend: "+5%", caseType: "Baru", male: 180, female: 220, newCases: 350, oldCases: 50 },
  { name: "Hipertensi", value: 300, trend: "+2%", caseType: "Lama", male: 140, female: 160, newCases: 20, oldCases: 280 },
  { name: "Diabetes", value: 300, trend: "+1%", caseType: "Lama", male: 130, female: 170, newCases: 15, oldCases: 285 },
  { name: "Diare", value: 200, trend: "-3%", caseType: "Baru", male: 110, female: 90, newCases: 190, oldCases: 10 },
  { name: "Gastritis", value: 150, trend: "0%", caseType: "Baru", male: 60, female: 90, newCases: 130, oldCases: 20 },
  { name: "Cephalgia", value: 120, trend: "-1%", caseType: "Baru", male: 50, female: 70, newCases: 100, oldCases: 20 },
  { name: "Influenza", value: 100, trend: "+4%", caseType: "Baru", male: 55, female: 45, newCases: 95, oldCases: 5 },
  { name: "Myalgia", value: 90, trend: "-2%", caseType: "Baru", male: 45, female: 45, newCases: 80, oldCases: 10 },
  { name: "Dermatitis", value: 80, trend: "+1%", caseType: "Baru", male: 40, female: 40, newCases: 70, oldCases: 10 },
  { name: "Asma", value: 60, trend: "0%", caseType: "Lama", male: 35, female: 25, newCases: 10, oldCases: 50 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1", "#a4de6c", "#d0ed57"];

export default function FacilityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const facility = facilityData[id as keyof typeof facilityData] || facilityData["faskes-001"];
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center gap-4">
        {/* ... existing header code ... */}
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/dinkes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{facility.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {facility.address}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {facility.type}
          </Badge>
          <Badge
            className="text-sm"
            variant={facility.status === "Active" ? "default" : "destructive"}>
            {facility.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Kunjungan (Bulan Ini)
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+2.5% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Okupansi Tempat Tidur
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">45 dari 58 terisi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beban Dokter</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Pasien</div>
            <p className="text-xs text-muted-foreground">Rata-rata per jam</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Obat Kritis</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Item</div>
            <p className="text-xs text-muted-foreground">Butuh restock segera</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="morbidity">Morbiditas</TabsTrigger>
          <TabsTrigger value="services">Layanan & Poli</TabsTrigger>
          <TabsTrigger value="resources">SDM & Fasilitas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tren Kunjungan 7 Hari Terakhir</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={visitData}>
                    <defs>
                      <linearGradient id="colorVisit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorVisit)"
                      name="Total Kunjungan"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top 5 Penyakit (Ringkasan)</CardTitle>
                <CardDescription>Bulan Ini</CardDescription>
              </CardHeader>
              <CardContent>
                 <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={diseaseData.slice(0, 5)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }: { name?: string; percent?: number }) => `${name || ""} ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {diseaseData.slice(0, 5).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="morbidity" className="space-y-4">
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Demografi Penyakit Teratas</CardTitle>
                        <CardDescription>Distribusi kasus berdasarkan jenis kelamin untuk 5 penyakit teratas.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={diseaseData.slice(0, 5)} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="male" name="Laki-laki" stackId="a" fill="#0088FE" />
                                <Bar dataKey="female" name="Perempuan" stackId="a" fill="#FF8042" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Kasus Baru vs Lama</CardTitle>
                         <CardDescription>Proporsi kasus baru dan lama.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={400}>
                             <BarChart data={diseaseData.slice(0, 5)}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="newCases" name="Kasus Baru" fill="#82ca9d" />
                                <Bar dataKey="oldCases" name="Kasus Lama" fill="#8884d8" />
                             </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-7">
                    <CardHeader>
                        <CardTitle>Detail Data Morbiditas</CardTitle>
                        <CardDescription>Rincian lengkap kasus per penyakit.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Penyakit</TableHead>
                                        <TableHead className="text-right">Total Kasus</TableHead>
                                        <TableHead className="text-right">Laki-laki</TableHead>
                                        <TableHead className="text-right">Perempuan</TableHead>
                                        <TableHead className="text-right">Kasus Baru</TableHead>
                                        <TableHead className="text-right">Kasus Lama</TableHead>
                                        <TableHead className="text-right">Tren</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {diseaseData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell className="text-right font-bold">{item.value}</TableCell>
                                            <TableCell className="text-right text-muted-foreground">{item.male}</TableCell>
                                            <TableCell className="text-right text-muted-foreground">{item.female}</TableCell>
                                            <TableCell className="text-right text-blue-600">{item.newCases}</TableCell>
                                            <TableCell className="text-right text-amber-600">{item.oldCases}</TableCell>
                                            <TableCell className="text-right">
                                                <Badge variant={item.trend.startsWith("+") ? "destructive" : "secondary"}>
                                                    {item.trend}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                         </div>
                    </CardContent>
                </Card>
             </div>
        </TabsContent>

        <TabsContent value="services" className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
             <div className="text-center space-y-2">
                <Building2 className="h-10 w-10 mx-auto text-muted-foreground" />
                <h3 className="font-semibold text-lg">Detail Layanan</h3>
                <p className="text-muted-foreground">Konten detail layanan dan poli akan ditampilkan di sini.</p>
             </div>
        </TabsContent>
         <TabsContent value="resources" className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
             <div className="text-center space-y-2">
                <Users className="h-10 w-10 mx-auto text-muted-foreground" />
                <h3 className="font-semibold text-lg">Detail SDM & Fasilitas</h3>
                <p className="text-muted-foreground">Konten detail SDM, Dokter, dan Fasilitas Fisik akan ditampilkan di sini.</p>
             </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
