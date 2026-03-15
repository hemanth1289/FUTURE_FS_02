import React, { useState } from 'react';
import './LeadList.css';

const STATUS_CONFIG = {
  New: { color: 'var(--accent)', glow: 'var(--accent-glow)', icon: '◉' },
  Contacted: { color: 'var(--amber)', glow: 'var(--amber-glow)', icon: '◈' },
  Converted: { color: 'var(--green)', glow: 'var(--green-glow)', icon: '◆' },
};

const STATUSES = ['New', 'Contacted', 'Converted'];

export default function LeadList({ leads, loading, onDelete, onEdit, onUpdate, onNavigate }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const filtered = leads
    .filter((l) => filter === 'All' || l.status === filter)
    .filter((l) =>
      [l.name, l.email, l.phone, l.source].some((f) =>
        f?.toLowerCase().includes(search.toLowerCase())
      )
    );

  const handleStatusChange = async (lead, newStatus) => {
    setUpdatingId(lead._id);
    await onUpdate(lead._id, { ...lead, status: newStatus });
    setUpdatingId(null);
  };

  return (
    <div className="lead-list-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Leads</h1>
          <p className="page-sub">{leads.length} total lead{leads.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn-primary" onClick={() => onNavigate('add')}>
          + Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="list-controls">
        <input
          className="search-input"
          placeholder="Search by name, email, phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-tabs">
          {['All', ...STATUSES].map((s) => (
            <button
              key={s}
              className={`filter-tab ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s}
              <span className="filter-count">
                {s === 'All' ? leads.length : leads.filter((l) => l.status === s).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-shimmer-list">
          {[1, 2, 3, 4].map((i) => <div key={i} className="shimmer-row" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">◌</div>
          <p>{search || filter !== 'All' ? 'No leads match your filters' : 'No leads yet'}</p>
          {!search && filter === 'All' && (
            <button className="btn-primary" onClick={() => onNavigate('add')}>
              Add your first lead
            </button>
          )}
        </div>
      ) : (
        <div className="leads-grid">
          {filtered.map((lead) => (
            <div key={lead._id} className="lead-card">
              <div className="lead-card-header">
                <div className="lead-avatar">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div className="lead-info">
                  <div className="lead-name">{lead.name}</div>
                  <div className="lead-email">{lead.email}</div>
                </div>
                <span
                  className="status-badge"
                  style={{
                    color: STATUS_CONFIG[lead.status]?.color,
                    background: STATUS_CONFIG[lead.status]?.glow,
                  }}
                >
                  {STATUS_CONFIG[lead.status]?.icon} {lead.status}
                </span>
              </div>

              <div className="lead-details">
                <div className="lead-detail">
                  <span className="detail-label">Phone</span>
                  <span className="detail-val">{lead.phone}</span>
                </div>
                <div className="lead-detail">
                  <span className="detail-label">Source</span>
                  <span className="detail-val">{lead.source}</span>
                </div>
                {lead.notes && (
                  <div className="lead-detail lead-notes">
                    <span className="detail-label">Notes</span>
                    <span className="detail-val notes-text">{lead.notes}</span>
                  </div>
                )}
              </div>

              {/* Status Updater */}
              <div className="status-updater">
                <span className="detail-label" style={{ fontSize: 11 }}>UPDATE STATUS</span>
                <div className="status-buttons">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      disabled={lead.status === s || updatingId === lead._id}
                      className={`status-btn ${lead.status === s ? 'status-btn-active' : ''}`}
                      style={lead.status === s ? {
                        color: STATUS_CONFIG[s].color,
                        borderColor: STATUS_CONFIG[s].color,
                        background: STATUS_CONFIG[s].glow,
                      } : {}}
                      onClick={() => handleStatusChange(lead, s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lead-actions">
                <button className="action-btn edit-btn" onClick={() => onEdit(lead)}>
                  Edit
                </button>
                <button className="action-btn delete-btn" onClick={() => onDelete(lead._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
