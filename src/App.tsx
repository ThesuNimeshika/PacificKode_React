import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import DepartmentManagement from './pages/DepartmentManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import { Users, LayoutGrid, Database } from 'lucide-react';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="glass-panel mx-6 mt-6 px-10 py-4 flex items-center justify-between sticky top-6 z-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Database className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              PACIFIC<span className="text-indigo-400">KODE</span>
            </span>
          </div>

          <div className="flex gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium transition-all ${isActive ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`
              }
            >
              <LayoutGrid size={18} /> Departments
            </NavLink>
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium transition-all ${isActive ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`
              }
            >
              <Users size={18} /> Employees
            </NavLink>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 py-10">
          <Routes>
            <Route path="/" element={<DepartmentManagement />} />
            <Route path="/employees" element={<EmployeeManagement />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="p-8 text-center text-gray-500 text-sm">
          &copy; 2026 PacificKode Systems. Designed with Elegant Glassmorphism.
        </footer>
      </div>
    </Router>
  );
};

export default App;
