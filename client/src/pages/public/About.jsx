import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import {
  Award,
  Target,
  Compass,
  Heart,
  Shield,
  BookOpen,
  CheckCircle2,
  Users,
  Building2,
  GraduationCap,
} from 'lucide-react';

export const About = () => {
  const values = [
    {
      title: 'Integrity & Ethics',
      desc: 'We cultivate truthful, empathetic, and responsible global citizens who honor their commitments.',
      icon: Shield,
    },
    {
      title: 'Academic Excellence',
      desc: 'A steadfast pursuit of intellectual rigor, research curiosity, and scholastic distinction.',
      icon: BookOpen,
    },
    {
      title: 'Inclusive Compassion',
      desc: 'An egalitarian community embracing diversity, emotional wellness, and mutual respect.',
      icon: Heart,
    },
    {
      title: 'Visionary Leadership',
      desc: 'Inspiring self-belief, courage, and adaptive problem-solving skills for 21st-century realities.',
      icon: Compass,
    },
  ];

  const milestones = [
    { year: '1998', title: 'Foundation', desc: 'Established with 120 students and a vision for progressive holistic pedagogy.' },
    { year: '2005', title: 'CBSE Affiliation', desc: 'Achieved complete CBSE Senior Secondary affiliation with 100% board pass rates.' },
    { year: '2014', title: 'Cambridge International Accreditation', desc: 'Introduced Cambridge IGCSE & A-Levels pathways with specialized STEM labs.' },
    { year: '2021', title: 'Smart Campus Expansion', desc: 'Inauguration of the 25-acre green architectural campus with Olympic sports facilities.' },
    { year: '2026', title: 'Silver Jubilee & Beyond', desc: 'Recognized in the Top 10 National Schools with alumni at Harvard, MIT, and Oxford.' },
  ];

  return (
    <div>
      <PageHeader
        title="About XYZ School"
        subtitle="A heritage of intellectual excellence, visionary leadership, and character formation spanning over two and a half decades."
        badge="Heritage & Vision"
        breadcrumbs={[{ name: 'About Us' }]}
      />

      {/* FOUNDER & VISION OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3.5 py-1 rounded-full">
                Our Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-display leading-tight">
                Shaping Leaders for a Global Tomorrow Since 1998
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                XYZ School was conceived as an intellectual home where traditional Indian ethos seamlessly blends with contemporary global academic frameworks. Founded under the aegis of the XYZ Educational Trust, our institution has grown into an international benchmark for progressive schooling.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Nestled on 25 acres of lush landscaped grounds in Heritage City, our architecture reflects a confluence of classic collegiate design and cutting-edge ecological technology.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-brand-light border border-brand-border">
                  <div className="text-2xl font-extrabold text-brand-navy">28+</div>
                  <div className="text-xs font-semibold text-brand-muted">Years of Distinction</div>
                </div>
                <div className="p-4 rounded-xl bg-brand-light border border-brand-border">
                  <div className="text-2xl font-extrabold text-brand-blue">6,200+</div>
                  <div className="text-xs font-semibold text-brand-muted">Global Alumni Network</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/campus/campus-quadrangle.png"
                  alt="XYZ School Heritage Quadrangle"
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION DUAL CARDS */}
      <section className="py-16 bg-brand-light border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-brand-border space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand-blue flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy font-display">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                To be a premier global center of school education recognized for academic brilliance, moral fortitude, and the nurturing of conscious, inquisitive leaders who contribute meaningfully to a sustainable and peaceful world.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-brand-border space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand-blue flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy font-display">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                To provide a stimulating, safe, and technologically forward learning environment where skilled educators inspire every student to unlock their highest intellectual, creative, athletic, and humanitarian potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3 py-1 rounded-full">
              Guiding Principles
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy font-display">
              The Values We Live By
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-brand-light border border-brand-border space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-cyan flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-navy font-display">{v.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section className="py-20 bg-brand-soft/60 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3 py-1 rounded-full">
              Journey Through Time
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy font-display">
              Our Journey of Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-brand-border shadow-xs relative">
                <span className="text-2xl font-black text-brand-blue font-display block mb-2">
                  {m.year}
                </span>
                <h4 className="text-sm font-bold text-brand-navy mb-1">{m.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCREDITATIONS & PARTNERSHIPS */}
      <section className="py-16 bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-bold text-brand-navy uppercase tracking-wider mb-8">
            Accreditations &amp; Global Affiliations
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-80">
            <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
              <Award className="w-6 h-6 text-brand-blue" />
              <span>Central Board of Secondary Education (CBSE)</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
              <GraduationCap className="w-6 h-6 text-brand-blue" />
              <span>Cambridge Assessment International Education</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
              <Building2 className="w-6 h-6 text-brand-blue" />
              <span>Indian Green Building Council (IGBC Platinum)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
