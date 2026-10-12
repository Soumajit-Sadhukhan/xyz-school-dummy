import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronRight, Phone, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu upon navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Notices', path: '/notices' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isGlass = isHomePage && !isScrolled;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isGlass
          ? 'glass-nav-transparent'
          : 'glass-nav-scrolled bg-white/95 backdrop-blur-md shadow-md border-b border-brand-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Crest */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center text-white shadow-md group-hover:bg-brand-blue transition-colors">
              <GraduationCap className="w-7 h-7 text-brand-cyan" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-brand-navy font-display leading-none">
                XYZ <span className="text-brand-blue">SCHOOL</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-muted mt-1">
                Excellence • Heritage • 1998
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-brand-blue bg-brand-soft shadow-xs'
                      : 'text-brand-text/90 hover:text-brand-blue hover:bg-slate-100/70'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-bold shadow-blue-glow hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              to="/admissions"
              className="sm:inline-flex hidden items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-blue text-white text-xs font-bold"
            >
              Apply
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-brand-navy hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-xl border-b border-brand-border px-4 pt-3 pb-6 shadow-2xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-brand-soft text-brand-blue font-bold'
                      : 'text-brand-text hover:bg-slate-50'
                  }`
                }
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to="/admissions"
              className="w-full py-3 px-4 rounded-xl bg-brand-blue text-white text-center font-bold text-sm shadow-blue-glow flex items-center justify-center gap-2"
            >
              <span>Start Admission Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/admin22/login"
              className="w-full py-2.5 px-4 rounded-xl bg-brand-navy text-white text-center font-semibold text-xs flex items-center justify-center gap-2"
            >
              <span>Faculty &amp; Admin Sign In</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
