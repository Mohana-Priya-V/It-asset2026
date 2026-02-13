import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getPendingRepairCount } from '@/data/mockData';
import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardList,
  User,
  LogOut,
  Monitor,
  Building2,
  Wrench,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pendingCount = getPendingRepairCount();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/assets', icon: Package, label: 'Assets' },
    { to: '/admin/assignments', icon: ClipboardList, label: 'Assignments' },
    { to: '/admin/departments', icon: Building2, label: 'Departments' },
    { to: '/admin/repair-requests', icon: Wrench, label: 'Repairs', badge: pendingCount },
  ];

  const employeeLinks = [
    { to: '/employee', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/employee/assets', icon: Monitor, label: 'My Assets' },
    { to: '/employee/report-issue', icon: AlertTriangle, label: 'Report Issue' },
    { to: '/employee/my-requests', icon: ClipboardList, label: 'My Requests' },
    { to: '/employee/profile', icon: User, label: 'Profile' },
  ];

  const links = user?.role === 'admin' ? adminLinks : employeeLinks;

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="flex flex-col h-full bg-sidebar">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-glow"
              style={{ background: 'linear-gradient(135deg, hsl(var(--sidebar-primary)), hsl(var(--accent)))' }}>
              <Package className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h1 className="font-bold text-sidebar-foreground text-sm">IT Assets</h1>
                <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-wider">Management</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarContent className="px-3 py-4">
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className="text-sidebar-foreground/40 text-[10px] uppercase tracking-widest mb-2 px-3">
                Navigation
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {links.map(({ to, icon: Icon, label, end, ...rest }) => (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton asChild tooltip={label}>
                      <NavLink
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                          cn('sidebar-link', isActive && 'sidebar-link-active')
                        }
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-sm">{label}</span>
                            {'badge' in rest && (rest as any).badge > 0 && (
                              <span className="ml-auto text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, hsl(var(--destructive)), hsl(var(--warning)))' , color: 'white' }}>
                                {(rest as any).badge}
                              </span>
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Section */}
        <div className="mt-auto p-3 border-t border-sidebar-border">
          {!collapsed ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}>
                  <span className="text-sm font-bold text-primary-foreground">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-sidebar-foreground truncate">
                    {user?.name}
                  </p>
                  <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-wider">
                    {user?.role}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="sidebar-link w-full text-left hover:text-destructive group"
              >
                <LogOut className="w-5 h-5 group-hover:text-destructive" />
                <span className="text-sm">Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="sidebar-link w-full justify-center hover:text-destructive"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
