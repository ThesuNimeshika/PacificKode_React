import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { api } from '../services/api';
import { Plus, Edit2, Trash2, Check, Users, X } from 'lucide-react';

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
        if (confirm('Are you sure you want to delete this personnel record?')) {
            await api.employees.delete(id);
            loadData();
        }
    };

    return (
        <div className="container-space animate-cinematic">
            <header className="flex justify-between items-end mb-24 px-4">
                <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-6">
                        <Users className="text-blue-400" size={48} />
                        Personnel
                    </h1>
                    <p className="text-cyan-500/40 font-black mt-4 tracking-[0.4em] uppercase text-[10px]">Intelligence Matrix</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => { setIsEditing(true); setCurrentEmp({ dateOfBirth: '', age: 0 }); }}
                        className="glass-button"
                    >
                        <Plus size={20} /> Deploy Official
                    </button>
                )}
            </header>

            {isEditing && (
                <div className="mb-24">
                    <GlassCard title={currentEmp.employeeId ? 'Reconfigure Official' : 'Personnel Protocol Initialization'}>
                        <form onSubmit={handleSave} className="form-grid-2">
                            <div className="flex flex-col">
                                <label className="label-elegant">First Identity</label>
                                <input required className="glass-input" value={currentEmp.firstName || ''} onChange={e => setCurrentEmp({ ...currentEmp, firstName: e.target.value })} />
                            </div>
                            <div className="flex flex-col">
                                <label className="label-elegant">Last Identity</label>
                                <input required className="glass-input" value={currentEmp.lastName || ''} onChange={e => setCurrentEmp({ ...currentEmp, lastName: e.target.value })} />
                            </div>
                            <div className="flex flex-col">
                                <label className="label-elegant">Communication Link</label>
                                <input required type="email" className="glass-input" value={currentEmp.emailAddress || ''} onChange={e => setCurrentEmp({ ...currentEmp, emailAddress: e.target.value })} />
                            </div>
                            <div className="flex flex-col">
                                <label className="label-elegant">Maturity Origin (DOB)</label>
                                <input required type="date" className="glass-input" value={currentEmp.dateOfBirth?.split('T')[0] || ''} onChange={handleDOBChange} />
                            </div>
                            <div className="flex flex-col">
                                <label className="label-elegant">Computed Cycle (Age)</label>
                                <input readOnly className="glass-input bg-cyan-900/10 opacity-60 text-cyan-300 font-mono" value={currentEmp.age || 0} />
                            </div>
                            <div className="flex flex-col">
                                <label className="label-elegant">Resource Valuation (USD)</label>
                                <input required type="number" className="glass-input" value={currentEmp.salary || ''} onChange={e => setCurrentEmp({ ...currentEmp, salary: Number(e.target.value) })} />
                            </div>
                            <div className="flex flex-col col-span-2">
                                <label className="label-elegant">Matrix Terminal Assignment</label>
                                <select
                                    required
                                    className="glass-input"
                                    value={currentEmp.departmentId || ''}
                                    onChange={e => setCurrentEmp({ ...currentEmp, departmentId: Number(e.target.value) })}
                                    style={{ backgroundColor: '#020617' }}
                                >
                                    <option value="">Awaiting Vector...</option>
                                    {departments.map(d => <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>)}
                                </select>
                            </div>
                            <div className="col-span-2 flex justify-end gap-10 mt-10">
                                <button type="button" onClick={() => setIsEditing(false)} className="glass-button-abort">
                                    <X size={20} /> Abort
                                </button>
                                <button type="submit" className="glass-button">
                                    <Check size={20} /> Execute Sequence
                                </button>
                            </div>
                        </form>
                    </GlassCard>
                </div>
            )}

            <GlassCard title="Global Personnel Registry">
                <div className="glass-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Official Identity</th>
                                <th>Channel</th>
                                <th>Assignment</th>
                                <th>Valuation</th>
                                <th>Cycle</th>
                                <th className="text-right">Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.employeeId} className="group">
                                    <td>
                                        <div className="font-bold text-white text-2xl tracking-tight">{emp.firstName} {emp.lastName}</div>
                                        <div className="text-[9px] text-cyan-500/30 uppercase tracking-[0.4em] font-black mt-2">ID: #SYS-{emp.employeeId.toString().padStart(4, '0')}</div>
                                    </td>
                                    <td className="text-blue-300/60 font-bold text-base">{emp.emailAddress}</td>
                                    <td>
                                        <span className="px-4 py-1 rounded-2xl bg-blue-500/10 text-blue-400 text-[10px] font-black border border-blue-500/20 uppercase tracking-widest">
                                            {emp.departmentName}
                                        </span>
                                    </td>
                                    <td className="font-mono text-cyan-300 text-xl font-bold">${emp.salary.toLocaleString()}</td>
                                    <td className="text-white/30 font-black text-lg">{emp.age}Y</td>
                                    <td className="text-right">
                                        <div className="flex justify-end gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                                            <button onClick={() => { setCurrentEmp(emp); setIsEditing(true); }} className="p-3 hover:bg-blue-500/20 rounded-2xl text-blue-400 transition-all"><Edit2 size={20} /></button>
                                            <button onClick={() => handleDelete(emp.employeeId)} className="p-3 hover:bg-red-500/20 rounded-2xl text-red-400 transition-all"><Trash2 size={20} /></button>
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
