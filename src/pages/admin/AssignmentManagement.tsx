import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockAssets, mockUsers, mockAssignments, mockAssignmentHistory } from '@/data/mockData';
import { AssetAssignment, Asset, User } from '@/types';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  User as UserIcon,
  History,
  ArrowRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function AssignmentManagement() {
  const [assignments, setAssignments] = useState<AssetAssignment[]>(mockAssignments);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<AssetAssignment | null>(null);
  const [formData, setFormData] = useState({
    assetId: '',
    userId: '',
    notes: '',
  });

  // Get available assets (not currently assigned)
  const availableAssets = mockAssets.filter(
    a => a.status === 'available' || (editingAssignment && a.id === editingAssignment.assetId)
  );

  // Get active employees
  const activeEmployees = mockUsers.filter(u => u.isActive);

  // Enrich assignments with asset and user data
  const enrichedAssignments = assignments.map(a => ({
    ...a,
    asset: mockAssets.find(asset => asset.id === a.assetId),
    user: mockUsers.find(user => user.id === a.userId),
  }));

  const filteredAssignments = enrichedAssignments.filter((assignment) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      assignment.asset?.name.toLowerCase().includes(searchLower) ||
      assignment.user?.name.toLowerCase().includes(searchLower) ||
      assignment.asset?.serialNumber.toLowerCase().includes(searchLower)
    );
  });

  const enrichedHistory = mockAssignmentHistory.map(a => ({
    ...a,
    asset: mockAssets.find(asset => asset.id === a.assetId),
    user: mockUsers.find(user => user.id === a.userId),
  }));

  const openCreateModal = () => {
    setEditingAssignment(null);
    setFormData({
      assetId: '',
      userId: '',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (assignment: AssetAssignment) => {
    setEditingAssignment(assignment);
    setFormData({
      assetId: assignment.assetId,
      userId: assignment.userId,
      notes: assignment.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAssignment) {
      setAssignments(assignments.map(a => 
        a.id === editingAssignment.id 
          ? { ...a, ...formData }
          : a
      ));
    } else {
      const newAssignment: AssetAssignment = {
        id: `ASGN-${String(assignments.length + 1).padStart(3, '0')}`,
        ...formData,
        assignedAt: new Date().toISOString(),
      };
      setAssignments([...assignments, newAssignment]);
    }
    
    setIsModalOpen(false);
  };

  const removeAssignment = (assignmentId: string) => {
    if (confirm('Are you sure you want to remove this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== assignmentId));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Asset Assignments</h1>
            <p className="text-muted-foreground mt-1">
              Manage asset assignments to employees
            </p>
          </div>
          <button onClick={openCreateModal} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Assignment
          </button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active Assignments</TabsTrigger>
            <TabsTrigger value="history">Assignment History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Assignments Table */}
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                        Asset
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                        Assigned To
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                        Assigned Date
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                        Notes
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredAssignments.map((assignment) => (
                      <tr key={assignment.id} className="table-row-hover">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Package className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{assignment.asset?.name}</p>
                              <p className="text-sm text-muted-foreground">{assignment.asset?.serialNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-accent">
                                {assignment.user?.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{assignment.user?.name}</p>
                              <p className="text-sm text-muted-foreground">{assignment.user?.department}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {new Date(assignment.assignedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground max-w-[200px] truncate">
                          {assignment.notes || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditModal(assignment)}
                              className="p-2 rounded-lg hover:bg-muted transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button
                              onClick={() => removeAssignment(assignment.id)}
                              className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                        Asset
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                        User
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                        Assigned
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                        Returned
                      </th>
                      <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {enrichedHistory.map((record) => (
                      <tr key={record.id} className="table-row-hover">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <History className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{record.asset?.name}</p>
                              <p className="text-sm text-muted-foreground">{record.asset?.serialNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {record.user?.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {new Date(record.assignedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {record.returnedAt 
                            ? new Date(record.returnedAt).toLocaleDateString() 
                            : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            'badge-status',
                            record.returnedAt
                              ? 'bg-muted text-muted-foreground'
                              : 'bg-success/15 text-success'
                          )}>
                            {record.returnedAt ? 'Returned' : 'Active'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Assignment Form Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAssignment ? 'Edit Assignment' : 'New Assignment'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Asset
                </label>
                <select
                  value={formData.assetId}
                  onChange={(e) => setFormData({ ...formData, assetId: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select an asset</option>
                  {availableAssets.map(asset => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name} ({asset.serialNumber})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Assign To
                </label>
                <select
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select an employee</option>
                  {activeEmployees.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.department})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input-field min-h-[80px]"
                  placeholder="Optional notes about this assignment"
                  rows={3}
                />
              </div>
              <DialogFooter className="mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingAssignment ? 'Update' : 'Assign Asset'}
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
