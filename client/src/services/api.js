import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Initial high-fidelity seed data
const initialNotices = [
  {
    id: 'not-1',
    title: 'Admissions Open for Academic Year 2026-2027 (Pre-KG to Grade 11)',
    category: 'Admissions',
    date: '2026-10-05',
    priority: 'High',
    isPublished: true,
    summary: 'Registrations are now open for the upcoming academic cycle. Early prospective parents are invited to book campus tours and entrance assessments.',
    attachmentUrl: '#',
  },
  {
    id: 'not-2',
    title: 'Annual STEM & Robotics Exhibition 2026: Team Registrations Open',
    category: 'Academics',
    date: '2026-10-08',
    priority: 'High',
    isPublished: true,
    summary: 'Students from Grades 6 to 12 can submit their research abstracts and prototype proposals to the Innovation Lab committee by Oct 20.',
    attachmentUrl: '#',
  },
  {
    id: 'not-3',
    title: 'Mid-Term Assessment Schedule & Revision Circular Released',
    category: 'Examinations',
    date: '2026-10-02',
    priority: 'Medium',
    isPublished: true,
    summary: 'Detailed timetable and syllabus guidelines for Grades 6 through 12 mid-term board preparatory evaluations are now accessible on the portal.',
    attachmentUrl: '#',
  },
  {
    id: 'not-4',
    title: 'Parent-Teacher Consultations (PTC) for Senior Secondary Wing',
    category: 'General',
    date: '2026-09-28',
    priority: 'Medium',
    isPublished: true,
    summary: 'Senior Wing PTC is scheduled for Saturday, Oct 24. Time slot bookings are available through the parent communication desk.',
    attachmentUrl: '#',
  },
  {
    id: 'not-5',
    title: 'Annual Inter-House Swimming & Athletics Championship Trials',
    category: 'Sports',
    date: '2026-09-22',
    priority: 'Normal',
    isPublished: true,
    summary: 'House captains are requested to submit final athlete nomination lists to the Sports Pavilion office.',
    attachmentUrl: '#',
  },
];

const initialEvents = [
  {
    id: 'ev-1',
    title: 'Grand Annual Sports Gala & Track Championship 2026',
    category: 'Sports',
    date: '2026-10-28',
    time: '08:30 AM - 04:30 PM',
    venue: 'Main Olympic Athletics Stadium & Pavilion',
    image: '/images/campus/campus-sports.png',
    description: 'A day of track & field, inter-house relays, gymnastics showcases, and medal ceremonies officiated by Olympic guest luminaries.',
    isUpcoming: true,
  },
  {
    id: 'ev-2',
    title: 'Symphony of Arts - Cultural Festival & Music Recital',
    category: 'Cultural',
    date: '2026-11-06',
    time: '05:00 PM - 08:30 PM',
    venue: 'Tagore Grand Auditorium (1,200 seats)',
    image: '/images/campus/campus-events.png',
    description: 'An evening celebrating orchestral performances, classical and contemporary dance troupes, and student visual art exhibitions.',
    isUpcoming: true,
  },
  {
    id: 'ev-3',
    title: 'National Science & AI Innovation Summit 2026',
    category: 'Academics',
    date: '2026-11-15',
    time: '09:00 AM - 03:30 PM',
    venue: 'STEM Research Commons & Robotics Center',
    image: '/images/campus/campus-library.png',
    description: 'Over 40 school teams present solutions in clean energy, generative AI applications, aerospace engineering, and bio-tech diagnostics.',
    isUpcoming: true,
  },
  {
    id: 'ev-4',
    title: 'XYZ Model United Nations Conference (XYZ-MUN 2026)',
    category: 'Leadership',
    date: '2026-11-24',
    time: '08:00 AM - 05:00 PM',
    venue: 'Knowledge Commons Conference Halls',
    image: '/images/campus/campus-faculty.png',
    description: 'Three days of spirited diplomatic debates on global security, climate policy, and international humanitarian treaties.',
    isUpcoming: true,
  },
];

const initialFaculty = [
  {
    id: 'fac-1',
    name: 'Dr. Evelyn Vance',
    designation: 'Principal & Director of Academics',
    department: 'Leadership',
    qualification: 'Ph.D. in Educational Leadership (Harvard), M.Ed. (Columbia)',
    experience: '22 Years',
    email: 'principal@xyzschool.edu',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    bio: 'Dedicated to fostering holistic academic rigor, empathetic global leadership, and innovative pedagogies across primary and secondary curricula.',
  },
  {
    id: 'fac-2',
    name: 'Prof. Marcus Sterling',
    designation: 'Head of Senior Secondary & Physics',
    department: 'Sciences',
    qualification: 'M.Sc. Physics (Cambridge), B.Ed.',
    experience: '18 Years',
    email: 'm.sterling@xyzschool.edu',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
    bio: 'Pioneer of experiential inquiry-based laboratory physics, with alumni attending MIT, Stanford, and Oxford.',
  },
  {
    id: 'fac-3',
    name: 'Ms. Ananya Sharma',
    designation: 'Head of Mathematics & Olympiad Coach',
    department: 'Mathematics',
    qualification: 'M.Sc. Applied Mathematics, National Merit Scholar',
    experience: '14 Years',
    email: 'a.sharma@xyzschool.edu',
    photoUrl: 'https://images.unsplash.com/photo-1580894732483-36630f98fb72?w=600&auto=format&fit=crop&q=80',
    bio: 'International Mathematical Olympiad trainer dedicated to transforming complex calculus and discrete algebra into intuitive discoveries.',
  },
  {
    id: 'fac-4',
    name: 'Dr. Robert Chen',
    designation: 'Head of Computer Science & Robotics',
    department: 'Sciences',
    qualification: 'Ph.D. in Computer Science & Robotics, B.Tech',
    experience: '12 Years',
    email: 'r.chen@xyzschool.edu',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    bio: 'Leads our high-school AI ethics lab, autonomous robotics competitions, and coding fellowships.',
  },
  {
    id: 'fac-5',
    name: 'Mrs. Clara Montgomery',
    designation: 'Dean of Humanities & World Literature',
    department: 'Humanities',
    qualification: 'M.A. English Literature (Oxford), B.Ed.',
    experience: '16 Years',
    email: 'c.montgomery@xyzschool.edu',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
    bio: 'Curates our debating union, literary magazine, and critical thinking colloquiums.',
  },
  {
    id: 'fac-6',
    name: 'Mr. David O’Connor',
    designation: 'Director of Physical Education & Athletics',
    department: 'Athletics',
    qualification: 'Master of Physical Education, Olympic Certified Youth Coach',
    experience: '15 Years',
    email: 'd.oconnor@xyzschool.edu',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    bio: 'Head of campus athletic conditioning, varsity football, and aquatic championship programmes.',
  },
];

const initialGallery = [
  {
    id: 'gal-1',
    title: 'The Flagship Campus Quadrangle',
    category: 'Campus',
    imageUrl: '/images/campus/campus-hero.png',
    description: 'State-of-the-art neoclassical academic buildings surrounded by curated botanical gardens and green spaces.',
  },
  {
    id: 'gal-2',
    title: 'Knowledge Commons & Central Library',
    category: 'Facilities',
    imageUrl: '/images/campus/campus-library.png',
    description: 'Double-height reading pavilion housing over 50,000 academic titles, digital archives, and quiet study rooms.',
  },
  {
    id: 'gal-3',
    title: 'Olympic Sports Pavilion & Arena',
    category: 'Sports',
    imageUrl: '/images/campus/campus-sports.png',
    description: 'Synthetic track, all-weather courts, indoor heated swimming complex, and multi-purpose courts.',
  },
  {
    id: 'gal-4',
    title: 'Admissions & Welcome Center',
    category: 'Campus',
    imageUrl: '/images/campus/campus-admissions.png',
    description: 'Warm, hospitable center where prospective families receive campus tours and personalized admission counselling.',
  },
  {
    id: 'gal-5',
    title: 'Faculty Academic Research Lounge',
    category: 'Faculty',
    imageUrl: '/images/campus/campus-faculty.png',
    description: 'Collaborative curriculum design hub where department heads and educators conduct professional development.',
  },
  {
    id: 'gal-6',
    title: 'Annual Cultural Festival & Gathering',
    category: 'Events',
    imageUrl: '/images/campus/campus-events.png',
    description: 'Vibrant outdoor spring festival showcasing student theatre, global music ensembles, and science kiosks.',
  },
  {
    id: 'gal-7',
    title: 'Aerial View of the South Wing Quad',
    category: 'Campus',
    imageUrl: '/images/campus/campus-quadrangle.png',
    description: 'Expansive recreational grounds designed for student socialization, assemblies, and intramural games.',
  },
];

const initialSettings = {
  schoolName: 'XYZ School',
  tagline: 'Excellence in Education, Character in Life',
  affiliationNo: '2130894 (CBSE & Cambridge International)',
  address: 'Plot 12, Academic Enclave, Sector 8, Knowledge Boulevard, Heritage City - 110045',
  phone: '+1 (800) 555-0199',
  admissionsHotline: '+1 (800) 555-0188',
  email: 'info@xyzschool.edu',
  admissionsEmail: 'admissions@xyzschool.edu',
  workingHours: 'Monday - Friday: 07:45 AM - 03:45 PM | Saturday: 08:30 AM - 12:30 PM',
  principalMessage: 'At XYZ School, we do not merely impart curricula; we ignite inquiry, cultivate resilience, and empower young minds to lead a changing world with compassion and integrity.',
  heroHeadline: 'Nurturing Global Thinkers & Future Leaders',
  heroSubheadline: 'A premier world-class day-cum-boarding institution combining academic excellence with state-of-the-art campus infrastructure and compassionate character formation.',
};

// Storage helpers
const getStored = (key, fallback) => {
  try {
    const val = localStorage.getItem(`xyz_${key}`);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = (key, data) => {
  try {
    localStorage.setItem(`xyz_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Storage error', e);
  }
};

export const api = {
  // Notices
  async getNotices() {
    try {
      const res = await axios.get(`${API_BASE}/notices`);
      return res.data;
    } catch {
      return getStored('notices', initialNotices);
    }
  },

  async saveNotice(notice) {
    try {
      const res = await axios.post(`${API_BASE}/notices`, notice);
      return res.data;
    } catch {
      const current = getStored('notices', initialNotices);
      let updated;
      if (notice.id) {
        updated = current.map((n) => (n.id === notice.id ? { ...n, ...notice } : n));
      } else {
        const newNotice = { ...notice, id: `not-${Date.now()}`, date: new Date().toISOString().split('T')[0] };
        updated = [newNotice, ...current];
      }
      setStored('notices', updated);
      return notice.id ? notice : updated[0];
    }
  },

  async deleteNotice(id) {
    try {
      await axios.delete(`${API_BASE}/notices/${id}`);
    } catch {
      const current = getStored('notices', initialNotices);
      setStored('notices', current.filter((n) => n.id !== id));
    }
  },

  // Events
  async getEvents() {
    try {
      const res = await axios.get(`${API_BASE}/events`);
      return res.data;
    } catch {
      return getStored('events', initialEvents);
    }
  },

  async saveEvent(event) {
    try {
      const res = await axios.post(`${API_BASE}/events`, event);
      return res.data;
    } catch {
      const current = getStored('events', initialEvents);
      let updated;
      if (event.id) {
        updated = current.map((e) => (e.id === event.id ? { ...e, ...event } : e));
      } else {
        const newEvent = { ...event, id: `ev-${Date.now()}` };
        updated = [newEvent, ...current];
      }
      setStored('events', updated);
      return event.id ? event : updated[0];
    }
  },

  async deleteEvent(id) {
    try {
      await axios.delete(`${API_BASE}/events/${id}`);
    } catch {
      const current = getStored('events', initialEvents);
      setStored('events', current.filter((e) => e.id !== id));
    }
  },

  // Faculty
  async getFaculty() {
    try {
      const res = await axios.get(`${API_BASE}/faculty`);
      return res.data;
    } catch {
      return getStored('faculty', initialFaculty);
    }
  },

  async saveFaculty(member) {
    try {
      const res = await axios.post(`${API_BASE}/faculty`, member);
      return res.data;
    } catch {
      const current = getStored('faculty', initialFaculty);
      let updated;
      if (member.id) {
        updated = current.map((f) => (f.id === member.id ? { ...f, ...member } : f));
      } else {
        const newMember = { ...member, id: `fac-${Date.now()}` };
        updated = [...current, newMember];
      }
      setStored('faculty', updated);
      return member.id ? member : updated[updated.length - 1];
    }
  },

  async deleteFaculty(id) {
    try {
      await axios.delete(`${API_BASE}/faculty/${id}`);
    } catch {
      const current = getStored('faculty', initialFaculty);
      setStored('faculty', current.filter((f) => f.id !== id));
    }
  },

  // Gallery
  async getGallery() {
    try {
      const res = await axios.get(`${API_BASE}/gallery`);
      return res.data;
    } catch {
      return getStored('gallery', initialGallery);
    }
  },

  async saveGalleryItem(item) {
    try {
      const res = await axios.post(`${API_BASE}/gallery`, item);
      return res.data;
    } catch {
      const current = getStored('gallery', initialGallery);
      const newItem = { ...item, id: `gal-${Date.now()}` };
      const updated = [newItem, ...current];
      setStored('gallery', updated);
      return newItem;
    }
  },

  async deleteGalleryItem(id) {
    try {
      await axios.delete(`${API_BASE}/gallery/${id}`);
    } catch {
      const current = getStored('gallery', initialGallery);
      setStored('gallery', current.filter((g) => g.id !== id));
    }
  },

  // Admissions
  async submitAdmissionEnquiry(enquiry) {
    try {
      const res = await axios.post(`${API_BASE}/admissions`, enquiry);
      return res.data;
    } catch {
      const current = getStored('enquiries', [
        {
          id: 'enq-101',
          studentName: 'Aarav Mehta',
          parentName: 'Vikram Mehta',
          email: 'vikram.mehta@example.com',
          phone: '+1 (555) 234-8891',
          grade: 'Grade 9 (Cambridge IGCSE)',
          academicYear: '2026-2027',
          status: 'New',
          notes: 'Interested in STEM robotics lab and tennis academy.',
          createdAt: '2026-10-10',
        },
        {
          id: 'enq-102',
          studentName: 'Sophia Jenkins',
          parentName: 'Eleanor Jenkins',
          email: 'e.jenkins@example.com',
          phone: '+1 (555) 891-3420',
          grade: 'Kindergarten (Montessori Wing)',
          academicYear: '2026-2027',
          status: 'Contacted',
          notes: 'Scheduled campus walkthrough on Oct 18.',
          createdAt: '2026-10-09',
        },
      ]);
      const newEnq = {
        ...enquiry,
        id: `enq-${Date.now()}`,
        status: 'New',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setStored('enquiries', [newEnq, ...current]);
      return { success: true, enquiry: newEnq };
    }
  },

  async getAdmissionEnquiries() {
    try {
      const res = await axios.get(`${API_BASE}/admissions`);
      return res.data;
    } catch {
      return getStored('enquiries', [
        {
          id: 'enq-101',
          studentName: 'Aarav Mehta',
          parentName: 'Vikram Mehta',
          email: 'vikram.mehta@example.com',
          phone: '+1 (555) 234-8891',
          grade: 'Grade 9 (Cambridge IGCSE)',
          academicYear: '2026-2027',
          status: 'New',
          notes: 'Interested in STEM robotics lab and tennis academy.',
          createdAt: '2026-10-10',
        },
        {
          id: 'enq-102',
          studentName: 'Sophia Jenkins',
          parentName: 'Eleanor Jenkins',
          email: 'e.jenkins@example.com',
          phone: '+1 (555) 891-3420',
          grade: 'Kindergarten (Montessori Wing)',
          academicYear: '2026-2027',
          status: 'Contacted',
          notes: 'Scheduled campus walkthrough on Oct 18.',
          createdAt: '2026-10-09',
        },
        {
          id: 'enq-103',
          studentName: 'Liam Harrison',
          parentName: 'Dr. Gregory Harrison',
          email: 'greg.h@example.com',
          phone: '+1 (555) 432-1199',
          grade: 'Grade 11 (IB Diploma Programme)',
          academicYear: '2026-2027',
          status: 'Under Review',
          notes: 'Transferred from overseas American curriculum.',
          createdAt: '2026-10-07',
        },
      ]);
    }
  },

  async updateEnquiryStatus(id, status, notes = '') {
    try {
      const res = await axios.patch(`${API_BASE}/admissions/${id}`, { status, notes });
      return res.data;
    } catch {
      const current = getStored('enquiries', []);
      const updated = current.map((e) => (e.id === id ? { ...e, status, notes: notes || e.notes } : e));
      setStored('enquiries', updated);
      return updated.find((e) => e.id === id);
    }
  },

  async deleteEnquiry(id) {
    try {
      await axios.delete(`${API_BASE}/admissions/${id}`);
    } catch {
      const current = getStored('enquiries', []);
      setStored('enquiries', current.filter((e) => e.id !== id));
    }
  },

  // Contact Messages
  async submitContactMessage(msg) {
    try {
      const res = await axios.post(`${API_BASE}/contact`, msg);
      return res.data;
    } catch {
      const current = getStored('messages', [
        {
          id: 'msg-1',
          name: 'Sarah Connor',
          email: 's.connor@example.com',
          phone: '+1 (555) 123-4567',
          subject: 'Query regarding Cambridge IGCSE subject combinations',
          message: 'Hello, could you provide details about whether Computer Science and Further Pure Mathematics can be chosen simultaneously for Grade 9?',
          status: 'Unread',
          createdAt: '2026-10-11',
        },
        {
          id: 'msg-2',
          name: 'Rajesh Patel',
          email: 'r.patel@example.com',
          phone: '+1 (555) 765-4321',
          subject: 'School Transport route for Sector 14 Green Park',
          message: 'We are shifting to Sector 14 next month. Does bus route #12 have a designated morning pickup point near the central park?',
          status: 'Replied',
          createdAt: '2026-10-08',
        },
      ]);
      const newMsg = {
        ...msg,
        id: `msg-${Date.now()}`,
        status: 'Unread',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setStored('messages', [newMsg, ...current]);
      return { success: true, message: newMsg };
    }
  },

  async getContactMessages() {
    try {
      const res = await axios.get(`${API_BASE}/contact`);
      return res.data;
    } catch {
      return getStored('messages', [
        {
          id: 'msg-1',
          name: 'Sarah Connor',
          email: 's.connor@example.com',
          phone: '+1 (555) 123-4567',
          subject: 'Query regarding Cambridge IGCSE subject combinations',
          message: 'Hello, could you provide details about whether Computer Science and Further Pure Mathematics can be chosen simultaneously for Grade 9?',
          status: 'Unread',
          createdAt: '2026-10-11',
        },
        {
          id: 'msg-2',
          name: 'Rajesh Patel',
          email: 'r.patel@example.com',
          phone: '+1 (555) 765-4321',
          subject: 'School Transport route for Sector 14 Green Park',
          message: 'We are shifting to Sector 14 next month. Does bus route #12 have a designated morning pickup point near the central park?',
          status: 'Replied',
          createdAt: '2026-10-08',
        },
      ]);
    }
  },

  async updateMessageStatus(id, status) {
    try {
      const res = await axios.patch(`${API_BASE}/contact/${id}`, { status });
      return res.data;
    } catch {
      const current = getStored('messages', []);
      const updated = current.map((m) => (m.id === id ? { ...m, status } : m));
      setStored('messages', updated);
      return updated.find((m) => m.id === id);
    }
  },

  async deleteMessage(id) {
    try {
      await axios.delete(`${API_BASE}/contact/${id}`);
    } catch {
      const current = getStored('messages', []);
      setStored('messages', current.filter((m) => m.id !== id));
    }
  },

  // Settings
  async getSettings() {
    try {
      const res = await axios.get(`${API_BASE}/settings`);
      return res.data;
    } catch {
      return getStored('settings', initialSettings);
    }
  },

  async saveSettings(settings) {
    try {
      const res = await axios.put(`${API_BASE}/settings`, settings);
      return res.data;
    } catch {
      setStored('settings', settings);
      return settings;
    }
  },

  // Admin Users
  async getUsers() {
    try {
      const res = await axios.get(`${API_BASE}/users`);
      return res.data;
    } catch {
      return getStored('admin_users', [
        {
          id: 'u-1',
          name: 'Principal Dr. Evelyn Vance',
          email: 'admin@xyzschool.edu',
          role: 'superadmin',
          isActive: true,
          lastLogin: '2026-10-12 11:42 AM',
        },
        {
          id: 'u-2',
          name: 'Admissions Office Registrar',
          email: 'admissions.desk@xyzschool.edu',
          role: 'admin',
          isActive: true,
          lastLogin: '2026-10-11 04:15 PM',
        },
        {
          id: 'u-3',
          name: 'Academic Affairs Editor',
          email: 'academics.editor@xyzschool.edu',
          role: 'editor',
          isActive: true,
          lastLogin: '2026-10-09 09:30 AM',
        },
      ]);
    }
  },

  async saveUser(user) {
    try {
      const res = await axios.post(`${API_BASE}/users`, user);
      return res.data;
    } catch {
      const current = getStored('admin_users', []);
      let updated;
      if (user.id) {
        updated = current.map((u) => (u.id === user.id ? { ...u, ...user } : u));
      } else {
        const newUser = {
          ...user,
          id: `u-${Date.now()}`,
          isActive: true,
          lastLogin: 'Never',
        };
        updated = [...current, newUser];
      }
      setStored('admin_users', updated);
      return user.id ? user : updated[updated.length - 1];
    }
  },

  async deleteUser(id) {
    try {
      await axios.delete(`${API_BASE}/users/${id}`);
    } catch {
      const current = getStored('admin_users', []);
      setStored('admin_users', current.filter((u) => u.id !== id));
    }
  },

  // Dashboard Stats
  async getDashboardStats() {
    try {
      const res = await axios.get(`${API_BASE}/stats`);
      return res.data;
    } catch {
      const notices = getStored('notices', initialNotices);
      const events = getStored('events', initialEvents);
      const faculty = getStored('faculty', initialFaculty);
      const gallery = getStored('gallery', initialGallery);
      const enquiries = getStored('enquiries', []);
      const messages = getStored('messages', []);

      return {
        totalEnquiries: enquiries.length + 28,
        pendingEnquiries: enquiries.filter((e) => e.status === 'New').length + 8,
        totalNotices: notices.length,
        totalEvents: events.length,
        totalFaculty: faculty.length + 42,
        totalGallery: gallery.length,
        unreadMessages: messages.filter((m) => m.status === 'Unread').length + 3,
      };
    }
  },
};
