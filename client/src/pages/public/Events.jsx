import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Calendar, Clock, MapPin, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const Events = () => {
  const { addToast } = useToast();
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [registeredEvents, setRegisteredEvents] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await api.getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const categories = ['All', 'Sports', 'Cultural', 'Academics', 'Leadership'];

  const filteredEvents =
    selectedCategory === 'All'
      ? events
      : events.filter((ev) => ev.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleRegister = (eventId, title) => {
    setRegisteredEvents((prev) => ({ ...prev, [eventId]: true }));
    addToast(`You have successfully RSVPed for "${title}". A calendar invite has been sent.`, 'success');
  };

  return (
    <div>
      <PageHeader
        title="Events & Academic Calendar"
        subtitle="Annual athletic meets, symphony recitals, science expos, and student conferences celebrating our vibrant school community."
        badge="Campus Happenings"
        breadcrumbs={[{ name: 'Events' }]}
      />

      {/* CATEGORY TABS */}
      <section className="py-12 bg-brand-light border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-brand-border'
                }`}
              >
                {cat === 'All' ? 'All Events' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS SHOWCASE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEvents.map((ev) => {
              const isRegistered = !!registeredEvents[ev.id];
              return (
                <div
                  key={ev.id}
                  className="bg-white rounded-3xl border border-brand-border shadow-xs hover:shadow-elevated transition-all overflow-hidden flex flex-col group"
                >
                  {/* Banner Image */}
                  <div className="h-60 overflow-hidden relative bg-slate-100">
                    <img
                      src={ev.image || '/images/campus/campus-events.png'}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-brand-navy/90 text-brand-cyan text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20">
                        {ev.category}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-muted mb-2">
                        <span className="flex items-center gap-1.5 text-brand-blue font-bold">
                          <Calendar className="w-4 h-4" />
                          {ev.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-slate-400" />
                          {ev.time}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-brand-navy font-display group-hover:text-brand-blue transition-colors">
                        {ev.title}
                      </h3>

                      <div className="flex items-start gap-1.5 text-xs text-slate-500 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{ev.venue}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                        {ev.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => handleRegister(ev.id, ev.title)}
                        disabled={isRegistered}
                        className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                          isRegistered
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                            : 'bg-brand-navy hover:bg-brand-blue text-white shadow-sm'
                        }`}
                      >
                        {isRegistered ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>RSVP Confirmed</span>
                          </>
                        ) : (
                          <>
                            <span>Register &amp; Attend Event</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
