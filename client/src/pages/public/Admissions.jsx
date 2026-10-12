import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import {
  FileText,
  UserCheck,
  Calendar,
  CreditCard,
  Send,
  CheckCircle2,
  HelpCircle,
  Phone,
  Mail,
  Download,
  AlertCircle,
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const Admissions = () => {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    grade: 'Grade 1',
    academicYear: '2026-2027',
    previousSchool: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName || !formData.email || !formData.phone) {
      addToast('Please complete all mandatory fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.submitAdmissionEnquiry(formData);
      setSubmitted(true);
      addToast('Admission enquiry submitted successfully! Our admissions counsellor will contact you within 24 hours.', 'success');
    } catch {
      addToast('Failed to submit enquiry. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Online Enquiry & Registration',
      desc: 'Submit the digital admission inquiry form below or visit our Admissions Welcome Center.',
      icon: FileText,
    },
    {
      num: '02',
      title: 'Campus Tour & Family Interaction',
      desc: 'Meet our academic leadership and tour our science labs, sports arena, and classrooms.',
      icon: UserCheck,
    },
    {
      num: '03',
      title: 'Diagnostic Readiness Assessment',
      desc: 'Age-appropriate conversational or written assessment to understand student learning style.',
      icon: Calendar,
    },
    {
      num: '04',
      title: 'Offer Letter & Enrollment Formalities',
      desc: 'Provisional admission letter issued upon clearance; completion of fee deposit and documentation.',
      icon: CreditCard,
    },
  ];

  const feeStructure = [
    { grade: 'Pre-KG - Kindergarten', termFee: '$1,850', annualTuition: '$5,550', techLab: 'Included' },
    { grade: 'Grades 1 to 5 (Primary)', termFee: '$2,200', annualTuition: '$6,600', techLab: 'Included' },
    { grade: 'Grades 6 to 8 (Middle)', termFee: '$2,650', annualTuition: '$7,950', techLab: '$250/yr' },
    { grade: 'Grades 9 & 10 (CBSE / IGCSE)', termFee: '$3,100', annualTuition: '$9,300', techLab: '$350/yr' },
    { grade: 'Grades 11 & 12 (Senior Wing)', termFee: '$3,600', annualTuition: '$10,800', techLab: '$400/yr' },
  ];

  return (
    <div>
      <PageHeader
        title="Admissions 2026-2027"
        subtitle="Embark on an inspiring academic journey. Discover our transparent admission roadmap, fee schedule, and application guidelines."
        badge="Enrollment Open"
        breadcrumbs={[{ name: 'Admissions' }]}
      />

      {/* ADMISSION ROADMAP */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3.5 py-1 rounded-full">
              Streamlined Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-display">
              Four Steps to Joining XYZ School
            </h2>
            <p className="text-slate-600 text-base">
              Our admission officers guide prospective parents with utmost transparency and prompt care at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className="bg-brand-light p-6 rounded-2xl border border-brand-border relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-brand-blue/30 font-display">
                        {st.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-cyan flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2 font-display">{st.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM AND PROSPECTUS SECTION */}
      <section className="py-20 bg-brand-soft/50 border-y border-brand-border" id="apply">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-brand-border shadow-elevated">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3 py-1 rounded-full">
                  Online Registration
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display mt-2">
                  Submit Admission Enquiry
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Fill in candidate details below to schedule an entrance assessment or admissions consultation.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-emerald-900 font-display">
                    Application Received!
                  </h4>
                  <p className="text-emerald-800 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.parentName}</strong>. We have registered the enquiry for{' '}
                    <strong>{formData.studentName}</strong> ({formData.grade}). An admissions counsellor will call you on{' '}
                    <strong>{formData.phone}</strong> within 1 working day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        studentName: '',
                        parentName: '',
                        email: '',
                        phone: '',
                        grade: 'Grade 1',
                        academicYear: '2026-2027',
                        previousSchool: '',
                        notes: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Aarav Mehta"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Vikram Mehta"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="parent.name@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+1 (800) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                        Grade Applying For *
                      </label>
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-brand-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm transition-all"
                      >
                        <option value="Pre-KG / Nursery">Pre-KG / Nursery</option>
                        <option value="Kindergarten">Kindergarten</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Grade 4">Grade 4</option>
                        <option value="Grade 5">Grade 5</option>
                        <option value="Grade 6">Grade 6</option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9 (CBSE / Cambridge)">Grade 9 (CBSE / Cambridge)</option>
                        <option value="Grade 10">Grade 10</option>
                        <option value="Grade 11 (Science / Comm / Arts)">Grade 11 (Science / Comm / Arts)</option>
                        <option value="Grade 12">Grade 12</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                        Academic Cycle
                      </label>
                      <select
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-brand-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm transition-all"
                      >
                        <option value="2026-2027">2026-2027 (Immediate / Upcoming)</option>
                        <option value="2027-2028">2027-2028 (Next Academic Year)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                      Current / Previous School (If Applicable)
                    </label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      placeholder="e.g. St. Xavier International Academy"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                      Specific Questions or Special Requirements
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us about your child's interests, learning needs, or queries..."
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-blue-glow hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Application...' : 'Submit Admission Application'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Admissions Office Contact & Prospectus */}
            <div className="lg:col-span-5 space-y-8">
              {/* Image banner */}
              <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-white relative h-64">
                <img
                  src="/images/campus/campus-admissions.png"
                  alt="Admissions Welcome Lounge"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs text-brand-cyan uppercase font-bold tracking-wider">
                      Welcome Center
                    </span>
                    <h4 className="text-lg font-bold">Personalized Campus Tours</h4>
                  </div>
                </div>
              </div>

              {/* Help & Helpline card */}
              <div className="bg-white p-7 rounded-2xl border border-brand-border space-y-4">
                <h4 className="text-lg font-bold text-brand-navy font-display">
                  Admissions Helpline
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our dedicated admission deans are available Monday through Saturday to answer curriculum and admissions queries.
                </p>
                <div className="space-y-2.5 text-sm">
                  <a
                    href="tel:+18005550188"
                    className="flex items-center gap-3 p-3 rounded-xl bg-brand-light text-brand-navy hover:bg-brand-soft transition-colors font-semibold"
                  >
                    <Phone className="w-4 h-4 text-brand-blue" />
                    <span>+1 (800) 555-0188 (Direct Desk)</span>
                  </a>
                  <a
                    href="mailto:admissions@xyzschool.edu"
                    className="flex items-center gap-3 p-3 rounded-xl bg-brand-light text-brand-navy hover:bg-brand-soft transition-colors font-semibold"
                  >
                    <Mail className="w-4 h-4 text-brand-blue" />
                    <span>admissions@xyzschool.edu</span>
                  </a>
                </div>
              </div>

              {/* Prospectus download */}
              <div className="bg-brand-navy text-white p-7 rounded-2xl space-y-3">
                <h4 className="text-lg font-bold font-display">Download School Prospectus</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Get our comprehensive 36-page brochure featuring campus infrastructure, curriculum outlines, and faculty credentials.
                </p>
                <button
                  onClick={() => addToast('School Prospectus PDF 2026-27 downloaded successfully.', 'info')}
                  className="w-full py-3 rounded-xl bg-brand-cyan text-brand-navy font-bold text-xs flex items-center justify-center gap-2 hover:bg-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Prospectus (PDF 8.4 MB)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE OF TUITION FEES TABLE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3.5 py-1 rounded-full">
              Transparent Fees
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy font-display">
              Schedule of Academic Fees (2026-2027)
            </h2>
            <p className="text-slate-600 text-sm">
              All fees include academic tuition, sports coaching, library resources, and digital learning modules.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-brand-border shadow-xs">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-brand-navy text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Grade / Wing</th>
                  <th className="py-4 px-6">Term Fee (Quarterly)</th>
                  <th className="py-4 px-6">Annual Composite Tuition</th>
                  <th className="py-4 px-6">STEM &amp; Robotics Labs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {feeStructure.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <td className="py-4 px-6 font-semibold text-brand-navy">{row.grade}</td>
                    <td className="py-4 px-6 text-slate-700">{row.termFee}</td>
                    <td className="py-4 px-6 font-bold text-brand-blue">{row.annualTuition}</td>
                    <td className="py-4 px-6 text-slate-600">{row.techLab}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
            * Transport service and cafeteria lunch meal plans are billed separately based on route and meal choice. Merit scholarships up to 40% available for exemplary students.
          </p>
        </div>
      </section>
    </div>
  );
};
