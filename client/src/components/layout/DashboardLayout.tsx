import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 min-h-screen">
          <header className="sticky top-0 z-40 h-14 flex items-center gap-4 px-6 border-b border-border/50 backdrop-blur-xl bg-background/70">
            <SidebarTrigger>
              <Menu className="w-5 h-5" />
            </SidebarTrigger>
          </header>
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
