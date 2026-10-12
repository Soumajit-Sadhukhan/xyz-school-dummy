import React, { useState, useEffect } from 'react';
import { Save, Settings, Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminSettings = () => {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    schoolName: '',
    phone: '',
    admissionsHotline: '',
    email: '',
    admissionsEmail: '',
    address: '',
    workingHours: '',
    affiliationNo: '',
  });

  useEffect(() => {
    const loadSettings = async () => {
      const data = await api.getSettings();
      setForm(data);
    };
    loadSettings();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await api.saveSettings(form);
    addToast('Institutional settings updated.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-display">
            Website &amp; Institutional Settings
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Configure contact coordinates, admissions helplines, campus address, and affiliation metadata.
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <div className="bg-white p-8 rounded-3xl border border-brand-border shadow-xs">
        <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                School Legal Name
              </label>
              <input
                type="text"
                name="schoolName"
                value={form.schoolName || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                Board Affiliation Codes
              </label>
              <input
                type="text"
                name="affiliationNo"
                value={form.affiliationNo || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                Reception Telephone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                Admissions Hotline Desk
              </label>
              <input
                type="text"
                name="admissionsHotline"
                value={form.admissionsHotline || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                General Inquiries Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                Admissions Desk Email
              </label>
              <input
                type="email"
                name="admissionsEmail"
                value={form.admissionsEmail || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Campus Physical Postal Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Official Campus Visiting Hours
            </label>
            <input
              type="text"
              name="workingHours"
              value={form.workingHours || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Institutional Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
