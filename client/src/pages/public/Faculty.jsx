import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Mail, Award, BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

export const Faculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    const fetchFaculty = async () => {
      const data = await api.getFaculty();
      setFacultyList(data);
    };
    fetchFaculty();
  }, []);

  const departments = ['All', 'Leadership', 'Sciences', 'Mathematics', 'Humanities', 'Athletics'];

  const filteredFaculty =
    selectedDept === 'All'
      ? facultyList
      : facultyList.filter((f) => f.department.toLowerCase() === selectedDept.toLowerCase());

  return (
    <div>
      <PageHeader
        title="Distinguished Faculty"
        subtitle="Mentors, scholars, and Olympic coaches committed to igniting student passions, academic rigor, and empathetic leadership."
        badge="Academic Mentorship"
        breadcrumbs={[{ name: 'Faculty' }]}
      />

      {/* DEPARTMENT FILTER TABS */}
      <section className="py-12 bg-brand-light border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedDept === dept
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-brand-border'
                }`}
              >
                {dept === 'All' ? 'All Departments' : dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-brand-border shadow-xs hover:shadow-elevated transition-all overflow-hidden flex flex-col group"
              >
                {/* Photo container */}
                <div className="h-64 overflow-hidden relative bg-slate-100">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-brand-navy/90 backdrop-blur-md text-brand-cyan text-xs font-bold uppercase tracking-wider border border-white/20">
                      {member.department}
                    </span>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy font-display group-hover:text-brand-blue transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-brand-blue uppercase tracking-wide mt-0.5">
                      {member.designation}
                    </p>

                    <div className="mt-3 pt-3 border-t border-brand-border/60 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <span>{member.qualification}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-brand-blue shrink-0" />
                        <span>{member.experience} Teaching Experience</span>
                      </div>
                    </div>

                    {member.bio && (
                      <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{member.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHING PHILOSOPHY CARD */}
      <section className="py-16 bg-brand-soft/60 border-t border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-white px-3.5 py-1 rounded-full border border-brand-border">
            Academic Standards
          </span>
          <h2 className="text-3xl font-extrabold text-brand-navy font-display">
            100% Post-Graduate &amp; Certified Educators
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every teacher at XYZ School undergoes over 120 hours of annual pedagogical development, Cambridge International workshops, and pastoral counseling training to provide inspiring individual mentorship.
          </p>
        </div>
      </section>
    </div>
  );
};
