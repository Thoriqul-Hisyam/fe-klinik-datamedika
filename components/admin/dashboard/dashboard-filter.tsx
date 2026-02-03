"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Filter } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface DashboardFilterProps {
  className?: string
  onFilter?: (from: Date | undefined, to: Date | undefined) => void
}

export function DashboardFilter({
  className,
  onFilter,
}: DashboardFilterProps) {
  const [fromDate, setFromDate] = React.useState<Date | undefined>(new Date())
  const [toDate, setToDate] = React.useState<Date | undefined>(new Date())

  const handleFilter = () => {
    if (onFilter) {
      onFilter(fromDate, toDate);
    } else {
        console.log("Filter clicked:", { fromDate, toDate });
    }
  }

  return (
    <div className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-2", className)}>
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1">
          <Label className="text-[10px] text-muted-foreground ml-1">Dari</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                size="sm"
                className={cn(
                  "w-[140px] justify-start text-left font-normal",
                  !fromDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "dd MMM yyyy") : <span>Pilih Tanggal</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <span className="text-muted-foreground mt-5">-</span>

        <div className="flex flex-col gap-1">
          <Label className="text-[10px] text-muted-foreground ml-1">Sampai</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                size="sm"
                disabled={!fromDate}
                className={cn(
                  "w-[140px] justify-start text-left font-normal",
                  !toDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "dd MMM yyyy") : <span>Pilih Tanggal</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                initialFocus
                disabled={(date) => fromDate ? date < fromDate : false}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button size="sm" onClick={handleFilter} className="mt-5">
        <Filter className="mr-2 h-4 w-4" />
        Filter Data
      </Button>
    </div>
  )
}
