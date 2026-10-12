import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      default: 'XYZ School',
    },
    tagline: {
      type: String,
      default: 'Excellence in Education, Character in Life',
    },
    affiliationNo: {
      type: String,
      default: '2130894 (CBSE & Cambridge International)',
    },
    address: {
      type: String,
      default: 'Plot 12, Academic Enclave, Sector 8, Knowledge Boulevard, Heritage City - 110045',
    },
    phone: {
      type: String,
      default: '+1 (800) 555-0199',
    },
    admissionsHotline: {
      type: String,
      default: '+1 (800) 555-0188',
    },
    email: {
      type: String,
      default: 'info@xyzschool.edu',
    },
    admissionsEmail: {
      type: String,
      default: 'admissions@xyzschool.edu',
    },
    workingHours: {
      type: String,
      default: 'Monday - Friday: 07:45 AM - 03:45 PM | Saturday: 08:30 AM - 12:30 PM',
    },
    heroHeadline: {
      type: String,
      default: 'Nurturing Global Thinkers & Future Leaders',
    },
    heroSubheadline: {
      type: String,
      default: 'A premier world-class day-cum-boarding institution combining academic excellence with state-of-the-art campus infrastructure and compassionate character formation.',
    },
    principalMessage: {
      type: String,
      default: 'At XYZ School, we do not merely impart curricula; we ignite inquiry, cultivate resilience, and empower young minds to lead a changing world with compassion and integrity.',
    },
  },
  {
    timestamps: true,
  }
);

export const Setting = mongoose.model('Setting', settingSchema);
