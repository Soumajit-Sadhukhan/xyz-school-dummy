import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const PageHeader = ({ title, subtitle, badge, breadcrumbs = [] }) => {
  return (
    <div className="relative bg-brand-navy py-16 sm:py-20 overflow-hidden border-b border-brand-border/20">
      {/* Decorative background grid and lighting */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        {/* Breadcrumb Trail */}
        <nav className="flex items-center gap-2 text-xs text-brand-cyan/90 font-medium mb-4 flex-wrap">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-white transition-colors">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-white font-semibold">{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Badge */}
        {badge && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-blue/40 text-brand-cyan border border-brand-cyan/30 mb-3">
            {badge}
          </span>
        )}

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
