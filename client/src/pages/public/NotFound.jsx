import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, GraduationCap, Compass, HelpCircle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-brand-soft text-brand-blue flex items-center justify-center mx-auto shadow-sm">
          <GraduationCap className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-black text-brand-navy font-display tracking-tight">404</span>
          <h1 className="text-2xl font-bold text-brand-navy font-display">Campus Page Not Found</h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            The page or document you are seeking might have been updated, relocated, or does not exist within the XYZ School directory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/admissions"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-light hover:bg-brand-soft text-brand-navy border border-brand-border font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Admissions Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
