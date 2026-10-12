import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ShieldAlert, UserPlus, Key, ShieldCheck, X } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminUsers = () => {
  const { addToast } = useToast();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor',
  });

  const loadUsers = async () => {
    const data = await api.getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      addToast('All fields are mandatory.', 'error');
      return;
    }

    await api.saveUser(form);
    addToast('New administrative user created.', 'success');
    setIsModalOpen(false);
    setForm({ name: '', email: '', password: '', role: 'editor' });
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to revoke access for this user?')) {
      await api.deleteUser(id);
      addToast('User access revoked.', 'info');
      loadUsers();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-display">
            Admin User &amp; Role Management
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Grant granular administrative privileges, oversee staff accounts, and manage role security.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Role explanation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-brand-border space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-navy">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
            <span>Super Administrator</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Unrestricted access: manage settings, users, delete permissions, and all modules.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-brand-border space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-navy">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Administrator</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Operational access: admissions, circulars, events, faculty, and inquiries.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-brand-border space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-navy">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Editor</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Content creation: draft circulars, events, and update media galleries.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-brand-border">
                <th className="py-3.5 px-6">User Name</th>
                <th className="py-3.5 px-6">Email Address</th>
                <th className="py-3.5 px-6">Role Privilege</th>
                <th className="py-3.5 px-6">Account Status</th>
                <th className="py-3.5 px-6">Last Login</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6 font-bold text-brand-navy">{u.name}</td>
                  <td className="py-4 px-6 font-medium text-slate-600">{u.email}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        u.role === 'superadmin'
                          ? 'bg-blue-50 text-brand-blue border border-blue-200'
                          : u.role === 'admin'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{u.lastLogin || 'Recently'}</td>
                  <td className="py-4 px-6 text-right">
                    {u.role !== 'superadmin' ? (
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Revoke User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-300 font-bold">Protected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD USER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-brand-border shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h3 className="text-lg font-bold text-brand-navy font-display">Create Admin User</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="e.g. Eleanor Jenkins"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="e.jenkins@xyzschool.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Temporary Password *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  placeholder="Minimum 8 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Assigned Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                >
                  <option value="editor">Editor (Content &amp; Notices)</option>
                  <option value="admin">Administrator (Operations &amp; Admissions)</option>
                  <option value="superadmin">Super Administrator (Full System)</option>
                </select>
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
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
