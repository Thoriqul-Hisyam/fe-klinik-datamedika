"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for patient trends (last 7 days)
const trendData = [
  { hari: "Sen", kunjungan: 45, pasienBaru: 8 },
  { hari: "Sel", kunjungan: 52, pasienBaru: 12 },
  { hari: "Rab", kunjungan: 38, pasienBaru: 5 },
  { hari: "Kam", kunjungan: 65, pasienBaru: 15 },
  { hari: "Jum", kunjungan: 48, pasienBaru: 9 },
  { hari: "Sab", kunjungan: 72, pasienBaru: 18 },
  { hari: "Min", kunjungan: 35, pasienBaru: 6 },
];

export function PatientTrendChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Tren Kunjungan Pasien
        </CardTitle>
        <p className="text-xs text-muted-foreground">7 hari terakhir</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="hari"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ fontWeight: 500 }}
              />
              <Line
                type="monotone"
                dataKey="kunjungan"
                name="Total Kunjungan"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="pasienBaru"
                name="Pasien Baru"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
                activeDot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-4 rounded-full bg-primary" />
            <span className="text-muted-foreground">Total Kunjungan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 border-t-2 border-dashed border-muted-foreground" />
            <span className="text-muted-foreground">Pasien Baru</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
