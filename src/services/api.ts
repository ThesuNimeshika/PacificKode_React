export const API_BASE_URL = 'http://localhost:5292/api'; // Update port if different

export const api = {
    departments: {
        getAll: () => fetch(`${API_BASE_URL}/department`).then(res => res.json()),
        getById: (id: number) => fetch(`${API_BASE_URL}/department/${id}`).then(res => res.json()),
        create: (data: any) => fetch(`${API_BASE_URL}/department`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }),
        update: (id: number, data: any) => fetch(`${API_BASE_URL}/department/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }),
        delete: (id: number) => fetch(`${API_BASE_URL}/department/${id}`, { method: 'DELETE' })
    },
    employees: {
        getAll: () => fetch(`${API_BASE_URL}/employee`).then(res => res.json()),
        getById: (id: number) => fetch(`${API_BASE_URL}/employee/${id}`).then(res => res.json()),
        create: (data: any) => fetch(`${API_BASE_URL}/employee`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }),
        update: (id: number, data: any) => fetch(`${API_BASE_URL}/employee/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }),
        delete: (id: number) => fetch(`${API_BASE_URL}/employee/${id}`, { method: 'DELETE' })
    }
};
