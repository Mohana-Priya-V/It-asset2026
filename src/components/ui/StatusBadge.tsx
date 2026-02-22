import { AssetStatus, AssetCondition, AssetCategory } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: AssetStatus;
}

const statusStyles: Record<AssetStatus, string> = {
  available: 'badge-available',
  assigned: 'badge-assigned',
  maintenance: 'badge-maintenance',
  retired: 'badge-retired',
};

const statusLabels: Record<AssetStatus, string> = {
  available: 'Available',
  assigned: 'Assigned',
  maintenance: 'Maintenance',
  retired: 'Retired',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={statusStyles[status]}>
      {statusLabels[status]}
    </span>
  );
}

interface ConditionBadgeProps {
  condition: AssetCondition;
}

const conditionStyles: Record<AssetCondition, string> = {
  excellent: 'badge-status bg-success/15 text-success',
  good: 'badge-status bg-primary/15 text-primary',
  fair: 'badge-status bg-warning/15 text-warning',
  poor: 'badge-status bg-destructive/15 text-destructive',
};

export function ConditionBadge({ condition }: ConditionBadgeProps) {
  return (
    <span className={conditionStyles[condition]}>
      {condition.charAt(0).toUpperCase() + condition.slice(1)}
    </span>
  );
}

interface RoleBadgeProps {
  role: 'admin' | 'employee';
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span className={cn(
      'badge-status',
      role === 'admin' 
        ? 'bg-primary/15 text-primary' 
        : 'bg-secondary text-secondary-foreground'
    )}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
}

interface CategoryBadgeProps {
  category: AssetCategory;
}

const categoryIcons: Record<AssetCategory, string> = {
  laptop: '💻',
  desktop: '🖥️',
  monitor: '🖥️',
  keyboard: '⌨️',
  mouse: '🖱️',
  phone: '📱',
  tablet: '📱',
  printer: '🖨️',
  other: '📦',
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="badge-status bg-muted text-foreground">
      <span className="mr-1">{categoryIcons[category]}</span>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
}
