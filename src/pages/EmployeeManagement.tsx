import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { api } from '../services/api';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';

interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    dateOfBirth: string;
    age: number;
    salary: number;
    departmentId: number;
    departmentName: string;
}

const EmployeeManagement: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEmp, setCurrentEmp] = useState<Partial<Employee>>({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [empData, deptData] = await Promise.all([
                api.employees.getAll(),
                api.departments.getAll()
            ]);
            setEmployees(empData);
            setDepartments(deptData);
        } catch (error) {
            console.error('Failed to load data', error);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Basic formatting for salary if string
            const payload = {
                ...currentEmp,
                salary: Number(currentEmp.salary),
                departmentId: Number(currentEmp.departmentId)
            };

            if (currentEmp.employeeId) {
                await api.employees.update(currentEmp.employeeId, payload);
            } else {
                await api.employees.create(payload);
            }
            setIsEditing(false);
            setCurrentEmp({});
            loadData();
        } catch (error) {
            alert('Error saving employee');
        }
    };

    const calculateAge = (dob: string) => {
        if (!dob) return 0;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleDOBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dob = e.target.value;
        const age = calculateAge(dob);
        setCurrentEmp({ ...currentEmp, dateOfBirth: dob, age });
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            await api.employees.delete(id);
            loadData();
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                        Employees
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your workforce</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => { setIsEditing(true); setCurrentEmp({ dateOfBirth: '', age: 0 }); }}
                        className="glass-button flex items-center gap-2"
                    >
                        <Plus size={20} /> Add Employee
                    </button>
                )}
            </header>

            {isEditing && (
                <GlassCard title={currentEmp.employeeId ? 'Edit Employee' : 'New Employee'}>
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">First Name</label>
                            <input required className="glass-input" value={currentEmp.firstName || ''} onChange={e => setCurrentEmp({ ...currentEmp, firstName: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">Last Name</label>
                            <input required className="glass-input" value={currentEmp.lastName || ''} onChange={e => setCurrentEmp({ ...currentEmp, lastName: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">Email Address</label>
                            <input required type="email" className="glass-input" value={currentEmp.emailAddress || ''} onChange={e => setCurrentEmp({ ...currentEmp, emailAddress: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">Date of Birth</label>
                            <input required type="date" className="glass-input" value={currentEmp.dateOfBirth?.split('T')[0] || ''} onChange={handleDOBChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">Age (Auto-calculated)</label>
                            <input readOnly className="glass-input bg-white/5 opacity-50" value={currentEmp.age || 0} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">Salary</label>
                            <input required type="number" className="glass-input" value={currentEmp.salary || ''} onChange={e => setCurrentEmp({ ...currentEmp, salary: Number(e.target.value) })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">Department</label>
                            <select
                                required
                                className="glass-input"
                                value={currentEmp.departmentId || ''}
                                onChange={e => setCurrentEmp({ ...currentEmp, departmentId: Number(e.target.value) })}
                                style={{ backgroundColor: '#1e1b4b' }}
                            >
                                <option value="">Select Department</option>
                                {departments.map(d => <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>)}
                            </select>
                        </div>
                        <div className="lg:col-span-3 flex justify-end gap-3 mt-4">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-xl text-gray-300 hover:text-white">Cancel</button>
                            <button type="submit" className="glass-button flex items-center gap-2">
                                <Check size={18} /> Save Employee
                            </button>
                        </div>
                    </form>
                </GlassCard>
            )}

            <GlassCard>
                <div className="glass-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Age</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.employeeId} className="group">
                                    <td>
                                        <div className="font-medium text-white">{emp.firstName} {emp.lastName}</div>
                                        <div className="text-xs text-gray-500">Born: {new Date(emp.dateOfBirth).toLocaleDateString()}</div>
                                    </td>
                                    <td className="text-indigo-300">{emp.emailAddress}</td>
                                    <td>
                                        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20">
                                            {emp.departmentName}
                                        </span>
                                    </td>
                                    <td className="font-mono text-pink-300">${emp.salary.toLocaleString()}</td>
                                    <td>{emp.age}</td>
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setCurrentEmp(emp); setIsEditing(true); }} className="p-2 hover:bg-white/10 rounded-lg text-indigo-400"><Edit2 size={18} /></button>
                                            <button onClick={() => handleDelete(emp.employeeId)} className="p-2 hover:bg-white/10 rounded-lg text-pink-400"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};

export default EmployeeManagement;
