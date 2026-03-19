import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

let toastCount = 0;
let addToastHandler: (message: string, type: ToastType) => void;

export const showToast = (message: string, type: ToastType = 'info') => {
    if (addToastHandler) {
        addToastHandler(message, type);
    }
};

const Notification: React.FC = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType) => {
        const id = ++toastCount;
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    }, []);

    useEffect(() => {
        addToastHandler = addToast;
    }, [addToast]);

    return (
        <div className="glass-toast-container">
            {toasts.map(toast => (
                <div key={toast.id} className={`glass-toast ${toast.type}`}>
                    {toast.type === 'success' && <CheckCircle size={20} className="text-emerald-400" />}
                    {toast.type === 'error' && <AlertCircle size={20} className="text-red-400" />}
                    {toast.type === 'info' && <Info size={20} className="text-blue-400" />}
                    <span className="font-medium tracking-tight flex-1">{toast.message}</span>
                    <button
                        onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                        className="opacity-40 hover:opacity-100 transition-all"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Notification;
