import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import DepartmentManagement from './pages/DepartmentManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import { Users, LayoutGrid, Rocket } from 'lucide-react';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="nav-glass">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.4)]">
              <Rocket className="text-white" size={28} />
            </div>
            <div>
              <span className="text-2xl font-black tracking-widest text-white block leading-none">
                PACIFIC<span className="text-cyan-400">KODE</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Systems Division</span>
            </div>
          </div>

          <div className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <LayoutGrid size={18} /> <span>Departments</span>
            </NavLink>
            <NavLink
              to="/employees"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Users size={18} /> <span>Employees</span>
            </NavLink>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1">
          <div className="animate-slide-up">
            <Routes>
              <Route path="/" element={<DepartmentManagement />} />
              <Route path="/employees" element={<EmployeeManagement />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-12 text-center">
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto mb-6"></div>
          <p className="text-gray-600 text-xs tracking-widest uppercase font-semibold">
            &copy; 2026 PacificKode Enterprise • Space Grade Interface
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
