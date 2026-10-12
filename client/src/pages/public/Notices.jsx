import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Bell, Search, Download, Calendar, Filter, FileText, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const Notices = () => {
  const { addToast } = useToast();
  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchNotices = async () => {
      const data = await api.getNotices();
      setNotices(data);
    };
    fetchNotices();
  }, []);

  const categories = ['All', 'Admissions', 'Academics', 'Examinations', 'Sports', 'General'];

  const filteredNotices = notices.filter((n) => {
    const matchesCategory = selectedCategory === 'All' || n.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.summary && n.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        title="Official Circulars & Notices"
        subtitle="Official communications, examination schedules, academic calendar updates, and institutional circulars."
        badge="School Notices"
        breadcrumbs={[{ name: 'Notices' }]}
      />

      {/* FILTER & SEARCH BAR */}
      <section className="py-8 bg-brand-light border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-brand-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search circulars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NOTICES LISTING */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNotices.length === 0 ? (
            <div className="text-center py-20 text-slate-400 space-y-3">
              <Bell className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
              <p className="text-base font-semibold">No notices found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotices.map((n) => (
                <div
                  key={n.id}
                  className="bg-white p-6 rounded-2xl border border-brand-border hover:border-brand-blue/50 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-brand-soft text-brand-blue">
                        {n.category}
                      </span>
                      {n.priority === 'High' && (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-100">
                          High Priority
                        </span>
                      )}
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {n.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-navy font-display hover:text-brand-blue transition-colors">
                      {n.title}
                    </h3>

                    {n.summary && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {n.summary}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <button
                      onClick={() => addToast(`Circular PDF "${n.title}" downloaded successfully.`, 'info')}
                      className="px-4 py-2.5 rounded-xl bg-brand-light hover:bg-brand-soft text-brand-navy hover:text-brand-blue border border-brand-border text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Circular</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
