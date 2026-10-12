import { User } from '../models/User.js';
import { Notice } from '../models/Notice.js';
import { Event } from '../models/Event.js';
import { Faculty } from '../models/Faculty.js';
import { Gallery } from '../models/Gallery.js';
import { AdmissionEnquiry } from '../models/AdmissionEnquiry.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { Setting } from '../models/Setting.js';

export const seedDatabaseIfNeeded = async () => {
  try {
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      console.log('Database is unpopulated. Seeding initial XYZ School dataset...');

      // 1. Super Administrator
      await User.create({
        name: 'Principal Dr. Evelyn Vance',
        email: 'admin@xyzschool.edu',
        password: 'Admin@123456',
        role: 'superadmin',
        isActive: true,
      });

      // Additional staff
      await User.create({
        name: 'Admissions Office Registrar',
        email: 'admissions.desk@xyzschool.edu',
        password: 'Admin@123456',
        role: 'admin',
        isActive: true,
      });

      await User.create({
        name: 'Academic Affairs Editor',
        email: 'academics.editor@xyzschool.edu',
        password: 'Admin@123456',
        role: 'editor',
        isActive: true,
      });

      // 2. Initial Settings
      await Setting.create({
        schoolName: 'XYZ School',
        tagline: 'Excellence in Education, Character in Life',
        affiliationNo: '2130894 (CBSE & Cambridge International)',
        address: 'Plot 12, Academic Enclave, Sector 8, Knowledge Boulevard, Heritage City - 110045',
        phone: '+1 (800) 555-0199',
        admissionsHotline: '+1 (800) 555-0188',
        email: 'info@xyzschool.edu',
        admissionsEmail: 'admissions@xyzschool.edu',
        workingHours: 'Monday - Friday: 07:45 AM - 03:45 PM | Saturday: 08:30 AM - 12:30 PM',
        heroHeadline: 'Nurturing Global Thinkers & Future Leaders',
        heroSubheadline: 'A premier world-class day-cum-boarding institution combining academic excellence with state-of-the-art campus infrastructure and compassionate character formation.',
        principalMessage: 'At XYZ School, we do not merely impart curricula; we ignite inquiry, cultivate resilience, and empower young minds to lead a changing world with compassion and integrity.',
      });

      // 3. Notices
      await Notice.create([
        {
          title: 'Admissions Open for Academic Year 2026-2027 (Pre-KG to Grade 11)',
          category: 'Admissions',
          date: '2026-10-05',
          priority: 'High',
          isPublished: true,
          summary: 'Registrations are now open for the upcoming academic cycle. Early prospective parents are invited to book campus tours and entrance assessments.',
        },
        {
          title: 'Annual STEM & Robotics Exhibition 2026: Team Registrations Open',
          category: 'Academics',
          date: '2026-10-08',
          priority: 'High',
          isPublished: true,
          summary: 'Students from Grades 6 to 12 can submit their research abstracts and prototype proposals to the Innovation Lab committee by Oct 20.',
        },
        {
          title: 'Mid-Term Assessment Schedule & Revision Circular Released',
          category: 'Examinations',
          date: '2026-10-02',
          priority: 'Medium',
          isPublished: true,
          summary: 'Detailed timetable and syllabus guidelines for Grades 6 through 12 mid-term board preparatory evaluations are now accessible on the portal.',
        },
        {
          title: 'Parent-Teacher Consultations (PTC) for Senior Secondary Wing',
          category: 'General',
          date: '2026-09-28',
          priority: 'Medium',
          isPublished: true,
          summary: 'Senior Wing PTC is scheduled for Saturday, Oct 24. Time slot bookings are available through the parent communication desk.',
        },
        {
          title: 'Annual Inter-House Swimming & Athletics Championship Trials',
          category: 'Sports',
          date: '2026-09-22',
          priority: 'Normal',
          isPublished: true,
          summary: 'House captains are requested to submit final athlete nomination lists to the Sports Pavilion office.',
        },
      ]);

      // 4. Events
      await Event.create([
        {
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
          title: 'XYZ Model United Nations Conference (XYZ-MUN 2026)',
          category: 'Leadership',
          date: '2026-11-24',
          time: '08:00 AM - 05:00 PM',
          venue: 'Knowledge Commons Conference Halls',
          image: '/images/campus/campus-faculty.png',
          description: 'Three days of spirited diplomatic debates on global security, climate policy, and international humanitarian treaties.',
          isUpcoming: true,
        },
      ]);

      // 5. Faculty
      await Faculty.create([
        {
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
          name: 'Mr. David O’Connor',
          designation: 'Director of Physical Education & Athletics',
          department: 'Athletics',
          qualification: 'Master of Physical Education, Olympic Certified Youth Coach',
          experience: '15 Years',
          email: 'd.oconnor@xyzschool.edu',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
          bio: 'Head of campus athletic conditioning, varsity football, and aquatic championship programmes.',
        },
      ]);

      // 6. Gallery
      await Gallery.create([
        {
          title: 'The Flagship Campus Quadrangle',
          category: 'Campus',
          imageUrl: '/images/campus/campus-hero.png',
          description: 'State-of-the-art neoclassical academic buildings surrounded by curated botanical gardens and green spaces.',
        },
        {
          title: 'Knowledge Commons & Central Library',
          category: 'Facilities',
          imageUrl: '/images/campus/campus-library.png',
          description: 'Double-height reading pavilion housing over 50,000 academic titles, digital archives, and quiet study rooms.',
        },
        {
          title: 'Olympic Sports Pavilion & Arena',
          category: 'Sports',
          imageUrl: '/images/campus/campus-sports.png',
          description: 'Synthetic track, all-weather courts, indoor heated swimming complex, and multi-purpose courts.',
        },
        {
          title: 'Admissions & Welcome Center',
          category: 'Campus',
          imageUrl: '/images/campus/campus-admissions.png',
          description: 'Warm, hospitable center where prospective families receive campus tours and personalized admission counselling.',
        },
        {
          title: 'Faculty Academic Research Lounge',
          category: 'Faculty',
          imageUrl: '/images/campus/campus-faculty.png',
          description: 'Collaborative curriculum design hub where department heads and educators conduct professional development.',
        },
        {
          title: 'Annual Cultural Festival & Gathering',
          category: 'Events',
          imageUrl: '/images/campus/campus-events.png',
          description: 'Vibrant outdoor spring festival showcasing student theatre, global music ensembles, and science kiosks.',
        },
      ]);

      // 7. Enquiries
      await AdmissionEnquiry.create([
        {
          studentName: 'Aarav Mehta',
          parentName: 'Vikram Mehta',
          email: 'vikram.mehta@example.com',
          phone: '+1 (555) 234-8891',
          grade: 'Grade 9 (Cambridge IGCSE)',
          academicYear: '2026-2027',
          status: 'New',
          notes: 'Interested in STEM robotics lab and tennis academy.',
        },
        {
          studentName: 'Sophia Jenkins',
          parentName: 'Eleanor Jenkins',
          email: 'e.jenkins@example.com',
          phone: '+1 (555) 891-3420',
          grade: 'Kindergarten (Montessori Wing)',
          academicYear: '2026-2027',
          status: 'Contacted',
          notes: 'Scheduled campus walkthrough on Oct 18.',
        },
        {
          studentName: 'Liam Harrison',
          parentName: 'Dr. Gregory Harrison',
          email: 'greg.h@example.com',
          phone: '+1 (555) 432-1199',
          grade: 'Grade 11 (IB Diploma Programme)',
          academicYear: '2026-2027',
          status: 'Under Review',
          notes: 'Transferred from overseas American curriculum.',
        },
      ]);

      // 8. Contact Messages
      await ContactMessage.create([
        {
          name: 'Sarah Connor',
          email: 's.connor@example.com',
          phone: '+1 (555) 123-4567',
          subject: 'Query regarding Cambridge IGCSE subject combinations',
          message: 'Hello, could you provide details about whether Computer Science and Further Pure Mathematics can be chosen simultaneously for Grade 9?',
          status: 'Unread',
        },
        {
          name: 'Rajesh Patel',
          email: 'r.patel@example.com',
          phone: '+1 (555) 765-4321',
          subject: 'School Transport route for Sector 14 Green Park',
          message: 'We are shifting to Sector 14 next month. Does bus route #12 have a designated morning pickup point near the central park?',
          status: 'Replied',
        },
      ]);

      console.log('✓ Successfully seeded XYZ School sample database!');
    }
  } catch (err) {
    console.error('Error during database seeding:', err);
  }
};
