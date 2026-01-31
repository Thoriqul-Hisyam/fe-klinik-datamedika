"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinanceStatProps {
  title: string;
  value: string;
  description?: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "destructive" | "warning";
}

export function FinanceStatCard({ 
  title, 
  value, 
  description, 
  trend, 
  icon: Icon,
  variant = "default" 
}: FinanceStatProps) {
  const variantClasses = {
    default: "",
    primary: "bg-primary/5 border-primary/20",
    success: "bg-green-500/5 border-green-500/20",
    destructive: "bg-red-500/5 border-red-500/20",
    warning: "bg-orange-500/5 border-orange-500/20",
  };

  const iconClasses = {
    default: "text-muted-foreground",
    primary: "text-primary",
    success: "text-green-600",
    destructive: "text-red-600",
    warning: "text-orange-600",
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", variantClasses[variant])}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-full bg-background/50", iconClasses[variant])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(trend || description) && (
          <div className="mt-1 flex items-center gap-2">
            {trend && (
              <span className={cn(
                "flex items-center text-xs font-medium",
                trend.isUp ? "text-green-600" : "text-red-600"
              )}>
                {trend.isUp ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                {trend.value}
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function FinanceStatsGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
