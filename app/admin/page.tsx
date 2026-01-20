"use client";

import { Users, Clock, Pill, CalendarCheck } from "lucide-react";
import { StatsCard } from "@/components/admin/dashboard/stats-card";
import { RecentVisitsTable } from "@/components/admin/dashboard/recent-visits-table";
import { PatientTrendChart } from "@/components/admin/dashboard/patient-trend-chart";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Senin, 20 Januari 2026
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pasien Hari Ini"
          value="48"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Dalam Antrian"
          value="12"
          icon={Clock}
          description="3 sedang diperiksa"
        />
        <StatsCard
          title="Resep Hari Ini"
          value="36"
          icon={Pill}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Appointment"
          value="24"
          icon={CalendarCheck}
          description="6 belum konfirmasi"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Visits Table - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentVisitsTable />
        </div>

        {/* Patient Trend Chart - Takes 1 column */}
        <div className="lg:col-span-1">
          <PatientTrendChart />
        </div>
      </div>
    </div>
  );
}
