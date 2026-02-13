import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

const iconVariantStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'from-primary to-accent text-primary-foreground',
  success: 'from-success to-success/70 text-success-foreground',
  warning: 'from-warning to-warning/70 text-warning-foreground',
};

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = 'default' 
}: StatCardProps) {
  return (
    <div className="glass-card-hover p-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-extrabold text-foreground mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              'text-sm mt-2 font-semibold',
              trend.isPositive ? 'text-success' : 'text-destructive'
            )}>
              {trend.isPositive ? '↑ ' : '↓ '}{Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center',
          variant === 'default' ? iconVariantStyles.default : 'bg-gradient-to-br ' + iconVariantStyles[variant]
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
