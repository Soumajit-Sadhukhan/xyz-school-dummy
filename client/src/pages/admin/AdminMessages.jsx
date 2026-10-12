import React, { useState, useEffect } from 'react';
import { Mail, Search, Trash2, Eye, CheckCircle2, Clock, X, MessageSquare } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminMessages = () => {
  const { addToast } = useToast();
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState('');
  const [activeMessage, setActiveMessage] = useState(null);

  const loadMessages = async () => {
    const data = await api.getContactMessages();
    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    await api.updateMessageStatus(id, status);
    addToast(`Message marked as ${status}.`, 'info');
    loadMessages();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await api.deleteMessage(id);
      addToast('Message deleted.', 'info');
      if (activeMessage?.id === id) setActiveMessage(null);
      loadMessages();
    }
  };

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-display">
            Contact Messages &amp; Enquiries
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            General inquiries submitted through the public website contact form.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inquiries by sender, subject, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
          />
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Total {filtered.length} inquiries
        </span>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-brand-border">
                <th className="py-3.5 px-6">Sender Details</th>
                <th className="py-3.5 px-6">Subject</th>
                <th className="py-3.5 px-6">Received Date</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6">
                    <div className="font-bold text-brand-navy">{m.name}</div>
                    <div className="text-slate-400 text-[11px]">{m.email} • {m.phone || 'No Phone'}</div>
                  </td>
                  <td className="py-4 px-6 max-w-xs">
                    <div className="font-semibold text-slate-800 line-clamp-1">{m.subject}</div>
                    <div className="text-slate-500 text-[11px] line-clamp-1">{m.message}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{m.createdAt || 'Recent'}</td>
                  <td className="py-4 px-6">
                    <select
                      value={m.status || 'Unread'}
                      onChange={(e) => handleUpdateStatus(m.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border focus:outline-none ${
                        m.status === 'Replied'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : m.status === 'Read'
                          ? 'bg-slate-100 text-slate-600 border-slate-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      <option value="Unread">Unread</option>
                      <option value="Read">Read</option>
                      <option value="Replied">Replied</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setActiveMessage(m);
                          if (m.status === 'Unread') handleUpdateStatus(m.id, 'Read');
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-brand-blue"
                        title="Read Message"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                        title="Delete Message"
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

      {/* MESSAGE DETAILS MODAL */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-brand-border shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div>
                <h3 className="text-lg font-bold text-brand-navy font-display">Inquiry Details</h3>
                <span className="text-xs text-brand-muted">From: {activeMessage.name}</span>
              </div>
              <button onClick={() => setActiveMessage(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-brand-border space-y-1">
                <div><strong>Sender:</strong> {activeMessage.name}</div>
                <div><strong>Email:</strong> <a href={`mailto:${activeMessage.email}`} className="text-brand-blue underline">{activeMessage.email}</a></div>
                {activeMessage.phone && <div><strong>Phone:</strong> {activeMessage.phone}</div>}
                <div><strong>Date:</strong> {activeMessage.createdAt || 'Recent'}</div>
              </div>

              <div>
                <strong className="block text-brand-navy uppercase tracking-wider text-[11px] mb-1">Subject:</strong>
                <p className="text-sm font-semibold text-slate-800">{activeMessage.subject}</p>
              </div>

              <div>
                <strong className="block text-brand-navy uppercase tracking-wider text-[11px] mb-1">Message Content:</strong>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                  {activeMessage.message}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-brand-border">
              <a
                href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`}
                className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply Via Email</span>
              </a>

              <button
                type="button"
                onClick={() => setActiveMessage(null)}
                className="px-4 py-2 rounded-xl border border-brand-border text-slate-600 text-xs font-bold hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
