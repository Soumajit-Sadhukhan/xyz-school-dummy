import React, { useState, useEffect } from 'react';
import { Save, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminContent = () => {
  const { addToast } = useToast();
  const [settings, setSettings] = useState({
    heroHeadline: '',
    heroSubheadline: '',
    tagline: '',
    principalMessage: '',
    affiliationNo: '',
  });

  useEffect(() => {
    const loadContent = async () => {
      const data = await api.getSettings();
      setSettings(data);
    };
    loadContent();
  }, []);

  const handleChange = (e) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await api.saveSettings(settings);
    addToast('Page content configuration saved successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-display">
            Page Content Management
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Customize homepage hero titles, school mottos, and leadership desk messages.
          </p>
        </div>
      </div>

      {/* Content Form */}
      <div className="bg-white p-8 rounded-3xl border border-brand-border shadow-xs">
        <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Homepage Hero Primary Headline
            </label>
            <input
              type="text"
              name="heroHeadline"
              value={settings.heroHeadline || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Homepage Hero Sub-Headline
            </label>
            <textarea
              rows={3}
              name="heroSubheadline"
              value={settings.heroSubheadline || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                School Tagline / Motto
              </label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                Official Affiliation Banner
              </label>
              <input
                type="text"
                name="affiliationNo"
                value={settings.affiliationNo || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Principal's Welcome Address (Homepage &amp; About)
            </label>
            <textarea
              rows={4}
              name="principalMessage"
              value={settings.principalMessage || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm focus:ring-2 focus:ring-brand-blue focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save &amp; Update Live Content</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
