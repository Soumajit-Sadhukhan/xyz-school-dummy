import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Award, Lock, ExternalLink, Compass } from 'lucide-react';

export const TopBar = () => {
  return (
    <aside className="w-full bg-brand-navy text-white text-xs font-medium tracking-wide py-2 px-4 sm:px-8 border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-brand-cyan font-semibold">
            <Award className="w-3.5 h-3.5" />
            Affiliation No: 2130894 (CBSE &amp; Cambridge)
          </span>
          <span className="hidden md:inline opacity-30">|</span>
          <a
            href="tel:+18005550199"
            className="hidden sm:inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-cyan" />
            +1 (800) 555-0199
          </a>
          <span className="hidden lg:inline opacity-30">|</span>
          <a
            href="mailto:admissions@xyzschool.edu"
            className="hidden lg:inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-brand-cyan" />
            admissions@xyzschool.edu
          </a>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 ml-auto sm:ml-0">
          <Link
            to="/facilities"
            className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-brand-cyan transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Virtual Campus Tour</span>
          </Link>
          <span className="opacity-30">|</span>
          <Link
            to="/admin22/login"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
          >
            <Lock className="w-3 h-3 text-brand-cyan" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
