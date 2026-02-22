import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge, ConditionBadge, CategoryBadge } from '@/components/ui/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { getUserAssignedAssets } from '@/data/mockData';
import { Package, Info } from 'lucide-react';

export default function EmployeeAssets() {
  const { user } = useAuth();
  const assignedAssets = user ? getUserAssignedAssets(user.id) : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Assets</h1>
          <p className="text-muted-foreground mt-1">
            View details of IT assets assigned to you
          </p>
        </div>

        {assignedAssets.length === 0 ? (
          <div className="card-elevated p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No assets assigned</h3>
            <p className="text-muted-foreground">
              Contact your IT department if you need equipment.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {assignedAssets.map((asset) => (
              <div key={asset.id} className="card-elevated p-6 animate-fade-in">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Asset Icon & Basic Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Package className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{asset.name}</h3>
                        <StatusBadge status={asset.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">ID: {asset.id}</p>
                      <p className="text-sm text-muted-foreground">S/N: {asset.serialNumber}</p>
                    </div>
                  </div>

                  {/* Asset Details */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <CategoryBadge category={asset.category} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Condition</p>
                      <ConditionBadge condition={asset.condition} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Purchase Date</p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(asset.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Warranty Expires</p>
                      <p className="text-sm font-medium text-foreground">
                        {asset.warrantyExpiry 
                          ? new Date(asset.warrantyExpiry).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {asset.notes && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <p className="text-sm text-muted-foreground">{asset.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="card-elevated p-6 bg-muted/30">
          <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground">
            If you have issues with any of your assigned assets or need additional equipment, 
            please contact the IT department at <span className="text-primary">it-support@company.com</span>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
