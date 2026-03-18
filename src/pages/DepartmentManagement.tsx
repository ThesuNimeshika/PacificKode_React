import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { api } from '../services/api';
import { Plus, Edit2, Trash2, Check, LayoutGrid } from 'lucide-react';

interface Department {
    departmentId: number;
    departmentCode: string;
    departmentName: string;
}

const DepartmentManagement: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDept, setCurrentDept] = useState<Partial<Department>>({});

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const data = await api.departments.getAll();
            setDepartments(data);
        } catch (error) {
            console.error('Failed to load departments', error);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentDept.departmentId) {
                await api.departments.update(currentDept.departmentId, currentDept);
            } else {
                await api.departments.create(currentDept);
            }
            setIsEditing(false);
            setCurrentDept({});
            loadDepartments();
        } catch (error) {
            alert('Error saving department');
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this department?')) {
            await api.departments.delete(id);
            loadDepartments();
        }
    };

    return (
        <div className="container-space animate-cinematic">
            <header className="flex justify-between items-end mb-16 px-4">
                <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-6">
                        <LayoutGrid className="text-cyan-400" size={48} />
                        Departments
                    </h1>
                    <p className="text-cyan-500/40 font-bold mt-4 tracking-[0.4em] uppercase text-[10px]">Structure Matrix</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => { setIsEditing(true); setCurrentDept({}); }}
                        className="glass-button"
                    >
                        <Plus size={20} /> Initialize Unit
                    </button>
                )}
            </header>

            {isEditing && (
                <div className="mb-24">
                    <GlassCard title={currentDept.departmentId ? 'Reconfigure Unit' : 'New Component Initialization'}>
                        <form onSubmit={handleSave} className="form-grid-2">
                            <div className="flex flex-col">
                                <label className="label-elegant">Component Code</label>
                                <input
                                    required
                                    className="glass-input"
                                    placeholder="ID-V01-ALPHA"
                                    value={currentDept.departmentCode || ''}
                                    onChange={e => setCurrentDept({ ...currentDept, departmentCode: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="label-elegant">Unit Designation</label>
                                <input
                                    required
                                    className="glass-input"
                                    placeholder="Strategic Operations"
                                    value={currentDept.departmentName || ''}
                                    onChange={e => setCurrentDept({ ...currentDept, departmentName: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2 flex justify-end gap-10 mt-10">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-10 py-3 rounded-xl text-gray-500 hover:text-white transition-all font-bold uppercase text-xs tracking-[0.2em]"
                                >
                                    Terminate
                                </button>
                                <button type="submit" className="glass-button">
                                    <Check size={20} /> Confirm Sequence
                                </button>
                            </div>
                        </form>
                    </GlassCard>
                </div>
            )}

            <GlassCard title="Active Departmental Matrix">
                <div className="glass-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Logical Reference</th>
                                <th>Matrix Designation</th>
                                <th className="text-right">Control Vector</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((dept) => (
                                <tr key={dept.departmentId} className="group">
                                    <td>
                                        <span className="font-mono text-cyan-400 bg-cyan-400/5 px-4 py-2 rounded-xl text-xs border border-cyan-400/20">
                                            {dept.departmentCode}
                                        </span>
                                    </td>
                                    <td className="font-bold text-xl text-white tracking-tight">{dept.departmentName}</td>
                                    <td className="text-right">
                                        <div className="flex justify-end gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                                            <button
                                                onClick={() => { setCurrentDept(dept); setIsEditing(true); }}
                                                className="p-3 hover:bg-blue-500/20 rounded-2xl text-blue-400 transition-all"
                                            >
                                                <Edit2 size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(dept.departmentId)}
                                                className="p-3 hover:bg-red-500/20 rounded-2xl text-red-400 transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
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

export default DepartmentManagement;
