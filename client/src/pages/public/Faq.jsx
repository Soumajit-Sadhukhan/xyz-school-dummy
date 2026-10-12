import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const faqs = [
    {
      category: 'Admissions',
      question: 'What is the entry age requirement for Nursery / Pre-KG and Kindergarten?',
      answer:
        'Children seeking admission to Pre-KG / Nursery must have attained 3 years of age by June 1 of the academic year. For Kindergarten, children should be 4+ years, and for Grade 1, 5+ to 6 years of age.',
    },
    {
      category: 'Admissions',
      question: 'When do admissions open for the 2026-2027 academic session?',
      answer:
        'Admissions for the upcoming academic session commence in October and remain open subject to seat availability across respective grade cohorts. Early registration is advised for Cambridge IGCSE and Grade 11 streams.',
    },
    {
      category: 'Academics',
      question: 'What is the difference between CBSE and Cambridge International curriculum pathways at XYZ School?',
      answer:
        'The CBSE curriculum offers exhaustive depth aligned with Indian national educational competitive benchmarks (such as JEE, NEET, CUET). Cambridge IGCSE and A-Levels provide international criterion-based assessments, research-heavy subject combinations, and global university reciprocity.',
    },
    {
      category: 'Academics',
      question: 'What is the teacher-student ratio maintained across classrooms?',
      answer:
        'We enforce a strict 1:12 teacher-to-student ratio in foundational years (Pre-KG to Grade 2), and a maximum of 1:20 in middle and senior secondary classes to guarantee individual attention.',
    },
    {
      category: 'Facilities',
      question: 'What sports coaching is provided during and after school hours?',
      answer:
        'Our Olympic sports complex supports 14 disciplines including Swimming, Athletics (400m synthetic track), Basketball, Lawn Tennis, Badminton, Football, Cricket, and Table Tennis under licensed national coaches.',
    },
    {
      category: 'Transport & Safety',
      question: 'How is safety monitored on campus and in school transport?',
      answer:
        'The campus operates 300+ HD CCTV cameras with 24/7 security perimeter guards. All 35 school buses feature GPS telemetry, speed governors, CCTV cameras, and verified female attendants.',
    },
    {
      category: 'Fees & Scholarships',
      question: 'Does XYZ School provide merit or sports scholarships?',
      answer:
        'Yes. We offer merit scholarships (covering 20% to 50% of annual tuition) for students who achieve outstanding scholastic ranks in board examinations or represent the state/country in sports or Olympiads.',
    },
    {
      category: 'Campus Life',
      question: 'What are the school timings for different grades?',
      answer:
        'Foundational Wing (Pre-KG - Gr 2): 08:00 AM – 12:45 PM. Primary & Middle Wing (Gr 3 - 8): 07:45 AM – 02:45 PM. Senior Wing (Gr 9 - 12): 07:45 AM – 03:30 PM (with optional sports and remedial coaching till 04:30 PM).',
    },
  ];

  const categories = ['All', 'Admissions', 'Academics', 'Facilities', 'Transport & Safety', 'Fees & Scholarships'];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCat = activeCategory === 'All' || f.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Clear answers regarding admissions guidelines, curriculums, school timings, sports facilities, and safety policies."
        badge="Parent Support"
        breadcrumbs={[{ name: 'FAQ' }]}
      />

      {/* SEARCH & FILTERS */}
      <section className="py-10 bg-brand-light border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative mb-6">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-xs"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-brand-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ACCORDION LIST */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <HelpCircle className="w-12 h-12 mx-auto stroke-1" />
              <p className="text-base font-semibold">No questions matched your search query.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-brand-border overflow-hidden transition-all bg-white shadow-xs"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-soft text-brand-blue">
                        {faq.category}
                      </span>
                      <h3 className="text-base font-bold text-brand-navy font-display">{faq.question}</h3>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-brand-navy">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-brand-light/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* STILL HAVE QUESTIONS */}
      <section className="py-16 bg-brand-soft/60 border-t border-brand-border text-center">
        <div className="max-w-xl mx-auto px-4 space-y-3">
          <MessageSquare className="w-8 h-8 text-brand-blue mx-auto" />
          <h3 className="text-xl font-bold text-brand-navy font-display">Still have unanswered questions?</h3>
          <p className="text-xs text-slate-600">
            Our admissions counselors and front office desk are ready to assist you anytime.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold transition-all"
            >
              Contact Our Administrative Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
