import React, { useState, useEffect } from 'react';
import { Search, UserCheck, Trash2, Eye, Filter, MessageSquare, CheckCircle2, X } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminAdmissions = () => {
  const { addToast } = useToast();
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeModalEnquiry, setActiveModalEnquiry] = useState(null);
  const [counsellorNote, setCounsellorNote] = useState('');

  const loadEnquiries = async () => {
    const data = await api.getAdmissionEnquiries();
    setEnquiries(data);
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleUpdateStatus = async (id, status, notes) => {
    await api.updateEnquiryStatus(id, status, notes);
    addToast(`Enquiry status updated to "${status}".`, 'success');
    loadEnquiries();
    if (activeModalEnquiry && activeModalEnquiry.id === id) {
      setActiveModalEnquiry((prev) => ({ ...prev, status, notes: notes || prev.notes }));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admission enquiry?')) {
      await api.deleteEnquiry(id);
      addToast('Enquiry deleted.', 'info');
      if (activeModalEnquiry?.id === id) setActiveModalEnquiry(null);
      loadEnquiries();
    }
  };

  const handleOpenDetail = (enq) => {
    setActiveModalEnquiry(enq);
    setCounsellorNote(enq.notes || '');
  };

  const statuses = ['All', 'New', 'Contacted', 'Under Review', 'Admitted'];

  const filtered = enquiries.filter((e) => {
    const matchesStatus = selectedStatus === 'All' || e.status === selectedStatus;
    const matchesSearch =
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.parentName.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.grade.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-display">
            Admission Enquiries
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Track student registrations, schedule entrance interactions, and manage admissions statuses.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedStatus === st
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidates or parents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
          />
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-brand-border">
                <th className="py-3.5 px-6">Candidate / Parent</th>
                <th className="py-3.5 px-6">Grade Applied</th>
                <th className="py-3.5 px-6">Contact Info</th>
                <th className="py-3.5 px-6">Submission Date</th>
                <th className="py-3.5 px-6">Current Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filtered.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6">
                    <div className="font-bold text-brand-navy">{enq.studentName}</div>
                    <div className="text-slate-400 text-[11px]">Parent: {enq.parentName}</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">{enq.grade}</td>
                  <td className="py-4 px-6 text-slate-500">
                    <div>{enq.email}</div>
                    <div className="text-[11px] font-mono">{enq.phone}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{enq.createdAt || 'Recent'}</td>
                  <td className="py-4 px-6">
                    <select
                      value={enq.status}
                      onChange={(e) => handleUpdateStatus(enq.id, e.target.value, enq.notes)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border focus:outline-none ${
                        enq.status === 'New'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : enq.status === 'Contacted'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : enq.status === 'Under Review'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Admitted">Admitted</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenDetail(enq)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-brand-blue"
                        title="View Application Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                        title="Delete Application"
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

      {/* DETAIL MODAL */}
      {activeModalEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-brand-border shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div>
                <h3 className="text-lg font-bold text-brand-navy font-display">
                  Candidate Application File
                </h3>
                <p className="text-xs text-brand-muted">ID: {activeModalEnquiry.id}</p>
              </div>
              <button
                onClick={() => setActiveModalEnquiry(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-brand-border">
                <div>
                  <span className="text-slate-400 block">Student:</span>
                  <span className="font-bold text-brand-navy text-sm">{activeModalEnquiry.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Parent / Guardian:</span>
                  <span className="font-bold text-brand-navy text-sm">{activeModalEnquiry.parentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Grade Applying:</span>
                  <span className="font-bold text-brand-blue">{activeModalEnquiry.grade}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Academic Cycle:</span>
                  <span className="font-bold text-slate-700">{activeModalEnquiry.academicYear || '2026-2027'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone:</span>
                  <span className="font-medium text-slate-700">{activeModalEnquiry.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email:</span>
                  <span className="font-medium text-slate-700">{activeModalEnquiry.email}</span>
                </div>
              </div>

              {activeModalEnquiry.previousSchool && (
                <div className="p-3 rounded-xl bg-slate-50 border border-brand-border">
                  <span className="text-slate-400 block text-[11px]">Previous School:</span>
                  <span className="font-semibold text-slate-700">{activeModalEnquiry.previousSchool}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">
                  Admissions Counsellor Notes &amp; Follow-up
                </label>
                <textarea
                  rows={3}
                  value={counsellorNote}
                  onChange={(e) => setCounsellorNote(e.target.value)}
                  placeholder="Record campus walkthrough feedback, test scores, or follow-up conversation notes..."
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalEnquiry(null)}
                className="px-4 py-2 rounded-xl border border-brand-border text-slate-600 text-xs font-bold hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleUpdateStatus(activeModalEnquiry.id, activeModalEnquiry.status, counsellorNote);
                  setActiveModalEnquiry(null);
                }}
                className="px-5 py-2 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
