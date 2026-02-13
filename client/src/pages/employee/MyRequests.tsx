import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { getUserRepairRequests } from '@/data/mockData';
import { IssueStatus, IssuePriority } from '@/types';
import { ClipboardList, MessageSquare } from 'lucide-react';

const statusColors: Record<IssueStatus, string> = {
  pending: 'badge-status bg-warning/15 text-warning',
  in_progress: 'badge-status bg-accent/15 text-accent',
  resolved: 'badge-status bg-success/15 text-success',
  rejected: 'badge-status bg-destructive/15 text-destructive',
};

const statusLabels: Record<IssueStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  rejected: 'Rejected',
};

const priorityColors: Record<IssuePriority, string> = {
  low: 'badge-status bg-muted text-muted-foreground',
  medium: 'badge-status bg-warning/15 text-warning',
  high: 'badge-status bg-destructive/15 text-destructive',
};

export default function MyRequests() {
  const { user } = useAuth();
  const requests = user ? getUserRepairRequests(user.id) : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Requests</h1>
          <p className="text-muted-foreground mt-1">Track the status of your repair requests</p>
        </div>

        {requests.length === 0 ? (
          <div className="card-elevated p-12 text-center">
            <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No requests yet</h3>
            <p className="text-muted-foreground">You haven't submitted any repair requests.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map(req => (
              <div key={req.id} className="card-elevated p-5 animate-fade-in">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{req.asset?.name}</h3>
                    <p className="text-xs text-muted-foreground">{req.asset?.serialNumber} · {req.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={priorityColors[req.priority]}>
                      {req.priority.charAt(0).toUpperCase() + req.priority.slice(1)}
                    </span>
                    <span className={statusColors[req.status]}>{statusLabels[req.status]}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground min-w-[80px]">Issue:</span>
                    <span className="text-foreground capitalize">{req.issueType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground min-w-[80px]">Description:</span>
                    <span className="text-foreground">{req.description}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground min-w-[80px]">Submitted:</span>
                    <span className="text-foreground">{new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {req.adminRemarks && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-primary">Admin Remarks</span>
                    </div>
                    <p className="text-sm text-foreground">{req.adminRemarks}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
