import { User, Asset, AssetAssignment, DashboardStats } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@company.com',
    name: 'John Administrator',
    role: 'admin',
    department: 'IT Department',
    phone: '+1 555-0100',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'sarah.johnson@company.com',
    name: 'Sarah Johnson',
    role: 'employee',
    department: 'Marketing',
    phone: '+1 555-0101',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    email: 'mike.chen@company.com',
    name: 'Mike Chen',
    role: 'employee',
    department: 'Engineering',
    phone: '+1 555-0102',
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: '4',
    email: 'emily.davis@company.com',
    name: 'Emily Davis',
    role: 'employee',
    department: 'Human Resources',
    phone: '+1 555-0103',
    isActive: true,
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
  },
  {
    id: '5',
    email: 'james.wilson@company.com',
    name: 'James Wilson',
    role: 'admin',
    department: 'IT Department',
    phone: '+1 555-0104',
    isActive: true,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '6',
    email: 'employee@company.com',
    name: 'Demo Employee',
    role: 'employee',
    department: 'Sales',
    phone: '+1 555-0105',
    isActive: true,
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
];

// Mock Assets
export const mockAssets: Asset[] = [
  {
    id: 'AST-001',
    name: 'MacBook Pro 16"',
    category: 'laptop',
    serialNumber: 'MBP-2024-001',
    condition: 'excellent',
    status: 'assigned',
    purchaseDate: '2024-01-10',
    purchasePrice: 2499,
    warrantyExpiry: '2027-01-10',
    notes: 'M3 Pro chip, 18GB RAM, 512GB SSD',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'AST-002',
    name: 'Dell XPS 15',
    category: 'laptop',
    serialNumber: 'DELL-XPS-002',
    condition: 'good',
    status: 'assigned',
    purchaseDate: '2023-06-15',
    purchasePrice: 1899,
    warrantyExpiry: '2026-06-15',
    notes: 'Intel i7, 32GB RAM, 1TB SSD',
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2023-06-15T00:00:00Z',
  },
  {
    id: 'AST-003',
    name: 'LG UltraWide 34"',
    category: 'monitor',
    serialNumber: 'LG-UW-003',
    condition: 'excellent',
    status: 'available',
    purchaseDate: '2024-02-20',
    purchasePrice: 799,
    warrantyExpiry: '2027-02-20',
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z',
  },
  {
    id: 'AST-004',
    name: 'iPhone 15 Pro',
    category: 'phone',
    serialNumber: 'AAPL-IP15-004',
    condition: 'excellent',
    status: 'assigned',
    purchaseDate: '2024-03-01',
    purchasePrice: 1199,
    warrantyExpiry: '2026-03-01',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'AST-005',
    name: 'Logitech MX Master 3S',
    category: 'mouse',
    serialNumber: 'LOG-MXM-005',
    condition: 'good',
    status: 'available',
    purchaseDate: '2023-09-10',
    purchasePrice: 99,
    createdAt: '2023-09-10T00:00:00Z',
    updatedAt: '2023-09-10T00:00:00Z',
  },
  {
    id: 'AST-006',
    name: 'HP LaserJet Pro',
    category: 'printer',
    serialNumber: 'HP-LJ-006',
    condition: 'fair',
    status: 'maintenance',
    purchaseDate: '2022-05-15',
    purchasePrice: 449,
    notes: 'Needs toner replacement',
    createdAt: '2022-05-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'AST-007',
    name: 'iPad Pro 12.9"',
    category: 'tablet',
    serialNumber: 'AAPL-IPD-007',
    condition: 'excellent',
    status: 'assigned',
    purchaseDate: '2024-01-05',
    purchasePrice: 1299,
    warrantyExpiry: '2026-01-05',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 'AST-008',
    name: 'Dell Optiplex 7090',
    category: 'desktop',
    serialNumber: 'DELL-OPT-008',
    condition: 'good',
    status: 'available',
    purchaseDate: '2023-08-20',
    purchasePrice: 1299,
    warrantyExpiry: '2026-08-20',
    notes: 'Intel i7, 16GB RAM, 512GB SSD',
    createdAt: '2023-08-20T00:00:00Z',
    updatedAt: '2023-08-20T00:00:00Z',
  },
  {
    id: 'AST-009',
    name: 'Keychron K2 Pro',
    category: 'keyboard',
    serialNumber: 'KEY-K2P-009',
    condition: 'excellent',
    status: 'available',
    purchaseDate: '2024-02-01',
    purchasePrice: 109,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'AST-010',
    name: 'ThinkPad X1 Carbon',
    category: 'laptop',
    serialNumber: 'LEN-X1C-010',
    condition: 'poor',
    status: 'retired',
    purchaseDate: '2020-03-15',
    purchasePrice: 1599,
    notes: 'End of life - battery issues',
    createdAt: '2020-03-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
];

// Mock Assignments
export const mockAssignments: AssetAssignment[] = [
  {
    id: 'ASGN-001',
    assetId: 'AST-001',
    userId: '2',
    assignedAt: '2024-01-15T10:00:00Z',
    notes: 'Primary work laptop',
  },
  {
    id: 'ASGN-002',
    assetId: 'AST-002',
    userId: '3',
    assignedAt: '2023-07-01T09:00:00Z',
    notes: 'Development workstation',
  },
  {
    id: 'ASGN-003',
    assetId: 'AST-004',
    userId: '4',
    assignedAt: '2024-03-05T14:00:00Z',
    notes: 'Business phone',
  },
  {
    id: 'ASGN-004',
    assetId: 'AST-007',
    userId: '6',
    assignedAt: '2024-01-10T11:00:00Z',
    notes: 'For client presentations',
  },
];

// Assignment History (including returned items)
export const mockAssignmentHistory: AssetAssignment[] = [
  ...mockAssignments,
  {
    id: 'ASGN-H001',
    assetId: 'AST-003',
    userId: '2',
    assignedAt: '2023-06-01T10:00:00Z',
    returnedAt: '2024-01-01T10:00:00Z',
    notes: 'Returned - upgraded to dual monitors',
  },
  {
    id: 'ASGN-H002',
    assetId: 'AST-010',
    userId: '3',
    assignedAt: '2020-04-01T09:00:00Z',
    returnedAt: '2023-06-30T17:00:00Z',
    notes: 'Returned - laptop retired',
  },
];

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalAssets: mockAssets.length,
  assignedAssets: mockAssets.filter(a => a.status === 'assigned').length,
  availableAssets: mockAssets.filter(a => a.status === 'available').length,
  totalUsers: mockUsers.length,
  totalEmployees: mockUsers.filter(u => u.role === 'employee').length,
  assetsInMaintenance: mockAssets.filter(a => a.status === 'maintenance').length,
};

// Helper function to get enriched assignments
export function getEnrichedAssignments(): AssetAssignment[] {
  return mockAssignments.map(assignment => ({
    ...assignment,
    asset: mockAssets.find(a => a.id === assignment.assetId),
    user: mockUsers.find(u => u.id === assignment.userId),
  }));
}

// Helper function to get user's assigned assets
export function getUserAssignedAssets(userId: string): Asset[] {
  const userAssignments = mockAssignments.filter(a => a.userId === userId && !a.returnedAt);
  return userAssignments
    .map(a => mockAssets.find(asset => asset.id === a.assetId))
    .filter((asset): asset is Asset => asset !== undefined);
}
