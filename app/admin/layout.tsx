"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/layout/sidebar";
import { Header } from "@/components/admin/layout/header";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        collapsed={false} 
        onToggle={() => setSidebarOpen(false)} 
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          "transition-[margin] duration-300 ease-in-out",
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}
      >
        {/* Sticky Top Navigation */}
        <Header onMenuClick={() => setSidebarOpen(true)} showMenuButton={!sidebarOpen} />

        {/* Scrollable Main Content */}
        <main className="min-h-[calc(100vh-3.5rem)] p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
