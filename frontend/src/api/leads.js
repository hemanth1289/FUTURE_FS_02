import axios from 'axios';

const api = axios.create({
  baseURL: '/leads',
  headers: { 'Content-Type': 'application/json' },
});

export const getLeads = () => api.get('/');
export const createLead = (data) => api.post('/', data);
export const updateLead = (id, data) => api.put(`/${id}`, data);
export const deleteLead = (id) => api.delete(`/${id}`);
