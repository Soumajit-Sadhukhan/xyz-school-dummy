import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Lightbox = ({ item, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-fade-in backdrop-blur-md">
      {/* Top bar */}
      <div className="flex items-center justify-between text-white max-w-7xl w-full mx-auto pb-4">
        <div>
          <span className="px-2.5 py-1 rounded-full bg-brand-blue/30 text-brand-cyan text-xs font-semibold tracking-wider uppercase border border-brand-cyan/20">
            {item.category}
          </span>
          <h3 className="text-lg font-bold mt-1 text-white">{item.title}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close image viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-auto overflow-hidden">
        {onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={item.imageUrl}
          alt={item.title}
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300"
        />

        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption footer */}
      {item.description && (
        <div className="max-w-4xl mx-auto text-center pt-3 text-slate-300 text-sm">
          <p>{item.description}</p>
        </div>
      )}
    </div>
  );
};
