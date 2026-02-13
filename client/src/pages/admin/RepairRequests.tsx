import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getEnrichedRepairRequests, getDepartments } from '@/data/mockData';
import { IssueStatus, IssuePriority } from '@/types';
import { Wrench, Filter } from 'lucide-react';

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

export default function RepairRequests() {
  const allRequests = getEnrichedRepairRequests();
  const departments = getDepartments();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<IssueStatus>('pending');
  const [editRemarks, setEditRemarks] = useState('');

  const filtered = allRequests.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (deptFilter !== 'all' && r.user?.department !== deptFilter) return false;
    return true;
  });

  const handleEdit = (id: string, status: IssueStatus, remarks?: string) => {
    setEditingId(id);
    setEditStatus(status);
    setEditRemarks(remarks || '');
  };

  const handleSave = () => {
    // In a real app, this would call the API
    setEditingId(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Repair Requests</h1>
            <p className="text-muted-foreground mt-1">Manage asset issue reports from employees</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="input-field w-auto text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="input-field w-auto text-sm"
          >
            <option value="all">All Departments</option>
            {departments.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Asset</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Employee</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Department</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Issue</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Priority</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(req => (
                  <tr key={req.id} className="border-b border-border table-row-hover">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground text-sm">{req.asset?.name}</p>
                      <p className="text-xs text-muted-foreground">{req.asset?.serialNumber}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">{req.user?.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{req.user?.department}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-foreground capitalize">{req.issueType.replace('_', ' ')}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{req.description}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={priorityColors[req.priority]}>{req.priority.charAt(0).toUpperCase() + req.priority.slice(1)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={statusColors[req.status]}>{statusLabels[req.status]}</span>
                    </td>
                    <td className="px-4 py-3">
                      {editingId === req.id ? (
                        <div className="space-y-2 min-w-[200px]">
                          <select
                            value={editStatus}
                            onChange={e => setEditStatus(e.target.value as IssueStatus)}
                            className="input-field text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <textarea
                            value={editRemarks}
                            onChange={e => setEditRemarks(e.target.value)}
                            placeholder="Admin remarks..."
                            className="input-field text-sm"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button onClick={handleSave} className="btn-primary text-xs py-1 px-3">Save</button>
                            <button onClick={() => setEditingId(null)} className="btn-ghost text-xs py-1 px-3">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(req.id, req.status, req.adminRemarks)}
                          className="btn-ghost text-xs py-1 px-3"
                        >
                          <Wrench className="w-3 h-3 mr-1" /> Manage
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-muted-foreground">
                      No repair requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
