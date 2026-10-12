import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  Bell,
  Calendar,
  Users,
  Image as ImageIcon,
  Mail,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard = () => {
  const { addToast } = useToast();
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    pendingEnquiries: 0,
    totalNotices: 0,
    totalEvents: 0,
    totalFaculty: 0,
    totalGallery: 0,
    unreadMessages: 0,
  });

  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentNotices, setRecentNotices] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      const [sData, enqs, nots, msgs] = await Promise.all([
        api.getDashboardStats(),
        api.getAdmissionEnquiries(),
        api.getNotices(),
        api.getContactMessages(),
      ]);

      setStats(sData);
      setRecentEnquiries(enqs.slice(0, 5));
      setRecentNotices(nots.slice(0, 4));
      setRecentMessages(msgs.slice(0, 3));
    };
    loadDashboard();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    await api.updateEnquiryStatus(id, newStatus);
    setRecentEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    addToast(`Enquiry status updated to "${newStatus}".`, 'success');
  };

  const statCards = [
    {
      title: 'Total Enquiries',
      value: stats.totalEnquiries,
      sub: `${stats.pendingEnquiries} pending review`,
      icon: UserCheck,
      color: 'text-brand-blue bg-blue-50 border-blue-100',
    },
    {
      title: 'Published Notices',
      value: stats.totalNotices,
      sub: 'Active circulars',
      icon: Bell,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      title: 'Upcoming Events',
      value: stats.totalEvents,
      sub: 'Academic & sports',
      icon: Calendar,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Faculty Members',
      value: stats.totalFaculty,
      sub: 'Certified educators',
      icon: Users,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
      title: 'Contact Messages',
      value: stats.unreadMessages,
      sub: 'Awaiting reply',
      icon: Mail,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-display">
            School Administration Dashboard
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Real-time operations, enquiries monitoring, and institutional portal overview.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin22/notices"
            className="px-3.5 py-2 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Notice</span>
          </Link>
          <Link
            to="/admin22/events"
            className="px-3.5 py-2 rounded-xl bg-brand-light hover:bg-brand-soft text-brand-navy text-xs font-bold transition-all border border-brand-border flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event</span>
          </Link>
        </div>
      </div>

      {/* METRIC STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500">{card.title}</span>
                <div className={`p-2 rounded-xl ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display">
                  {card.value}
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-1">{card.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RECENT ENQUIRIES TABLE */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-xs overflow-hidden">
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-brand-navy font-display">
              Recent Admission Inquiries
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review and manage incoming student applications.
            </p>
          </div>
          <Link
            to="/admin22/admissions"
            className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-brand-border">
                <th className="py-3.5 px-6">Student / Parent</th>
                <th className="py-3.5 px-6">Grade</th>
                <th className="py-3.5 px-6">Contact</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {recentEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6">
                    <div className="font-bold text-brand-navy">{enq.studentName}</div>
                    <div className="text-slate-400 text-[11px]">Parent: {enq.parentName}</div>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700">{enq.grade}</td>
                  <td className="py-4 px-6 text-slate-500">
                    <div>{enq.email}</div>
                    <div className="text-[11px]">{enq.phone}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{enq.createdAt || 'Recent'}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        enq.status === 'New'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : enq.status === 'Contacted'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : enq.status === 'Under Review'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <select
                      value={enq.status}
                      onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                      className="px-2 py-1 rounded-lg border border-brand-border bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-blue"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Admitted">Admitted</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DUAL COLUMNS: NOTICES & CONTACT MESSAGES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Notices */}
        <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-brand-border">
            <h3 className="text-sm font-bold text-brand-navy font-display">Active Notices</h3>
            <Link to="/admin22/notices" className="text-xs font-bold text-brand-blue hover:underline">
              Manage
            </Link>
          </div>
          <div className="space-y-3">
            {recentNotices.map((n) => (
              <div key={n.id} className="p-3.5 rounded-xl bg-slate-50 border border-brand-border flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase text-brand-blue tracking-wider">
                    {n.category} • {n.date}
                  </div>
                  <h4 className="text-xs font-bold text-brand-navy mt-0.5 line-clamp-1">{n.title}</h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold shrink-0">
                  Published
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contact Inquiries */}
        <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-brand-border">
            <h3 className="text-sm font-bold text-brand-navy font-display">Recent Public Inquiries</h3>
            <Link to="/admin22/messages" className="text-xs font-bold text-brand-blue hover:underline">
              View Inbox
            </Link>
          </div>
          <div className="space-y-3">
            {recentMessages.map((m) => (
              <div key={m.id} className="p-3.5 rounded-xl bg-slate-50 border border-brand-border space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-brand-navy">{m.name}</span>
                  <span className="text-slate-400">{m.createdAt || 'Recent'}</span>
                </div>
                <p className="text-xs text-slate-700 font-semibold">{m.subject}</p>
                <p className="text-xs text-slate-500 line-clamp-1">{m.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
