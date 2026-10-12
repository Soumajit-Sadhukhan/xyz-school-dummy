import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const Contact = () => {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill out all required contact fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.submitContactMessage(formData);
      setSubmitted(true);
      addToast('Thank you! Your message has been sent to the school administration.', 'success');
    } catch {
      addToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Contact XYZ School"
        subtitle="Have questions about admissions, academic programs, or campus visits? Our administrative desk is here to assist you."
        badge="Connect With Us"
        breadcrumbs={[{ name: 'Contact' }]}
      />

      {/* MAIN CONTACT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info & Address Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-soft px-3 py-1 rounded-full">
                  Campus Location
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-display">
                  Get In Touch
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We look forward to welcoming you to our 25-acre green academic sanctuary in Heritage City.
                </p>
              </div>

              {/* Info cards */}
              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-brand-light border border-brand-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-cyan flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-navy">Campus Address</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Plot 12, Academic Enclave, Sector 8, Knowledge Boulevard, Heritage City - 110045
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-brand-light border border-brand-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-cyan flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-navy">Telephone Helplines</h4>
                    <p className="text-xs text-slate-600 mt-1 space-y-0.5">
                      <span>General Office: +1 (800) 555-0199</span><br />
                      <span>Admissions Hotline: +1 (800) 555-0188</span>
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-brand-light border border-brand-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-cyan flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-navy">Official Email Desks</h4>
                    <p className="text-xs text-slate-600 mt-1 space-y-0.5">
                      <span>General Inquiries: info@xyzschool.edu</span><br />
                      <span>Admissions Desk: admissions@xyzschool.edu</span>
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-brand-light border border-brand-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-cyan flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-navy">Visiting &amp; Office Hours</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Monday to Friday: 07:45 AM – 03:45 PM<br />
                      Saturday: 08:30 AM – 12:30 PM (Admissions Only)<br />
                      Sunday &amp; Gazetted Holidays: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-brand-light p-8 sm:p-10 rounded-3xl border border-brand-border shadow-sm">
              <div className="mb-6">
                <h3 className="text-2xl font-extrabold text-brand-navy font-display">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Our front office typically responds within one business day.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-900 font-display">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                    Thank you, {formData.name}. Your message regarding "{formData.subject || 'General Inquiry'}" has been forwarded to our school administrative team.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Eleanor Jenkins"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Cambridge IGCSE inquiries"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please share details of your inquiry..."
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER VISUAL */}
      <section className="py-12 bg-slate-100 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-3xl border border-brand-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand-blue flex items-center justify-center shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-navy text-base">XYZ School Flagship Campus</h4>
                <p className="text-xs text-slate-500">25-Acre Gated Campus • 15 Mins from Metro Junction</p>
              </div>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-blue transition-colors flex items-center gap-2"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
