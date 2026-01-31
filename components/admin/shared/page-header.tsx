"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function PageHeader({ title, description, buttonLabel, onButtonClick }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {buttonLabel && (
        <Button onClick={onButtonClick}>
          <Plus className="mr-2 h-4 w-4" />
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
