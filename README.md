# PacificKode React & .NET Management System

A modern, high-performance management system built with a **React (Vite)** frontend and a **.NET Core API** backend, utilizing **MariaDB** for data persistence.

---

## 🚀 Features

- **Department Management**: Create, view, update, and delete organizational departments.
- **Employee Management**: Manage personnel records with full CRUD functionality, linked to departments.
- **Real-time Validation**: Integrated form validation and error handling.
- **Modern UI**: Cinematic, glassmorphism-inspired design with smooth animations.
- **Manual Data Access**: Robust direct-connection pattern for database operations.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [MariaDB](https://mariadb.org/) or [XAMPP](https://www.apachefriends.org/) (for MySQL/MariaDB)

---

## ⚙️ Installation & Setup

### 1. Database Configuration
1. Start your MariaDB/MySQL server.
2. Create the database and tables using the provided script:
   ```bash
   mysql -u root -p < MariaDB.sql
   ```
   *(Note: The default setup expects a user `root` with no password. If you have a password, update it in `backend/Data/CONNECTION.cs`)*

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Run the backend:
   ```bash
   dotnet run
   ```
   *(The backend API will be available at `http://localhost:5128`)*

### 3. Frontend Setup
1. Open a new terminal and navigate to the root directory:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   *(The frontend will be available at `http://localhost:5173`)*

---

## 📖 User Manual

### Managing Departments
1. Navigate to the **Departments** section from the sidebar/main menu.
2. Click **Add Department** to create a new entry.
3. Use the **Edit** (pencil icon) to modify existing departments.
4. Use the **Delete** (trash icon) to remove a department (Warning: This will fail if employees are still assigned to it).

### Managing Employees
1. Navigate to the **Personnel** or **Employees** section.
2. Click **Add Employee** to register a new staff member.
3. Ensure you select a valid **Department** from the dropdown.
4. Personnel records display their age automatically calculated from their Date of Birth.

---

## 🗄️ Project Structure

- `/src`: React frontend (Vite, TypeScript, Tailwind CSS)
- `/backend`: .NET Core Web API
- `/backend/Data/CONNECTION.cs`: Centralized database connection logic.
- `/backend/Controllers`: API endpoints for Departments and Employees.
- `MariaDB.sql`: SQL script for database initialization.

---

## 🛠️ Troubleshooting

- **Port Conflict**: If port `5128` is occupied, you can change the `applicationUrl` in `backend/Properties/launchSettings.json`.
- **Database Connection**: Ensure your MariaDB service is running and the credentials in `backend/Data/CONNECTION.cs` match your local environment.
- **CORS Errors**: The backend is configured to allow requests from `http://localhost:5173`. If your frontend runs on a different port, update `backend/Program.cs`.

---

© 2026 PacificKode Systems. All rights reserved.
