import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Bell, Check, X, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminNotices = () => {
  const { addToast } = useToast();
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState('');
  const [editingNotice, setEditingNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Academics',
    priority: 'Normal',
    summary: '',
    date: new Date().toISOString().split('T')[0],
    isPublished: true,
    attachmentUrl: '',
  });

  const loadNotices = async () => {
    const data = await api.getNotices();
    setNotices(data);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleOpenCreate = () => {
    setEditingNotice(null);
    setForm({
      title: '',
      category: 'Academics',
      priority: 'Normal',
      summary: '',
      date: new Date().toISOString().split('T')[0],
      isPublished: true,
      attachmentUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (notice) => {
    setEditingNotice(notice);
    setForm({ ...notice });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title) {
      addToast('Notice title is mandatory.', 'error');
      return;
    }

    await api.saveNotice(editingNotice ? { ...form, id: editingNotice.id } : form);
    addToast(editingNotice ? 'Notice updated successfully.' : 'New notice published.', 'success');
    setIsModalOpen(false);
    loadNotices();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      await api.deleteNotice(id);
      addToast('Notice deleted.', 'info');
      loadNotices();
    }
  };

  const handleTogglePublish = async (notice) => {
    const updated = { ...notice, isPublished: !notice.isPublished };
    await api.saveNotice(updated);
    addToast(`Notice marked as ${updated.isPublished ? 'Published' : 'Draft'}.`, 'success');
    loadNotices();
  };

  const filtered = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-display">
            Notice &amp; Circular Management
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Create, edit, publish, and archive official circulars for parents and students.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Notice Circular</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notices by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
          />
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Showing {filtered.length} notices
        </span>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-brand-border">
                <th className="py-3.5 px-6">Circular Details</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Priority</th>
                <th className="py-3.5 px-6">Effective Date</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filtered.map((n) => (
                <tr key={n.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6 max-w-md">
                    <div className="font-bold text-brand-navy line-clamp-1">{n.title}</div>
                    <div className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">{n.summary}</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-700">{n.category}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        n.priority === 'High'
                          ? 'bg-rose-50 text-rose-600'
                          : n.priority === 'Medium'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {n.priority || 'Normal'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{n.date}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleTogglePublish(n)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        n.isPublished !== false
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {n.isPublished !== false ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(n)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-brand-blue"
                        title="Edit Notice"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(n.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                        title="Delete Notice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-brand-border shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h3 className="text-lg font-bold text-brand-navy font-display">
                {editingNotice ? 'Edit Notice' : 'Create New Notice'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="e.g. Mid-Term Examination Schedule"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Academics">Academics</option>
                    <option value="Examinations">Examinations</option>
                    <option value="Sports">Sports</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Publish Status</label>
                  <select
                    value={form.isPublished ? 'true' : 'false'}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.value === 'true' })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Summary / Details</label>
                <textarea
                  rows={3}
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="Brief synopsis of this circular..."
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-brand-border text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold transition-colors"
                >
                  {editingNotice ? 'Save Changes' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
