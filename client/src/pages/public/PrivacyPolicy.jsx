import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { ShieldCheck, Lock, FileText, Eye, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div>
      <PageHeader
        title="Privacy Policy & Data Protection"
        subtitle="Our commitment to safeguarding student, parent, and institutional data privacy with the highest institutional standards."
        badge="Legal & Compliance"
        breadcrumbs={[{ name: 'Privacy Policy' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="p-6 rounded-2xl bg-brand-light border border-brand-border flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-brand-blue shrink-0 mt-1" />
            <div>
              <h3 className="text-base font-bold text-brand-navy">Commitment to Student &amp; Family Privacy</h3>
              <p className="text-xs text-slate-600 mt-1">
                Last Updated: October 2026. This policy applies to all visitors, registered students, parents, and personnel using XYZ School websites, portals, and digital administrative systems.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-navy font-display">1. Information We Collect</h2>
            <p>
              When you submit an admission enquiry, register for campus events, or access our Parent-Teacher portal, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
              <li>Candidate and guardian contact details (name, email address, telephone numbers, residential address).</li>
              <li>Academic transcripts, diagnostic evaluation records, and prior schooling history.</li>
              <li>Emergency medical contacts, allergy notices, and immunization certificates necessary for student campus safety.</li>
              <li>Technical log data, browser cookies, and session diagnostics for portal uptime security.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-navy font-display">2. Purpose of Data Processing</h2>
            <p>
              All student and parent records are utilized strictly for legitimate educational, regulatory, and safety purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
              <li>Evaluating admission suitability and administering scholastic diagnostic assessments.</li>
              <li>Communicating official circulars, report cards, fee schedules, and emergency notices.</li>
              <li>Fulfilling statutory reporting to the Central Board of Secondary Education (CBSE) and Cambridge Assessment.</li>
              <li>Ensuring security via access-controlled campus gates and GPS transport fleet tracking.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-navy font-display">3. Confidentiality &amp; Third-Party Restrictions</h2>
            <p>
              XYZ School does <strong>not sell, lease, or commercialize</strong> student or parent records to any marketing or commercial entities under any circumstances. Data is only shared with accredited examination boards or authorized cloud infrastructure providers bound by strict confidentiality and non-disclosure covenants.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-navy font-display">4. Parent Rights &amp; Data Officer Contact</h2>
            <p>
              Parents and legal guardians retain the right to review their child's academic dossiers, update contact coordinates, or request clarification regarding record storage. For privacy queries, please write to:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <p><strong>Office of Institutional Compliance &amp; Data Protection</strong></p>
              <p>XYZ School, Plot 12, Academic Enclave, Sector 8, Heritage City</p>
              <p>Email: <a href="mailto:privacy@xyzschool.edu" className="text-brand-blue underline">privacy@xyzschool.edu</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
