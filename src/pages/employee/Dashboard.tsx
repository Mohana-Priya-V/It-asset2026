import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { StatusBadge, ConditionBadge, CategoryBadge } from '@/components/ui/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { getUserAssignedAssets } from '@/data/mockData';
import { Monitor, Package, Calendar, Shield } from 'lucide-react';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const assignedAssets = user ? getUserAssignedAssets(user.id) : [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your assigned IT assets
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Assigned Assets"
            value={assignedAssets.length}
            subtitle="Currently in your possession"
            icon={Monitor}
            variant="primary"
          />
          <StatCard
            title="Department"
            value={user?.department || '-'}
            subtitle="Your team"
            icon={Shield}
          />
          <StatCard
            title="Member Since"
            value={user ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '-'}
            subtitle="Account created"
            icon={Calendar}
          />
        </div>

        {/* Assigned Assets */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Your Assets</h2>
          
          {assignedAssets.length === 0 ? (
            <div className="card-elevated p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No assets assigned</h3>
              <p className="text-muted-foreground">
                You don't have any IT assets assigned to you yet. Contact your IT department for assistance.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedAssets.map((asset) => (
                <div key={asset.id} className="card-elevated p-5 animate-fade-in">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <StatusBadge status={asset.status} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{asset.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{asset.serialNumber}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <CategoryBadge category={asset.category} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Condition</span>
                      <ConditionBadge condition={asset.condition} />
                    </div>
                    {asset.warrantyExpiry && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Warranty</span>
                        <span className="text-foreground">
                          {new Date(asset.warrantyExpiry).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {asset.notes && (
                    <p className="mt-4 text-sm text-muted-foreground border-t border-border pt-4">
                      {asset.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
