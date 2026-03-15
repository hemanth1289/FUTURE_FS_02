import React from 'react';
import './Sidebar.css';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬡' },
  { id: 'leads', label: 'All Leads', icon: '◈' },
  { id: 'add', label: 'Add Lead', icon: '⊕' },
];

export default function Sidebar({ page, onNavigate, leadsCount }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">CR</div>
        <div>
          <div className="brand-name">MiniCRM</div>
          <div className="brand-sub">Lead Manager</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${page === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.id === 'leads' && leadsCount > 0 && (
              <span className="nav-badge">{leadsCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="status-dot" />
        <span>API Connected</span>
      </div>
    </aside>
  );
}
