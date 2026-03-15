import React, { useState, useEffect } from 'react';
import './AddLeadForm.css';

const SOURCES = ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call', 'Other'];
const STATUSES = ['New', 'Contacted', 'Converted'];

const empty = { name: '', email: '', phone: '', source: 'Website', status: 'New', notes: '' };

export default function AddLeadForm({ onSubmit, editingLead, onCancel }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingLead) {
      setForm({
        name: editingLead.name || '',
        email: editingLead.email || '',
        phone: editingLead.phone || '',
        source: editingLead.source || 'Website',
        status: editingLead.status || 'New',
        notes: editingLead.notes || '',
      });
    } else {
      setForm(empty);
    }
    setErrors({});
  }, [editingLead]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    await onSubmit(form);
    setSubmitting(false);
    if (!editingLead) setForm(empty);
  };

  return (
    <div className="form-page">
      <div className="form-header">
        <div>
          <h1 className="page-title">{editingLead ? 'Edit Lead' : 'Add New Lead'}</h1>
          <p className="page-sub">{editingLead ? `Editing ${editingLead.name}` : 'Fill in the details to add a new lead'}</p>
        </div>
        <button className="btn-ghost" onClick={onCancel}>← Back</button>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-section">
            <div className="section-label">Contact Information</div>
            <div className="form-grid">
              <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
                <label>Full Name <span className="req">*</span></label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Johnson"
                  autoComplete="off"
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
                <label>Email Address <span className="req">*</span></label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. sarah@company.com"
                  autoComplete="off"
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className={`form-field ${errors.phone ? 'has-error' : ''}`}>
                <label>Phone Number <span className="req">*</span></label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. +1 (555) 000-0000"
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-label">Lead Details</div>
            <div className="form-grid">
              <div className="form-field">
                <label>Lead Source</label>
                <select name="source" value={form.source} onChange={handleChange}>
                  {SOURCES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-field">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-label">Additional Notes</div>
            <div className="form-field">
              <label>Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any relevant details about this lead…"
                rows={4}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Saving…' : editingLead ? 'Save Changes' : 'Add Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
