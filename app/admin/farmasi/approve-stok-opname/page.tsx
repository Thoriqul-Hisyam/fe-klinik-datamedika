"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/shared/page-header";
import { dummyStokOpname } from "@/components/admin/farmasi/stok-opname/opname-table";
import { ApprovalTable } from "@/components/admin/farmasi/approve-stok-opname/approval-table";

export default function ApproveStokOpnamePage() {
  const pendingOpnames = dummyStokOpname.filter(so => so.status === "Pending Approval");

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Persetujuan Stok Opname" 
        description="Konfirmasi dan persetujuan hasil stok opname."
      />

      <Card>
        <CardHeader>
          <CardTitle>Antrian Persetujuan</CardTitle>
        </CardHeader>
        <CardContent>
          <ApprovalTable 
            data={pendingOpnames} 
            onApprove={(id) => alert("Approved " + id)} 
            onReject={(id) => alert("Rejected " + id)} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
