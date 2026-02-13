# 🚀 Complete IT Asset Management System with Issue Tracking

## 📌 Overview

The **IT Asset Management System** is a Full-Stack Web Application designed to manage organizational IT assets, user roles, assignments, and repair workflows.

This system provides secure authentication, role-based access control, asset lifecycle tracking, and issue management.

---

## 🛠 Technology Stack

- **Frontend:** React.js  
- **Backend:** Python Flask  
- **Database:** MySQL  
- **Authentication:** JWT (JSON Web Tokens)  
- **Security:** Password Hashing (bcrypt / werkzeug)

---

## 🎯 Features

### 👥 User Management (Admin)

- Create / Update Users  
- Role Assignment (Admin / Employee)  
- Activate / Deactivate Users  
- Password Reset  

---

### 💻 Asset Management (Admin)

- Full CRUD Operations  
- Unique Serial Number Validation  
- Asset Condition Tracking  
- Asset Status Lifecycle  

**Asset States:**

Available → Assigned → Maintenance

---

### 🔄 Asset Assignment

- Assign / Return Assets  
- Prevent Duplicate Assignments  
- Automatic Status Updates  
- Assignment History Tracking  

---

### 🏢 Department Module

- Department-Wise Asset Visibility  
- Employee Listing per Department  
- Filtering & Reporting  

---

### 🛠 Repair / Issue Requests

### Employee Capabilities

- View Assigned Assets  
- Report Issues  
- Track Request Status  
- View Admin Remarks  

### Admin Capabilities

- View All Requests  
- Update Status  
- Add Remarks  
- Department-Based Filtering  

---

## 🔁 Issue Workflow

- 🟡 Pending  
- 🔵 In Progress  
- 🟢 Resolved  
- 🔴 Rejected (Optional)

---

## 🔐 Security Implementation

✔ Email-Based Login  
✔ Hashed Password Storage  
✔ JWT Authentication  
✔ Role-Based Access Control (RBAC)  
✔ Protected API Routes  

---

## 🗄 Database Structure (MySQL)

**Core Tables**

- roles  
- users  
- assets  
- assignments  
- assignment_history  
- repair_requests  

**Constraints**

✔ Foreign Keys  
✔ Unique Constraints  
✔ ENUM Fields  
✔ NOT NULL Integrity  

---

## ⚙ System Architecture

Client → Server → Database

React.js → REST APIs → Flask → MySQL

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository



```bash
git clone <repository_url>
cd project_folder

cd backend
pip install -r requirements.txt

JWT_SECRET_KEY=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=asset_management
python app.py


