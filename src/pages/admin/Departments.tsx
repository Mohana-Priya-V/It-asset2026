import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getDepartments } from '@/data/mockData';
import { StatusBadge, CategoryBadge, RoleBadge } from '@/components/ui/StatusBadge';
import { Building2, Users, Package, ChevronRight, ArrowLeft } from 'lucide-react';
import { Department } from '@/types';

export default function Departments() {
  const departments = getDepartments();
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  if (selectedDept) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedDept(null)} className="btn-ghost p-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{selectedDept.name}</h1>
              <p className="text-muted-foreground">
                {selectedDept.employees.length} employees · {selectedDept.assets.length} assets
              </p>
            </div>
          </div>

          {/* Employees */}
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Employees
            </h2>
            {selectedDept.employees.length === 0 ? (
              <p className="text-muted-foreground text-sm">No employees in this department.</p>
            ) : (
              <div className="space-y-3">
                {selectedDept.employees.map(emp => (
                  <div key={emp.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{emp.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                    <RoleBadge role={emp.role} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assets */}
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" /> Assigned Assets
            </h2>
            {selectedDept.assets.length === 0 ? (
              <p className="text-muted-foreground text-sm">No assets assigned to this department.</p>
            ) : (
              <div className="space-y-3">
                {selectedDept.assets.map(asset => (
                  <div key={asset.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">{asset.serialNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CategoryBadge category={asset.category} />
                      <StatusBadge status={asset.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground mt-1">View departments, employees, and assigned assets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map(dept => (
            <button
              key={dept.name}
              onClick={() => setSelectedDept(dept)}
              className="card-elevated p-6 text-left hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-3">{dept.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {dept.employees.length} employees
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" /> {dept.assets.length} assets
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
