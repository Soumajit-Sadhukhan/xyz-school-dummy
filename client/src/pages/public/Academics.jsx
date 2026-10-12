import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import {
  BookOpen,
  Award,
  Sparkles,
  GraduationCap,
  Microscope,
  Cpu,
  Globe2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Academics = () => {
  const [activeTab, setActiveTab] = useState('cambridge');

  const levels = [
    {
      level: 'Early Childhood Foundation',
      grades: 'Pre-KG to Grade 2 (Ages 3 - 7)',
      desc: 'Play-centric, sensorial, and Reggio Emilia inspired discovery environment building curiosity, phonics literacy, and gross motor confidence.',
      subjects: ['Emergent Literacy', 'Playful Math', 'Sensory Arts', 'Nature Discovery', 'Music & Movement'],
    },
    {
      level: 'Primary School Wing',
      grades: 'Grades 3 to 5 (Ages 8 - 10)',
      desc: 'Inquiry-based foundational curriculum reinforcing bilingual communication, scientific observation, and mathematical problem solving.',
      subjects: ['English & Hindi/French', 'Applied Mathematics', 'General Science', 'Social Studies', 'Coding Fundamentals'],
    },
    {
      level: 'Middle School Wing',
      grades: 'Grades 6 to 8 (Ages 11 - 13)',
      desc: 'Transition into rigorous departmental science laboratories, analytical humanities, and digital literacy frameworks.',
      subjects: ['Physics, Chemistry, Biology', 'Advanced Algebra & Geometry', 'Global Perspectives', 'Third Language', 'Robotics'],
    },
    {
      level: 'Senior Secondary Wing',
      grades: 'Grades 9 to 12 (Ages 14 - 18)',
      desc: 'Choice of CBSE or Cambridge IGCSE / A-Levels with specialized career tracks in STEM, Commerce, and Liberal Arts with university counseling.',
      subjects: ['Science Stream (PCM/PCB)', 'Commerce & Finance', 'Humanities & Law', 'Computer Science & AI', 'Advanced Placement'],
    },
  ];

  return (
    <div>
      <PageHeader
        title="Academic Excellence"
        subtitle="A future-focused dual curriculum blending rigorous academic scholarship, applied scientific inquiry, and global cultural competencies."
        badge="Curriculum & Pathways"
        breadcrumbs={[{ name: 'Academics' }]}
      />

      {/* CURRICULUM OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3.5 py-1 rounded-full">
              Global Academic Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-display">
              Two World-Class Academic Frameworks
            </h2>
            <p className="text-slate-600 text-base">
              Students and parents can choose between the nationally esteemed CBSE curriculum or the globally accredited Cambridge International syllabus.
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 rounded-2xl bg-brand-light border border-brand-border">
              <button
                onClick={() => setActiveTab('cambridge')}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'cambridge'
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'text-brand-text hover:text-brand-blue'
                }`}
              >
                Cambridge Assessment International (CIE)
              </button>
              <button
                onClick={() => setActiveTab('cbse')}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'cbse'
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'text-brand-text hover:text-brand-blue'
                }`}
              >
                Central Board of Secondary Education (CBSE)
              </button>
            </div>
          </div>

          {/* Content for active framework */}
          <div className="bg-brand-light rounded-2xl p-8 sm:p-12 border border-brand-border">
            {activeTab === 'cambridge' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-white px-3 py-1 rounded-md border border-brand-border">
                    Centre ID: IN842
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display">
                    Cambridge IGCSE &amp; AS/A Levels
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    The Cambridge curriculum emphasizes critical inquiry, applied research methodologies, and independent thinking. Globally recognized by universities across the UK, USA, Canada, and Europe.
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>Internationally benchmarked examinations and criterion-based assessments.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>Choice of over 24 subjects including Global Perspectives &amp; AI Ethics.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>Direct pathway for Ivy League, Russell Group, and prestigious foreign admissions.</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg border-2 border-white">
                  <img
                    src="/images/campus/campus-library.png"
                    alt="Cambridge Research Commons"
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-white px-3 py-1 rounded-md border border-brand-border">
                    Affiliation No: 2130894
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display">
                    CBSE Senior Secondary Excellence
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Our CBSE program offers unmatched depth in foundational STEM, commerce, and humanities, coupled with integrated coaching for national competitive examinations (JEE Advanced, NEET, CLAT, CUET).
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>Consistently ranked #1 in district board results with 100% first-division pass rates.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>Integrated in-house coaching by veteran IITians and medical faculty.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>Rigorous practical laboratory training in state-certified research labs.</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg border-2 border-white">
                  <img
                    src="/images/campus/campus-faculty.png"
                    alt="CBSE Academic Wing"
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GRADE LEVELS BREAKDOWN */}
      <section className="py-20 bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3 py-1 rounded-full">
              Growth Stages
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy font-display">
              Academic Wings &amp; Grade Structure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {levels.map((lvl, idx) => (
              <div
                key={idx}
                className="bg-brand-light p-8 rounded-2xl border border-brand-border hover:border-brand-blue transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3 py-1 rounded-md">
                    {lvl.grades}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-brand-navy font-display">{lvl.level}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{lvl.desc}</p>
                <div>
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">
                    Key Subject Pillars:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {lvl.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs px-2.5 py-1 rounded-md bg-white border border-brand-border text-slate-700 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-3xl font-extrabold font-display">
            Interested in Learning More About Our Academic Syllabi?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Download our comprehensive curriculum guide or book an interaction with our Academic Deans.
          </p>
          <div className="pt-2">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-blue-glow transition-all"
            >
              <span>Apply for 2026-27 Academic Admissions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
