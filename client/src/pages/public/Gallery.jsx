import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Lightbox } from '../../components/common/Lightbox';
import { Maximize2, Image as ImageIcon } from 'lucide-react';
import { api } from '../../services/api';

export const Gallery = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const data = await api.getGallery();
      setItems(data);
    };
    fetchGallery();
  }, []);

  const categories = ['All', 'Campus', 'Facilities', 'Sports', 'Events', 'Faculty'];

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((it) => it.category.toLowerCase() === selectedCategory.toLowerCase());

  const handlePrev = () => {
    if (activeLightboxIndex !== null && activeLightboxIndex > 0) {
      setActiveLightboxIndex(activeLightboxIndex - 1);
    } else {
      setActiveLightboxIndex(filteredItems.length - 1);
    }
  };

  const handleNext = () => {
    if (activeLightboxIndex !== null && activeLightboxIndex < filteredItems.length - 1) {
      setActiveLightboxIndex(activeLightboxIndex + 1);
    } else {
      setActiveLightboxIndex(0);
    }
  };

  return (
    <div>
      <PageHeader
        title="Campus Gallery"
        subtitle="Visual glimpses of life, learning, athletics, and celebrations across our vibrant 25-acre academic grounds."
        badge="Moments & Memories"
        breadcrumbs={[{ name: 'Gallery' }]}
      />

      {/* FILTER BUTTONS */}
      <section className="py-12 bg-brand-light border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveLightboxIndex(null);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-brand-border'
                }`}
              >
                {cat === 'All' ? 'All Photographs' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 text-slate-400 space-y-3">
              <ImageIcon className="w-12 h-12 mx-auto stroke-1" />
              <p className="text-base font-semibold">No photographs found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxIndex(index)}
                  className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-elevated border border-brand-border cursor-pointer transition-all bg-slate-100 h-72"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 rounded-full bg-brand-navy/80 text-brand-cyan text-xs font-bold uppercase tracking-wider border border-white/20">
                        {item.category}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white font-display leading-snug">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-slate-200 mt-1 line-clamp-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {activeLightboxIndex !== null && (
        <Lightbox
          item={filteredItems[activeLightboxIndex]}
          onClose={() => setActiveLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};
