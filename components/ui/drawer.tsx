"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function Drawer({ open, onClose, children, title, description }: DrawerProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-xl",
          "animate-in slide-in-from-right duration-200"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              {title && <h2 className="text-base font-semibold">{title}</h2>}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
