import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GraduationCap,
  Award,
  BookOpen,
  Users,
  Compass,
  Trophy,
  Calendar,
  Bell,
  CheckCircle2,
  ChevronRight,
  Building,
  Sparkles,
  ShieldCheck,
  Star,
  Quote,
} from 'lucide-react';
import { api } from '../../services/api';

export const Home = () => {
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedNotices = await api.getNotices();
      const fetchedEvents = await api.getEvents();
      setNotices(fetchedNotices.slice(0, 4));
      setEvents(fetchedEvents.slice(0, 3));
    };
    fetchData();
  }, []);

  const stats = [
    { value: '100%', label: 'University Placement', icon: GraduationCap },
    { value: '1:12', label: 'Teacher-Student Ratio', icon: Users },
    { value: '28+', label: 'State & National Titles', icon: Trophy },
    { value: '25 Acres', label: 'Lush Smart Campus', icon: Building },
  ];

  const pillars = [
    {
      title: 'Inquiry-Driven Academics',
      desc: 'Dual CBSE & Cambridge IGCSE / IB curriculum tailored for critical thinking, conceptual clarity, and global competitive exams.',
      icon: BookOpen,
      badge: 'Dual Board',
    },
    {
      title: 'STEM & AI Innovation',
      desc: 'Next-gen robotics, 3D prototyping suites, and dedicated student laboratories exploring applied sciences and ethics in computing.',
      icon: Sparkles,
      badge: 'State-of-the-Art',
    },
    {
      title: 'Athletic & Aquatic Prowess',
      desc: 'Olympic synthetic track, heated indoor pool, FIFA-grade turf, and professional coaching across 14 Olympic sporting disciplines.',
      icon: Trophy,
      badge: 'Olympic Grade',
    },
    {
      title: 'Character & Global Leadership',
      desc: 'Model UN, community outreach initiatives, and comprehensive arts education fostering empathetic and resilient modern citizens.',
      icon: ShieldCheck,
      badge: 'Holistic Growth',
    },
  ];

  const testimonials = [
    {
      quote:
        'XYZ School transformed our daughter from an introverted student into a confident debating champion and scholar. The mentors genuinely care for every child.',
      author: 'Dr. Rajesh & Sunita Kapoor',
      role: 'Parents of Grade 10 Cambridge Scholar',
    },
    {
      quote:
        'The balance between Olympic sports training and academic preparation is unparalleled. I received an Ivy League scholarship while captaining our track team.',
      author: 'Aarush Mehta',
      role: 'Alumnus, Class of 2024 (Now at Stanford)',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION WITH LARGE CAMPUS PHOTOGRAPHY */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-brand-navy">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/campus/campus-hero.png"
            alt="XYZ School Campus Architecture"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle brand overlay gradient */}
          <div className="absolute inset-0 hero-mask" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full text-white">
          <div className="max-w-3xl space-y-6">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-brand-cyan text-xs font-bold tracking-wide uppercase shadow-sm">
              <Award className="w-4 h-4 text-brand-cyan" />
              <span>CBSE Affiliated No. 2130894 • Cambridge International</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.12] text-white">
              Nurturing <span className="text-brand-cyan">Global Thinkers</span> &amp; Future Leaders
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
              XYZ School harmonizes century-honored educational values with modern innovation across an expansive 25-acre technology-enabled campus.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/admissions"
                className="px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-base shadow-blue-glow hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Apply for Admissions 2026-27</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/facilities"
                className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-semibold text-base transition-all flex items-center justify-center gap-2 hover:border-white/40"
              >
                <Compass className="w-5 h-5 text-brand-cyan" />
                <span>Explore Campus Facilities</span>
              </Link>
            </div>

            {/* Key highlights pill */}
            <div className="pt-4 flex items-center gap-4 sm:gap-8 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" /> Admissions Open Pre-KG to Gr 11
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" /> Cambridge &amp; CBSE Pathways
              </span>
            </div>
          </div>
        </div>

        {/* Bottom subtle slant divider */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* STATS BANNER */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-2xl shadow-elevated border border-brand-border p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-soft flex items-center justify-center text-brand-blue shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-brand-muted">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRINCIPAL'S WELCOME & HERITAGE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image side */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/campus/campus-admissions.png"
                  alt="Welcome Center of XYZ School"
                  className="w-full h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-bold text-lg">Dr. Evelyn Vance</p>
                  <p className="text-xs text-brand-cyan">Principal &amp; Academic Director • Ph.D. Harvard</p>
                </div>
              </div>
              {/* Floating trust card */}
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-brand-navy text-white p-5 rounded-2xl shadow-xl max-w-xs border border-white/10">
                <div className="flex items-center gap-2 text-brand-cyan mb-1">
                  <Star className="w-4 h-4 fill-brand-cyan" />
                  <Star className="w-4 h-4 fill-brand-cyan" />
                  <Star className="w-4 h-4 fill-brand-cyan" />
                  <Star className="w-4 h-4 fill-brand-cyan" />
                  <Star className="w-4 h-4 fill-brand-cyan" />
                </div>
                <p className="text-xs text-slate-200">
                  Ranked Among Top 10 Indian Day-cum-Boarding Schools by Education World 2025.
                </p>
              </div>
            </div>

            {/* Content side */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3 py-1 rounded-full">
                <span>Welcome to XYZ School</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-display leading-tight">
                Empowering Inquiring Minds, Building Enduring Character
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                For over twenty-eight years, XYZ School has stood as an academic sanctuary where intellectual rigor meets compassionate stewardship. We believe every child harbors unique brilliance waiting to be discovered, cultivated, and celebrated.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Our pedagogical approach integrates rigorous academics with collaborative arts, championship athletics, and experiential scientific inquiry, preparing our graduates to flourish at the world’s most distinguished universities.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-semibold text-sm transition-all"
                >
                  <span>Read Our Vision &amp; Heritage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/faculty"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-navy font-semibold text-sm transition-all"
                >
                  <span>Meet Our Faculty</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CORE ACADEMIC PILLARS */}
      <section className="py-20 bg-brand-light border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3.5 py-1 rounded-full">
              Holistic Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-display">
              Four Pillars of XYZ School Education
            </h2>
            <p className="text-slate-600 text-base">
              A balanced educational framework engineered to ignite intellectual passions, physical endurance, and ethical values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-elevated transition-all border border-brand-border group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2.5 font-display">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {pillar.desc}
                    </p>
                  </div>
                  <Link
                    to="/academics"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CAMPUS VISUAL SHOWCASE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3 py-1 rounded-full">
                World-Class Campus
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-display mt-2">
                Designed for Discovery &amp; Achievement
              </h2>
            </div>
            <Link
              to="/facilities"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blue-dark transition-colors"
            >
              <span>View All Campus Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group rounded-2xl overflow-hidden shadow-md h-80">
              <img
                src="/images/campus/campus-library.png"
                alt="Knowledge Commons Library"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
                  Academic Hub
                </span>
                <h3 className="text-xl font-bold mt-1">Knowledge Commons Library</h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  Double-height commons with 50,000+ volumes, digital databases, and quiet research carrels.
                </p>
              </div>
            </div>

            <div className="relative group rounded-2xl overflow-hidden shadow-md h-80">
              <img
                src="/images/campus/campus-sports.png"
                alt="Olympic Sports Arena"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
                  Athletics
                </span>
                <h3 className="text-xl font-bold mt-1">Olympic Sports Complex</h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  Synthetic all-weather running track, indoor heated swimming pool, and FIFA-standard turf.
                </p>
              </div>
            </div>

            <div className="relative group rounded-2xl overflow-hidden shadow-md h-80">
              <img
                src="/images/campus/campus-quadrangle.png"
                alt="Campus Quadrangle"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">
                  Campus Life
                </span>
                <h3 className="text-xl font-bold mt-1">South Wing Quadrangle</h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  Expansive recreational lawns connecting academic pavilions and botanical gardens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOTICES & EVENTS DUAL SECTION */}
      <section className="py-20 bg-brand-soft/60 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Latest Notices */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-brand-navy text-brand-cyan flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy font-display">Official Notices</h3>
                    <p className="text-xs text-brand-muted">Latest circulars &amp; announcements</p>
                  </div>
                </div>
                <Link
                  to="/notices"
                  className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    className="bg-white p-4 rounded-xl border border-brand-border shadow-xs hover:border-brand-blue transition-all"
                  >
                    <div className="flex items-center justify-between text-xs text-brand-muted mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-brand-soft text-brand-blue font-bold">
                        {n.category}
                      </span>
                      <span>{n.date}</span>
                    </div>
                    <Link
                      to="/notices"
                      className="font-bold text-brand-navy hover:text-brand-blue text-sm line-clamp-1 transition-colors"
                    >
                      {n.title}
                    </Link>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {n.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Upcoming Events */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-brand-blue text-white flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy font-display">Upcoming Events</h3>
                    <p className="text-xs text-brand-muted">Academic calendar &amp; school events</p>
                  </div>
                </div>
                <Link
                  to="/events"
                  className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
                >
                  <span>Calendar</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-white p-4 rounded-xl border border-brand-border shadow-xs hover:shadow-md transition-all flex gap-4 items-start"
                  >
                    <div className="w-16 h-16 rounded-xl bg-brand-navy text-white shrink-0 flex flex-col items-center justify-center text-center p-1">
                      <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-wider">
                        {ev.date ? new Date(ev.date).toLocaleString('default', { month: 'short' }) : 'OCT'}
                      </span>
                      <span className="text-xl font-extrabold leading-none">
                        {ev.date ? new Date(ev.date).getDate() : '28'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                        {ev.category}
                      </span>
                      <h4 className="font-bold text-brand-navy text-sm mt-1 hover:text-brand-blue transition-colors">
                        {ev.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">{ev.venue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARENT & ALUMNI TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3 py-1 rounded-full">
              Voices of our Community
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy font-display mt-2">
              The XYZ School Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-brand-light p-8 rounded-2xl border border-brand-border relative"
              >
                <Quote className="w-10 h-10 text-brand-blue/15 absolute top-6 right-6" />
                <p className="text-slate-700 italic text-base leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-bold text-brand-navy text-sm">{t.author}</h4>
                  <p className="text-xs text-brand-muted">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-r from-brand-navy via-brand-navy-dark to-brand-blue text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
              Begin Your Journey with XYZ School
            </h2>
            <p className="text-slate-200 text-base">
              Admissions for Academic Year 2026-2027 are currently open for Pre-KG through Grade 11. Schedule a campus discovery tour today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              to="/admissions"
              className="px-8 py-3.5 rounded-xl bg-brand-cyan hover:bg-white text-brand-navy font-bold text-sm shadow-lg transition-all"
            >
              Apply Online
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              Contact Admissions Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
