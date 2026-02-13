import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { StatusBadge, ConditionBadge } from '@/components/ui/StatusBadge';
import { mockAssets, mockUsers, mockDashboardStats, getEnrichedAssignments } from '@/data/mockData';
import {
  Package,
  Users,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Clock,
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = mockDashboardStats;
  const recentAssets = mockAssets.slice(0, 5);
  const recentAssignments = getEnrichedAssignments().slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your IT asset management system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Assets"
            value={stats.totalAssets}
            subtitle="All IT equipment"
            icon={Package}
            variant="primary"
          />
          <StatCard
            title="Available"
            value={stats.availableAssets}
            subtitle="Ready for assignment"
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="Assigned"
            value={stats.assignedAssets}
            subtitle="Currently in use"
            icon={TrendingUp}
          />
          <StatCard
            title="Maintenance"
            value={stats.assetsInMaintenance}
            subtitle="Needs attention"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            subtitle={`${stats.totalEmployees} employees`}
            icon={Users}
          />
          <StatCard
            title="Asset Utilization"
            value={`${Math.round((stats.assignedAssets / stats.totalAssets) * 100)}%`}
            subtitle="Of total inventory"
            icon={TrendingUp}
            trend={{ value: 12, isPositive: true }}
          />
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Assets */}
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Assets</h2>
              <a href="/admin/assets" className="text-sm text-primary hover:underline">
                View all
              </a>
            </div>
            <div className="space-y-3">
              {recentAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 table-row-hover"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{asset.name}</p>
                      <p className="text-xs text-muted-foreground">{asset.serialNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ConditionBadge condition={asset.condition} />
                    <StatusBadge status={asset.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Assignments */}
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Assignments</h2>
              <a href="/admin/assignments" className="text-sm text-primary hover:underline">
                View all
              </a>
            </div>
            <div className="space-y-3">
              {recentAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 table-row-hover"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {assignment.asset?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Assigned to {assignment.user?.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(assignment.assignedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
