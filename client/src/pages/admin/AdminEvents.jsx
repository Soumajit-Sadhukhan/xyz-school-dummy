import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Calendar, MapPin, Clock, X, Image as ImageIcon } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminEvents = () => {
  const { addToast } = useToast();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Sports',
    date: new Date().toISOString().split('T')[0],
    time: '09:00 AM - 03:00 PM',
    venue: 'Main School Auditorium & Campus',
    image: '/images/campus/campus-sports.png',
    description: '',
  });

  const loadEvents = async () => {
    const data = await api.getEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setForm({
      title: '',
      category: 'Sports',
      date: new Date().toISOString().split('T')[0],
      time: '09:00 AM - 03:00 PM',
      venue: 'Main School Auditorium & Campus',
      image: '/images/campus/campus-sports.png',
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ev) => {
    setEditingEvent(ev);
    setForm({ ...ev });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title) {
      addToast('Event title is required.', 'error');
      return;
    }

    await api.saveEvent(editingEvent ? { ...form, id: editingEvent.id } : form);
    addToast(editingEvent ? 'Event updated.' : 'New event scheduled.', 'success');
    setIsModalOpen(false);
    loadEvents();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await api.deleteEvent(id);
      addToast('Event removed.', 'info');
      loadEvents();
    }
  };

  const filtered = events.filter(
    (ev) =>
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.category.toLowerCase().includes(search.toLowerCase()) ||
      ev.venue.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-display">
            Event Management
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Schedule academic competitions, cultural recitals, sports galas, and parent summits.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add School Event</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events by title, venue, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
          />
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Showing {filtered.length} events
        </span>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-2xl border border-brand-border shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="h-40 relative bg-slate-100 overflow-hidden">
                <img
                  src={ev.image || '/images/campus/campus-events.png'}
                  alt={ev.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-navy/80 text-brand-cyan text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                    {ev.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] font-bold text-brand-blue">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{ev.date} • {ev.time}</span>
                </div>
                <h3 className="text-base font-bold text-brand-navy font-display line-clamp-1">
                  {ev.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="line-clamp-1">{ev.venue}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {ev.description}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-2 bg-slate-50/50">
              <button
                onClick={() => handleOpenEdit(ev)}
                className="px-3 py-1.5 rounded-lg bg-white border border-brand-border text-slate-700 hover:text-brand-blue text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(ev.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Delete Event"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-brand-border shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h3 className="text-lg font-bold text-brand-navy font-display">
                {editingEvent ? 'Edit Event' : 'Schedule New Event'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Event Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="e.g. Grand Annual Sports Gala 2026"
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
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Academics">Academics</option>
                    <option value="Leadership">Leadership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Event Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Time</label>
                  <input
                    type="text"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    placeholder="e.g. 09:00 AM - 04:30 PM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Venue</label>
                  <input
                    type="text"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    placeholder="e.g. Tagore Grand Auditorium"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Banner Image URL / Preset</label>
                <select
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                >
                  <option value="/images/campus/campus-sports.png">Sports Complex Photograph</option>
                  <option value="/images/campus/campus-events.png">Outdoor Academic Festival</option>
                  <option value="/images/campus/campus-library.png">Knowledge Commons Library</option>
                  <option value="/images/campus/campus-quadrangle.png">Campus Quadrangle</option>
                  <option value="/images/campus/campus-faculty.png">Faculty Academic Lounge</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Details regarding event activities, guest speakers, or guidelines..."
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
                  {editingEvent ? 'Save Changes' : 'Schedule Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
