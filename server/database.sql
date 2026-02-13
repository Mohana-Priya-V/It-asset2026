-- Asset Angel Database Schema

CREATE DATABASE IF NOT EXISTS asset_angel;
USE asset_angel;

-- Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role ENUM('admin', 'employee') DEFAULT 'employee',
  department_id INT,
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (email),
  INDEX (role)
);

-- Departments Table
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  head_id INT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (head_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Add foreign key to users table
ALTER TABLE users ADD CONSTRAINT fk_users_department 
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL;

-- Assets Table
CREATE TABLE assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asset_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  purchase_date DATE,
  purchase_cost DECIMAL(10, 2),
  warranty_end_date DATE,
  status ENUM('available', 'assigned', 'maintenance', 'retired', 'damaged') DEFAULT 'available',
  location VARCHAR(255),
  assigned_to INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  INDEX (asset_code),
  INDEX (status),
  INDEX (assigned_to)
);

-- Asset Assignments Table
CREATE TABLE asset_assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asset_id INT NOT NULL,
  user_id INT NOT NULL,
  assigned_date DATE NOT NULL,
  returned_date DATE,
  purpose VARCHAR(255),
  status ENUM('active', 'returned', 'pending') DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (asset_id),
  INDEX (user_id),
  INDEX (status)
);

-- Repair Requests Table
CREATE TABLE repair_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asset_id INT NOT NULL,
  requested_by INT NOT NULL,
  issue_description TEXT NOT NULL,
  priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
  status ENUM('open', 'in_progress', 'completed', 'cancelled') DEFAULT 'open',
  assigned_to INT,
  estimated_cost DECIMAL(10, 2),
  actual_cost DECIMAL(10, 2),
  started_date DATETIME,
  completed_date DATETIME,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
  FOREIGN KEY (requested_by) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  INDEX (asset_id),
  INDEX (status),
  INDEX (priority)
);

-- Maintenance Logs Table
CREATE TABLE maintenance_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asset_id INT NOT NULL,
  maintenance_type VARCHAR(100),
  description TEXT,
  performed_by INT,
  maintenance_date DATE NOT NULL,
  cost DECIMAL(10, 2),
  next_maintenance_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
  FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX (asset_id),
  INDEX (maintenance_date)
);

-- Audit Logs Table
CREATE TABLE audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id INT,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX (user_id),
  INDEX (entity_type),
  INDEX (created_at)
);

-- Insert sample data
INSERT INTO departments (name, description) VALUES
('IT', 'Information Technology Department'),
('HR', 'Human Resources Department'),
('Finance', 'Finance Department'),
('Operations', 'Operations Department');

INSERT INTO users (email, password, first_name, last_name, role, department_id) VALUES
('admin@assetangel.com', 'hashed_password_123', 'Admin', 'User', 'admin', 1),
('emp1@assetangel.com', 'hashed_password_456', 'John', 'Doe', 'employee', 1),
('emp2@assetangel.com', 'hashed_password_789', 'Jane', 'Smith', 'employee', 2),
('emp3@assetangel.com', 'hashed_password_012', 'Bob', 'Johnson', 'employee', 3);

INSERT INTO assets (asset_code, name, category, description, purchase_date, purchase_cost, status) VALUES
('ASSET-001', 'Dell Laptop', 'Computer', 'Dell XPS 13 Laptop', '2023-01-15', 1200.00, 'assigned'),
('ASSET-002', 'HP Printer', 'Printer', 'HP LaserJet Pro Printer', '2023-02-20', 400.00, 'available'),
('ASSET-003', 'Desk Monitor', 'Monitor', '27-inch Dell Monitor', '2023-03-10', 350.00, 'assigned'),
('ASSET-004', 'Wireless Mouse', 'Accessory', 'Logitech Wireless Mouse', '2023-04-05', 30.00, 'available'),
('ASSET-005', 'USB-C Hub', 'Accessory', 'Multi-port USB-C Hub', '2023-05-12', 50.00, 'maintenance');
