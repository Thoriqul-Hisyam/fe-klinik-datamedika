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
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if this is a full-screen page (like queue display)
  const isFullScreenPage = pathname === "/admin/antrian/display";

  // Listen for sidebar collapse state (could be enhanced with context)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isFullScreenPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          "transition-[margin] duration-200",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        {/* Sticky Top Navigation */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Scrollable Main Content */}
        <main className="min-h-[calc(100vh-3.5rem)] p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
