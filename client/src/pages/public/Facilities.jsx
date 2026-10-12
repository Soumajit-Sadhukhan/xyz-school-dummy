import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import {
  BookOpen,
  Trophy,
  Cpu,
  HeartPulse,
  Bus,
  Utensils,
  Leaf,
  Sparkles,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Facilities = () => {
  const facilityHighlights = [
    {
      title: 'Knowledge Commons Central Library',
      category: 'Scholastic Hub',
      desc: 'Soaring double-height architectural pavilion housing over 50,000 literary and research volumes, global periodicals, high-speed digital research carrels, and collaborative study pods.',
      image: '/images/campus/campus-library.png',
      features: ['50,000+ Physical & Digital Books', 'JSTOR & Ebsco Academic Access', 'Acoustic Silent Study Zones', 'Early Readers Corner'],
      icon: BookOpen,
    },
    {
      title: 'Olympic Sports Arena & Heated Aquatics Complex',
      category: 'Athletics & Physical Wellness',
      desc: 'Built to Olympic specifications, featuring an 8-lane all-weather 400m synthetic running track, standard heated indoor 50m competition swimming pool, professional cricket pitch, and covered basketball courts.',
      image: '/images/campus/campus-sports.png',
      features: ['All-Weather Synthetic Track', '50m Heated Indoor Pool', 'FIFA-Standard Football Pitch', 'Coaching in 14 Disciplines'],
      icon: Trophy,
    },
    {
      title: 'STEM Innovation Labs & Robotics Maker Suite',
      category: 'Scientific Research',
      desc: 'High-tech laboratories equipped with 3D printers, laser cutters, programmable microcontrollers, drone simulators, and separate college-grade laboratories for Physics, Chemistry, and Biology.',
      image: '/images/campus/campus-hero.png',
      features: ['Individual Student Workstations', '3D Prototyping & AI Workstations', 'Safety Chemical Fume Hoods', 'Maker Space & Arduino Kits'],
      icon: Cpu,
    },
    {
      title: 'South Wing Quadrangle & Botanical Spaces',
      category: 'Recreation & Ecology',
      desc: 'Expansive central lawns connecting primary and secondary wings, featuring indigenous flora, outdoor amphitheaters, shaded meditation courtyards, and solar pergolas.',
      image: '/images/campus/campus-quadrangle.png',
      features: ['25-Acre Eco-Friendly Perimeter', 'Solar-Powered Lighting Grid', 'Rainwater Harvesting Plant', 'Outdoor Discussion Courtyards'],
      icon: Leaf,
    },
  ];

  const supportingFacilities = [
    {
      title: 'Tagore Grand Auditorium',
      desc: '1,200-seat acoustically treated auditorium with automated stage rigging and Dolby sound for musical recitals, plays, and symposia.',
      icon: Sparkles,
    },
    {
      title: '24/7 Campus Medical Care Center',
      desc: 'Fully equipped 6-bed health bay staffed by full-time resident physicians and trained pediatric nurses with immediate hospital tie-ups.',
      icon: HeartPulse,
    },
    {
      title: 'GPS-Tracked Safe Transport Fleet',
      desc: 'Fleet of 35 air-conditioned buses equipped with speed governors, CCTV cameras, live GPS telemetry, and trained female attendants.',
      icon: Bus,
    },
    {
      title: 'Nutritionist-Approved Dining Hall',
      desc: 'Hygienic multi-cuisine cafeteria providing fresh, farm-sourced breakfast, lunches, and evening snacks under pediatric nutritionist supervision.',
      icon: Utensils,
    },
  ];

  return (
    <div>
      <PageHeader
        title="World-Class Facilities"
        subtitle="Designed to inspire intellectual wonder, athletic endurance, and creative expression across our expansive 25-acre modern campus."
        badge="Campus Infrastructure"
        breadcrumbs={[{ name: 'Facilities' }]}
      />

      {/* CORE HIGHLIGHTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {facilityHighlights.map((fac, idx) => {
            const isReversed = idx % 2 !== 0;
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-brand-soft text-brand-blue flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3 py-1 rounded-full">
                      {fac.category}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display">
                    {fac.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {fac.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {fac.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[360px] group">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SUPPORTING CAMPUS AMENITIES */}
      <section className="py-20 bg-brand-light border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3.5 py-1 rounded-full">
              Holistic Care
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy font-display">
              Student Well-Being &amp; Campus Safety
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportingFacilities.map((sup, idx) => {
              const Icon = sup.icon;
              return (
                <div key={idx} className="bg-white p-7 rounded-2xl border border-brand-border shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand-blue flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-brand-navy font-display">{sup.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{sup.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VISIT CAMPUS CTA */}
      <section className="py-16 bg-brand-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-3xl font-extrabold font-display">Experience XYZ School In Person</h2>
          <p className="text-slate-300 text-sm">
            We welcome prospective families for guided weekend and weekday campus tours. Experience our laboratories, athletics stadium, and classrooms firsthand.
          </p>
          <div className="pt-2">
            <Link
              to="/admissions#apply"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-blue-glow transition-all"
            >
              <span>Schedule a Campus Walkthrough</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
