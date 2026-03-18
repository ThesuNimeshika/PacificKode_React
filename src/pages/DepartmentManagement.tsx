import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { api } from '../services/api';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

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
        <div className="max-w-6xl mx-auto p-6">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                        Departments
                    </h1>
                    <p className="text-gray-400 mt-2">Manage organizational structure</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => { setIsEditing(true); setCurrentDept({}); }}
                        className="glass-button flex items-center gap-2"
                    >
                        <Plus size={20} /> Add Department
                    </button>
                )}
            </header>

            {isEditing && (
                <GlassCard title={currentDept.departmentId ? 'Edit Department' : 'New Department'}>
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">Department Code</label>
                            <input
                                required
                                className="glass-input"
                                placeholder="e.g. IT, HR"
                                value={currentDept.departmentCode || ''}
                                onChange={e => setCurrentDept({ ...currentDept, departmentCode: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400">Department Name</label>
                            <input
                                required
                                className="glass-input"
                                placeholder="e.g. Information Technology"
                                value={currentDept.departmentName || ''}
                                onChange={e => setCurrentDept({ ...currentDept, departmentName: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 rounded-xl text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="glass-button flex items-center gap-2">
                                <Check size={18} /> Save Changes
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
                                <th>Code</th>
                                <th>Department Name</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((dept) => (
                                <tr key={dept.departmentId} className="group">
                                    <td className="font-mono text-indigo-300">{dept.departmentCode}</td>
                                    <td className="font-medium">{dept.departmentName}</td>
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setCurrentDept(dept); setIsEditing(true); }}
                                                className="p-2 hover:bg-white/10 rounded-lg text-indigo-400 transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(dept.departmentId)}
                                                className="p-2 hover:bg-white/10 rounded-lg text-pink-400 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {departments.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center py-10 text-gray-500">
                                        No departments found. Add one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};

export default DepartmentManagement;
