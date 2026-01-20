"use client";

import { motion } from "framer-motion";
import { Clock, User, MoreVertical, Video, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock data for today's appointments
const todayAppointments = [
  {
    id: "A001",
    patientName: "Ahmad Rizki",
    time: "09:00",
    duration: 30,
    type: "Consultation",
    doctor: "Dr. Sarah",
    status: "completed",
    isOnline: false,
  },
  {
    id: "A002",
    patientName: "Siti Nurhaliza",
    time: "09:30",
    duration: 45,
    type: "Check-up",
    doctor: "Dr. Budi",
    status: "in-progress",
    isOnline: true,
  },
  {
    id: "A003",
    patientName: "Dewi Lestari",
    time: "10:30",
    duration: 30,
    type: "Follow-up",
    doctor: "Dr. Sarah",
    status: "scheduled",
    isOnline: false,
  },
  {
    id: "A004",
    patientName: "Eko Prasetyo",
    time: "11:00",
    duration: 60,
    type: "Treatment",
    doctor: "Dr. Ahmad",
    status: "scheduled",
    isOnline: false,
  },
  {
    id: "A005",
    patientName: "Fitri Handayani",
    time: "12:00",
    duration: 30,
    type: "Consultation",
    doctor: "Dr. Budi",
    status: "scheduled",
    isOnline: true,
  },
  {
    id: "A006",
    patientName: "Gunawan Wibowo",
    time: "14:00",
    duration: 45,
    type: "Check-up",
    doctor: "Dr. Sarah",
    status: "scheduled",
    isOnline: false,
  },
];

type AppointmentStatus = "completed" | "in-progress" | "scheduled" | "cancelled";

const statusConfig: Record<
  AppointmentStatus,
  { label: string; variant: "default" | "secondary" | "success" | "destructive" }
> = {
  completed: { label: "Completed", variant: "success" },
  "in-progress": { label: "In Progress", variant: "default" },
  scheduled: { label: "Scheduled", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

export function AppointmentsList() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Today&apos;s Appointments</CardTitle>
          <Badge variant="outline" className="font-mono">
            {todayAppointments.length} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
        {todayAppointments.map((appointment, index) => {
          const config = statusConfig[appointment.status as AppointmentStatus];
          const isPast = appointment.time < currentTimeString;
          const isCurrent = appointment.status === "in-progress";

          return (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "relative rounded-lg border p-3 transition-colors",
                isCurrent && "border-primary bg-primary/5",
                isPast && appointment.status !== "completed" && "opacity-60"
              )}
            >
              {/* Time indicator line */}
              {isCurrent && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg" />
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {/* Time and type */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{appointment.time}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({appointment.duration} min)
                    </span>
                    {appointment.isOnline ? (
                      <Video className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>

                  {/* Patient name */}
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-medium text-sm truncate">
                      {appointment.patientName}
                    </span>
                  </div>

                  {/* Type and doctor */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{appointment.type}</span>
                    <span>•</span>
                    <span>{appointment.doctor}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant={config.variant} className="text-xs">
                    {config.label}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem>Start Appointment</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
