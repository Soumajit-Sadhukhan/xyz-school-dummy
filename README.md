# XYZ School Portal — Full MERN Stack Application

A complete, professional multi-page school website and administrative portal built with the **MERN** stack (MongoDB, Express.js, React, Node.js + Tailwind CSS).

---

## 🌟 Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS 3, React Router v6, Lucide React
- **Backend**: Node.js, Express.js, Mongoose, JWT (JSON Web Tokens), bcryptjs
- **Database**: MongoDB with automatic Development In-Memory Server fallback (runs immediately with zero external configuration needed)

---

## 🎨 Design & Palette

- **Palette**: Academic Navy Blue (`#15345B`), Royal Blue (`#2563EB`), Soft Cyan (`#38BDF8`), Crisp White (`#FFFFFF`), Soft Accent Slate (`#F0F7FF`)
- **Hero Image**: Large photorealistic school campus architectural photography with smooth gradient masking.
- **Glassmorphic Navbar**: Translucent frosted glass over hero (`backdrop-filter: blur(20px)`), smoothly transitioning into a crisp sticky blurred white navbar on scroll.
- **Responsiveness**: 100% responsive across mobile smartphones, tablets, laptops, and ultra-wide desktops.

---

## 🧭 Public Pages (13 Pages)

1. **Home (`/`)**: Campus hero visual, stats counters, Principal's welcome, 4 academic pillars, interactive notice ticker, upcoming events, campus highlights, testimonials, and CTA.
2. **About Us (`/about`)**: 28-year heritage, Vision & Mission, core values, historical milestones timeline, and CBSE/Cambridge accreditations.
3. **Academics (`/academics`)**: Dual CBSE & Cambridge IGCSE / A-Level curriculum breakdown, grade levels (Early Years through Grade 12), and subject streams.
4. **Admissions (`/admissions`)**: 4-step admission roadmap, interactive admission enquiry application form, fee schedules table, and prospectus download.
5. **Facilities (`/facilities`)**: Knowledge Commons library, Olympic sports complex, heated swimming pool, STEM robotics lab, auditorium, and transport fleet.
6. **Faculty (`/faculty`)**: Faculty directory filterable by department (Leadership, Sciences, Mathematics, Humanities, Athletics) with credentials and bios.
7. **Gallery (`/gallery`)**: Categorized photo gallery (Campus, Facilities, Sports, Events, Faculty) with full-screen interactive Lightbox viewer.
8. **Notices (`/notices`)**: Official circulars with search, priority badges (High/Medium/Normal), category filter, and download buttons.
9. **Events (`/events`)**: School calendar, upcoming athletic and cultural events with RSVP / registration triggers.
10. **Contact (`/contact`)**: Interactive contact form, campus address, telephone, email, visiting hours, and map card.
11. **FAQ (`/faq`)**: Multi-category accordion FAQ (Admissions, Academics, Facilities, Transport, Fees) with instant search filter.
12. **Privacy Policy (`/privacy-policy`)**: Complete student data protection, parent portal confidentiality, and compliance guidelines.
13. **404 Not Found (`*`)**: Custom school-branded error page with quick recovery navigation.

---

## 🛡️ Admin Panel (11 Modules)

Access the portal at: **[`/admin/login`](http://localhost:5173/admin/login)**

### Default Administrator Credentials
- **Email**: `admin@xyzschool.edu`
- **Password**: `Admin@123456`
*(A "Fill Demo Credentials" button is provided on the login page for one-click testing)*

### Features:
1. **Admin Dashboard (`/admin/dashboard`)**: Real-time metrics counters, recent enquiry submissions, quick status changers, and activity streams.
2. **Admission Enquiries (`/admin/admissions`)**: Application list, candidate file viewer, status updates (`New`, `Contacted`, `Under Review`, `Admitted`), and counsellor notes.
3. **Notices Management (`/admin/notices`)**: Create, edit, delete, publish/draft toggle, priority tags, and category filters.
4. **Event Management (`/admin/events`)**: Schedule events, assign venues, times, banners, and categories.
5. **Media & Gallery (`/admin/gallery`)**: Add new campus imagery, assign categories, and manage media.
6. **Faculty Management (`/admin/faculty`)**: Add teacher profiles, qualifications, departments, and credentials.
7. **Contact Messages (`/admin/messages`)**: Read public submissions, reply via email, mark as read/replied, and delete.
8. **Page Content Management (`/admin/content`)**: Configure hero headline, tagline, school motto, and leadership desk messages.
9. **Website Settings (`/admin/settings`)**: Update telephone lines, admissions hotlines, postal address, and affiliation numbers.
10. **User & Role Management (`/admin/users`)**: Manage administrator access with role-based permissions (`Super Admin`, `Admin`, `Editor`).

---

## 💻 Local Execution Commands

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Running Locally

Both client and server can be launched simultaneously or independently:

#### Option 1: Run Both (Concurrently)
```powershell
# From the project root folder:
npm run server:dev  # Terminal 1
npm run client:dev  # Terminal 2
```

#### Option 2: Run Separately

**Backend Server (Port 5000):**
```powershell
cd server
npm run dev
```

**Frontend Client (Port 5173):**
```powershell
cd client
npm run dev
```

The application is now live at: **`http://localhost:5173`**
