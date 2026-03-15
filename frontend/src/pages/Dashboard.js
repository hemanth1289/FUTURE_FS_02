import React from 'react';
import './Dashboard.css';

const STATUS_CONFIG = {
  New: { color: 'var(--accent)', glow: 'var(--accent-glow)', icon: '◉' },
  Contacted: { color: 'var(--amber)', glow: 'var(--amber-glow)', icon: '◈' },
  Converted: { color: 'var(--green)', glow: 'var(--green-glow)', icon: '◆' },
};

const SOURCE_ICONS = {
  Website: '🌐', Referral: '🤝', 'Social Media': '📱',
  'Email Campaign': '📧', 'Cold Call': '📞', Other: '◎',
};

export default function Dashboard({ leads, loading, onNavigate }) {
  const counts = {
    total: leads.length,
    New: leads.filter((l) => l.status === 'New').length,
    Contacted: leads.filter((l) => l.status === 'Contacted').length,
    Converted: leads.filter((l) => l.status === 'Converted').length,
  };

  const conversionRate = counts.total
    ? Math.round((counts.Converted / counts.total) * 100)
    : 0;

  const sourceBreakdown = leads.reduce((acc, l) => {
    acc[l.source] = (acc[l.source] || 0) + 1;
    return acc;
  }, {});

  const recentLeads = [...leads].slice(0, 5);

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">Your lead pipeline at a glance</p>
        </div>
        <button className="btn-primary" onClick={() => onNavigate('add')}>
          + Add New Lead
        </button>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-label">Total Leads</div>
          <div className="stat-value">{loading ? '—' : counts.total}</div>
          <div className="stat-bar" style={{ background: 'var(--border)' }} />
        </div>
        {['New', 'Contacted', 'Converted'].map((status) => (
          <div
            key={status}
            className="stat-card"
            style={{ '--card-color': STATUS_CONFIG[status].color, '--card-glow': STATUS_CONFIG[status].glow }}
          >
            <div className="stat-label">{status}</div>
            <div className="stat-value" style={{ color: STATUS_CONFIG[status].color }}>
              {loading ? '—' : counts[status]}
            </div>
            <div
              className="stat-bar"
              style={{
                background: STATUS_CONFIG[status].color,
                width: counts.total ? `${(counts[status] / counts.total) * 100}%` : '0%',
                opacity: 0.6,
              }}
            />
          </div>
        ))}
      </div>

      <div className="dashboard-row">
        {/* Conversion rate */}
        <div className="card conversion-card">
          <h3 className="card-title">Conversion Rate</h3>
          <div className="conversion-ring-wrap">
            <svg viewBox="0 0 120 120" className="conversion-ring">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke="var(--green)"
                strokeWidth="10"
                strokeDasharray={`${conversionRate * 3.14} 314`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                style={{ filter: 'drop-shadow(0 0 8px var(--green))' }}
              />
            </svg>
            <div className="conversion-label">
              <span className="conversion-pct">{conversionRate}%</span>
              <span className="conversion-sub">converted</span>
            </div>
          </div>
        </div>

        {/* Source breakdown */}
        <div className="card sources-card">
          <h3 className="card-title">Lead Sources</h3>
          {Object.keys(sourceBreakdown).length === 0 ? (
            <p className="empty-text">No data yet</p>
          ) : (
            <div className="sources-list">
              {Object.entries(sourceBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([src, cnt]) => (
                  <div key={src} className="source-row">
                    <span className="source-icon">{SOURCE_ICONS[src] || '◎'}</span>
                    <span className="source-name">{src}</span>
                    <div className="source-bar-wrap">
                      <div
                        className="source-bar"
                        style={{ width: `${(cnt / counts.total) * 100}%` }}
                      />
                    </div>
                    <span className="source-count">{cnt}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Leads */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Leads</h3>
          <button className="btn-link" onClick={() => onNavigate('leads')}>
            View all →
          </button>
        </div>
        {loading ? (
          <div className="loading-shimmer-list">
            {[1, 2, 3].map((i) => <div key={i} className="shimmer-row" />)}
          </div>
        ) : recentLeads.length === 0 ? (
          <div className="empty-state">
            <p>No leads yet.</p>
            <button className="btn-primary" onClick={() => onNavigate('add')}>
              Add your first lead
            </button>
          </div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Source</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead._id}>
                  <td className="td-name">{lead.name}</td>
                  <td className="td-muted">{lead.email}</td>
                  <td className="td-muted">{lead.source}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        color: STATUS_CONFIG[lead.status]?.color,
                        background: STATUS_CONFIG[lead.status]?.glow,
                      }}
                    >
                      {STATUS_CONFIG[lead.status]?.icon} {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
