import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-8 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: School Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-7 h-7 text-brand-cyan" />
              </div>
              <div>
                <span className="font-extrabold text-2xl text-white tracking-tight font-display">
                  XYZ <span className="text-brand-cyan">SCHOOL</span>
                </span>
                <p className="text-xs text-brand-cyan tracking-wider uppercase font-semibold">
                  Excellence in Education &amp; Modern Heritage
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Established in 1998, XYZ School is an acclaimed educational institution nurturing students to achieve academic brilliance, leadership resilience, and humane global citizenship.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-brand-cyan font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0" />
              <span>CBSE Affiliation No: 2130894 | Cambridge International ID: IN842</span>
            </div>
          </div>

          {/* Column 2: Academics & Campus */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Academics</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/academics" className="hover:text-brand-cyan transition-colors">
                  Early Childhood &amp; Pre-Prep
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-brand-cyan transition-colors">
                  Middle School Curriculum
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-brand-cyan transition-colors">
                  Cambridge IGCSE &amp; CBSE Senior
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-brand-cyan transition-colors">
                  STEM &amp; Robotics Commons
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-brand-cyan transition-colors">
                  Distinguished Faculty
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-brand-cyan transition-colors">
                  Campus Visual Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Admissions & Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Admissions &amp; Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/admissions" className="hover:text-brand-cyan transition-colors flex items-center gap-1">
                  <span>Admissions 2026-27</span>
                  <ArrowUpRight className="w-3 h-3 text-brand-cyan" />
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-brand-cyan transition-colors">
                  Tuition &amp; Scholarships
                </Link>
              </li>
              <li>
                <Link to="/notices" className="hover:text-brand-cyan transition-colors">
                  Official Circulars &amp; Notices
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-brand-cyan transition-colors">
                  School Events Calendar
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand-cyan transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-brand-cyan transition-colors">
                  Privacy Policy &amp; Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Campus Contact</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>Plot 12, Academic Enclave, Sector 8, Knowledge Boulevard, Heritage City - 110045</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                <a href="tel:+18005550199" className="hover:text-white transition-colors">
                  +1 (800) 555-0199 / 0188
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <a href="mailto:admissions@xyzschool.edu" className="hover:text-white transition-colors">
                  admissions@xyzschool.edu
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>Mon - Fri: 7:45 AM - 3:45 PM<br />Sat: 8:30 AM - 12:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} XYZ School Educational Trust. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-white transition-colors">
              Help &amp; FAQ
            </Link>
            <span>•</span>
            <Link to="/admin22/login" className="text-brand-cyan hover:underline font-semibold flex items-center gap-1">
              <span>Admin Login</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
