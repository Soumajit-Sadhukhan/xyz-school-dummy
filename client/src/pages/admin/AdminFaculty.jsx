import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Users, Mail, GraduationCap, X } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminFaculty = () => {
  const { addToast } = useToast();
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);

  const [form, setForm] = useState({
    name: '',
    designation: '',
    department: 'Sciences',
    qualification: '',
    experience: '5 Years',
    email: '',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    bio: '',
  });

  const loadFaculty = async () => {
    const data = await api.getFaculty();
    setFaculty(data);
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  const handleOpenCreate = () => {
    setEditingFaculty(null);
    setForm({
      name: '',
      designation: '',
      department: 'Sciences',
      qualification: '',
      experience: '5 Years',
      email: '',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
      bio: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setEditingFaculty(member);
    setForm({ ...member });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.designation) {
      addToast('Faculty name and designation are required.', 'error');
      return;
    }

    await api.saveFaculty(editingFaculty ? { ...form, id: editingFaculty.id } : form);
    addToast(editingFaculty ? 'Faculty profile updated.' : 'New educator profile created.', 'success');
    setIsModalOpen(false);
    loadFaculty();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      await api.deleteFaculty(id);
      addToast('Faculty profile deleted.', 'info');
      loadFaculty();
    }
  };

  const filtered = faculty.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.designation.toLowerCase().includes(search.toLowerCase()) ||
      f.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-display">
            Faculty &amp; Staff Directory
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Maintain teacher qualifications, departmental assignments, and credentials.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search faculty by name, subject, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
          />
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Total {filtered.length} educators
        </span>
      </div>

      {/* Faculty Table */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-brand-border">
                <th className="py-3.5 px-6">Educator Profile</th>
                <th className="py-3.5 px-6">Designation</th>
                <th className="py-3.5 px-6">Department</th>
                <th className="py-3.5 px-6">Qualifications</th>
                <th className="py-3.5 px-6">Experience</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filtered.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={f.photoUrl}
                        alt={f.name}
                        className="w-10 h-10 rounded-full object-cover border border-brand-border shrink-0"
                      />
                      <div>
                        <div className="font-bold text-brand-navy">{f.name}</div>
                        <div className="text-slate-400 text-[11px]">{f.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">{f.designation}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-soft text-brand-blue">
                      {f.department}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 max-w-xs line-clamp-1">{f.qualification}</td>
                  <td className="py-4 px-6 font-medium text-slate-500">{f.experience}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(f)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-brand-blue"
                        title="Edit Profile"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                        title="Delete Profile"
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

      {/* CREATE / EDIT FACULTY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-brand-border shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h3 className="text-lg font-bold text-brand-navy font-display">
                {editingFaculty ? 'Edit Educator Profile' : 'Add New Educator'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="e.g. Dr. Robert Chen"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Designation *</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    required
                    placeholder="e.g. Head of Computer Science"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Athletics">Athletics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Experience</label>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="e.g. 12 Years"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="r.chen@xyzschool.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    placeholder="e.g. Ph.D. in Computer Science"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Photo URL</label>
                <input
                  type="text"
                  value={form.photoUrl}
                  onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Biography</label>
                <textarea
                  rows={2}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Academic career highlights and mentorship focus..."
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
                  {editingFaculty ? 'Save Profile' : 'Save Educator'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
