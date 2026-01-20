"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  FileText,
  UserPlus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for patients
const mockPatients = [
  {
    id: "P001",
    name: "Ahmad Rizki",
    age: 35,
    gender: "Male",
    phone: "+62 812-3456-7890",
    lastVisit: "2026-01-15",
    status: "active",
  },
  {
    id: "P002",
    name: "Siti Nurhaliza",
    age: 28,
    gender: "Female",
    phone: "+62 813-4567-8901",
    lastVisit: "2026-01-18",
    status: "active",
  },
  {
    id: "P003",
    name: "Budi Santoso",
    age: 52,
    gender: "Male",
    phone: "+62 814-5678-9012",
    lastVisit: "2026-01-10",
    status: "inactive",
  },
  {
    id: "P004",
    name: "Dewi Lestari",
    age: 41,
    gender: "Female",
    phone: "+62 815-6789-0123",
    lastVisit: "2026-01-20",
    status: "active",
  },
  {
    id: "P005",
    name: "Eko Prasetyo",
    age: 63,
    gender: "Male",
    phone: "+62 816-7890-1234",
    lastVisit: "2026-01-05",
    status: "critical",
  },
  {
    id: "P006",
    name: "Fitri Handayani",
    age: 29,
    gender: "Female",
    phone: "+62 817-8901-2345",
    lastVisit: "2026-01-19",
    status: "active",
  },
  {
    id: "P007",
    name: "Gunawan Wibowo",
    age: 45,
    gender: "Male",
    phone: "+62 818-9012-3456",
    lastVisit: "2026-01-12",
    status: "active",
  },
  {
    id: "P008",
    name: "Hana Pertiwi",
    age: 33,
    gender: "Female",
    phone: "+62 819-0123-4567",
    lastVisit: "2026-01-17",
    status: "inactive",
  },
];

type PatientStatus = "active" | "inactive" | "critical";

const statusColors: Record<PatientStatus, "default" | "secondary" | "destructive"> = {
  active: "default",
  inactive: "secondary",
  critical: "destructive",
};

interface PatientsTableProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  hasError?: boolean;
}

export function PatientsTable({ isLoading, isEmpty, hasError }: PatientsTableProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const itemsPerPage = 5;

  // Filter patients based on search and status
  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search);
    const matchesStatus =
      statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Loading skeleton
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-9 flex-1 max-w-sm" />
              <Skeleton className="h-9 w-24" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (hasError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-destructive/10 p-3 mb-4">
            <FileText className="h-6 w-6 text-destructive" />
          </div>
          <h3 className="font-semibold text-lg mb-1">Failed to load patients</h3>
          <p className="text-sm text-muted-foreground mb-4">
            There was an error loading the patient data.
          </p>
          <Button variant="outline">Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (isEmpty || filteredPatients.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Patients</CardTitle>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search patients..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {statusFilter === "all" ? "All Status" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                  Inactive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("critical")}>
                  Critical
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Empty state content */}
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-3 mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">No patients found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {search
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first patient."}
            </p>
            {!search && (
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add First Patient
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Patients</CardTitle>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {statusFilter === "all" ? "All Status" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                Inactive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("critical")}>
                Critical
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-16">Age</TableHead>
                <TableHead className="w-20">Gender</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden lg:table-cell">Last Visit</TableHead>
                <TableHead className="w-24">Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {paginatedPatients.map((patient) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <TableCell className="font-mono text-sm">
                      {patient.id}
                    </TableCell>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {patient.phone}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(patient.lastVisit).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[patient.status as PatientStatus]}>
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Patient
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            View Records
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredPatients.length)} of{" "}
            {filteredPatients.length} patients
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
