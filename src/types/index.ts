// User Types
export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Asset Types
export type AssetStatus = 'available' | 'assigned' | 'maintenance' | 'retired';
export type AssetCondition = 'excellent' | 'good' | 'fair' | 'poor';
export type AssetCategory = 'laptop' | 'desktop' | 'monitor' | 'keyboard' | 'mouse' | 'phone' | 'tablet' | 'printer' | 'other';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  serialNumber: string;
  condition: AssetCondition;
  status: AssetStatus;
  purchaseDate: string;
  purchasePrice: number;
  warrantyExpiry?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Assignment Types
export interface AssetAssignment {
  id: string;
  assetId: string;
  userId: string;
  assignedAt: string;
  returnedAt?: string;
  notes?: string;
  asset?: Asset;
  user?: User;
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Repair Request Types
export type IssueType = 'damaged' | 'not_working' | 'software_issue' | 'hardware_issue' | 'other';
export type IssuePriority = 'low' | 'medium' | 'high';
export type IssueStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';

export interface RepairRequest {
  id: string;
  assetId: string;
  userId: string;
  issueType: IssueType;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  adminRemarks?: string;
  createdAt: string;
  updatedAt: string;
  asset?: Asset;
  user?: User;
}

// Department Types
export interface Department {
  name: string;
  employees: User[];
  assets: Asset[];
}

// Stats Types
export interface DashboardStats {
  totalAssets: number;
  assignedAssets: number;
  availableAssets: number;
  totalUsers: number;
  totalEmployees: number;
  assetsInMaintenance: number;
  pendingRepairRequests: number;
}
