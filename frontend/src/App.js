import React, { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { getLeads, createLead, updateLead, deleteLead } from './api/leads';
import Dashboard from './pages/Dashboard';
import LeadList from './pages/LeadList';
import AddLeadForm from './pages/AddLeadForm';
import Sidebar from './components/Sidebar';
import './App.css';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLead, setEditingLead] = useState(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getLeads();
      setLeads(res.data.data);
    } catch {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleAddLead = async (formData) => {
    try {
      await createLead(formData);
      toast.success('Lead added successfully!');
      fetchLeads();
      setPage('leads');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add lead');
    }
  };

  const handleUpdateLead = async (id, data) => {
    try {
      await updateLead(id, data);
      toast.success('Lead updated!');
      fetchLeads();
      setEditingLead(null);
      setPage('leads');
    } catch {
      toast.error('Failed to update lead');
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await deleteLead(id);
      toast.success('Lead deleted');
      fetchLeads();
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setPage('add');
  };

  const handleNavigate = (p) => {
    if (p !== 'add') setEditingLead(null);
    setPage(p);
  };

  return (
    <div className="app-layout">
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: { background: '#1e2330', color: '#e8eaf0', border: '1px solid #2a3040' },
        }}
      />
      <Sidebar page={page} onNavigate={handleNavigate} leadsCount={leads.length} />
      <main className="app-main">
        {page === 'dashboard' && (
          <Dashboard leads={leads} loading={loading} onNavigate={handleNavigate} />
        )}
        {page === 'leads' && (
          <LeadList
            leads={leads}
            loading={loading}
            onDelete={handleDeleteLead}
            onEdit={handleEditLead}
            onUpdate={handleUpdateLead}
            onNavigate={handleNavigate}
          />
        )}
        {page === 'add' && (
          <AddLeadForm
            onSubmit={editingLead ? (d) => handleUpdateLead(editingLead._id, d) : handleAddLead}
            editingLead={editingLead}
            onCancel={() => handleNavigate('leads')}
          />
        )}
      </main>
    </div>
  );
}
