import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import AssetManagement from "./pages/admin/AssetManagement";
import AssignmentManagement from "./pages/admin/AssignmentManagement";
import Departments from "./pages/admin/Departments";
import RepairRequests from "./pages/admin/RepairRequests";

// Employee Pages
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeAssets from "./pages/employee/MyAssets";
import EmployeeProfile from "./pages/employee/Profile";
import ReportIssue from "./pages/employee/ReportIssue";
import MyRequests from "./pages/employee/MyRequests";

const queryClient = new QueryClient();

function RootRedirect() {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Navigate to={user?.role === 'admin' ? '/admin' : '/employee'} replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Root redirect based on role */}
      <Route path="/" element={<RootRedirect />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
      <Route path="/admin/assets" element={<ProtectedRoute allowedRoles={['admin']}><AssetManagement /></ProtectedRoute>} />
      <Route path="/admin/assignments" element={<ProtectedRoute allowedRoles={['admin']}><AssignmentManagement /></ProtectedRoute>} />
      <Route path="/admin/departments" element={<ProtectedRoute allowedRoles={['admin']}><Departments /></ProtectedRoute>} />
      <Route path="/admin/repair-requests" element={<ProtectedRoute allowedRoles={['admin']}><RepairRequests /></ProtectedRoute>} />
      
      {/* Employee Routes */}
      <Route path="/employee" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeDashboard /></ProtectedRoute>} />
      <Route path="/employee/assets" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeAssets /></ProtectedRoute>} />
      <Route path="/employee/report-issue" element={<ProtectedRoute allowedRoles={['employee']}><ReportIssue /></ProtectedRoute>} />
      <Route path="/employee/my-requests" element={<ProtectedRoute allowedRoles={['employee']}><MyRequests /></ProtectedRoute>} />
      <Route path="/employee/profile" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeProfile /></ProtectedRoute>} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
