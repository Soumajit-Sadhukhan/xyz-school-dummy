import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, X, Filter } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminGallery = () => {
  const { addToast } = useToast();
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Campus',
    imageUrl: '/images/campus/campus-hero.png',
    description: '',
  });

  const loadGallery = async () => {
    const data = await api.getGallery();
    setItems(data);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) {
      addToast('Image title and image URL are required.', 'error');
      return;
    }

    await api.saveGalleryItem(form);
    addToast('New photograph added to gallery.', 'success');
    setIsModalOpen(false);
    setForm({
      title: '',
      category: 'Campus',
      imageUrl: '/images/campus/campus-hero.png',
      description: '',
    });
    loadGallery();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this photograph?')) {
      await api.deleteGalleryItem(id);
      addToast('Photograph removed from gallery.', 'info');
      loadGallery();
    }
  };

  const categories = ['All', 'Campus', 'Facilities', 'Sports', 'Events', 'Faculty'];

  const filtered =
    selectedCategory === 'All'
      ? items
      : items.filter((it) => it.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy font-display">
            Media &amp; Gallery Management
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Curate campus photographs, event snapshots, and facility galleries.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Photograph</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Showing {filtered.length} photos
        </span>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-brand-border shadow-xs overflow-hidden flex flex-col justify-between group"
          >
            <div className="h-44 relative bg-slate-100 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-navy/80 text-brand-cyan text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="font-bold text-brand-navy text-sm line-clamp-1">{item.title}</h4>
                {item.description && (
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete from Gallery"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD PHOTO MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-brand-border shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <h3 className="text-lg font-bold text-brand-navy font-display">
                Add Photograph to Gallery
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
                  placeholder="e.g. Science Fair Robotics Pavilion"
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
                    <option value="Campus">Campus</option>
                    <option value="Facilities">Facilities</option>
                    <option value="Sports">Sports</option>
                    <option value="Events">Events</option>
                    <option value="Faculty">Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Photo Preset / Source</label>
                  <select
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="/images/campus/campus-hero.png">Flagship Campus Facade</option>
                    <option value="/images/campus/campus-library.png">Central Library Pavilion</option>
                    <option value="/images/campus/campus-sports.png">Sports &amp; Aquatics Arena</option>
                    <option value="/images/campus/campus-admissions.png">Admissions Welcome Center</option>
                    <option value="/images/campus/campus-faculty.png">Faculty Academic Lounge</option>
                    <option value="/images/campus/campus-events.png">Spring Academic Festival</option>
                    <option value="/images/campus/campus-quadrangle.png">South Wing Quadrangle</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Custom Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={form.imageUrl.startsWith('http') ? form.imageUrl : ''}
                  onChange={(e) => e.target.value && setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-navy mb-1">Description / Caption</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short descriptive caption..."
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
                  Add Photograph
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
