# XYZ School - Complete MERN Stack Implementation Plan

## Overview
This plan establishes the architecture and execution strategy for **XYZ School**, a premier multi-page educational web portal built on the MERN stack (MongoDB, Express.js, React, Node.js + Tailwind CSS).

---

## 1. Architectural Blueprint

### Project Hierarchy
```
stitch_xyz_school_portal/
├── client/                     # Frontend: React + Vite + Tailwind CSS
│   ├── public/
│   │   ├── images/
│   │   │   └── campus/         # High-resolution architectural photography
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Navbar, TopBar, Footer, Breadcrumb, Modal
│   │   │   ├── public/         # Hero, StatCard, NoticeCard, EventCard, Lightbox
│   │   │   └── admin/          # AdminSidebar, AdminHeader, StatWidget, DataTable
│   │   ├── context/            # AuthContext, ToastContext
│   │   ├── pages/
│   │   │   ├── public/         # 13 Public Pages (Home, About, Academics, etc.)
│   │   │   └── admin/          # 11 Admin Pages (Dashboard, Notices, Enquiries, etc.)
│   │   ├── services/           # API clients & seed fallback connectors
│   │   ├── App.jsx             # React Router v6 definition
│   │   ├── index.css           # Tailwind directives & custom glassmorphism utilities
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Backend: Node.js + Express.js + Mongoose
│   ├── src/
│   │   ├── config/             # MongoDB connection with memory-server fallback
│   │   ├── controllers/        # Handlers for notices, enquiries, events, etc.
│   │   ├── middleware/         # JWT Auth, Role Guard, Error handling
│   │   ├── models/             # Mongoose schemas (User, Notice, Event, etc.)
│   │   ├── routes/             # RESTful API routing
│   │   ├── seed/               # High-fidelity realistic XYZ School seed data
│   │   └── server.js           # Express app entry point
│   ├── .env.example
│   └── package.json
├── stitch_xyz_school_portal/   # Preserved existing mockups and raw assets
├── package.json                # Root concurrent scripts
└── README.md                   # Complete local execution guide
```

---

## 2. Design System & Palette

| Token | Hex | Role |
|---|---|---|
| `brand-navy` | `#15345B` | Deep academic primary, hero gradients, top bar |
| `brand-blue` | `#2563EB` | Active buttons, links, royal accents |
| `brand-cyan` | `#38BDF8` | Badges, highlighted indicators, modern accents |
| `brand-text` | `#172B4D` | High-contrast typography |
| `brand-muted`| `#64748B` | Subheadings, dates, secondary metadata |
| `brand-soft` | `#F0F7FF` | Light card backgrounds, alternating sections |
| `brand-border`| `#E2E8F0`| Clean borders and dividers |

**Navbar Glassmorphism**:
- Initial state over hero: Translucent acrylic glass (`rgba(255, 255, 255, 0.85)` + `backdrop-filter: blur(20px)`).
- Sticky scrolled state: Elevated crisp white header with subtle border and elevation drop shadow.

---

## 3. Public Pages (13 Required)
1. **Home (`/`)**: Hero campus visual, quick links, Principal's message, 4 academic pillars, live notice ticker, achievements counter, virtual tour prompt, testimonials, CTA.
2. **About Us (`/about`)**: School heritage, vision & mission, leadership & governing body, core values, accreditations.
3. **Academics (`/academics`)**: CBSE & Cambridge IGCSE / IB curriculum, kindergarten through Grade 12, STEM laboratories, co-curriculars.
4. **Admissions (`/admissions`)**: Eligibility criteria, step-by-step procedure, fee schedule, scholarship rules, interactive admission enquiry application form.
5. **Facilities (`/facilities`)**: Knowledge Commons library, smart classrooms, robotics labs, Olympic sports arena, swimming pool, health center, school transport.
6. **Faculty (`/faculty`)**: Faculty directory filterable by department (Sciences, Maths, Languages, Humanities, Arts & Sports), credentials, experience.
7. **Gallery (`/gallery`)**: Photo gallery filterable by category (Campus, Academics, Sports, Cultural) with interactive full-screen lightbox.
8. **Notices (`/notices`)**: Official circulars, exam notifications, policy updates, category filtering, search, and download links.
9. **Events (`/events`)**: Annual academic calendar, upcoming school events with RSVP triggers, past event archive.
10. **Contact (`/contact`)**: Contact form with real-time submission, Google Maps card, visiting hours, direct helpline numbers.
11. **FAQ (`/faq`)**: Multi-category accordion FAQ (Admissions, Academics, Campus Life, Transport, Fees).
12. **Privacy Policy (`/privacy-policy`)**: Student data protection, parent portal privacy, cookie compliance.
13. **404 Not Found (`*`)**: School-themed 404 page with navigation recovery buttons.

---

## 4. Admin Panel Features (11 Modules)
1. **Admin Login (`/admin/login`)**: JWT token authentication with demo credentials quick-fill.
2. **Dashboard (`/admin/dashboard`)**: Metric cards (Enquiries, Notices, Events, Faculty, Messages), recent enquiry table, activity feeds.
3. **Page Content Manager (`/admin/content`)**: Configure hero headline, principal message, motto, announcement banner.
4. **Notice Management (`/admin/notices`)**: CRUD with category, priority, publish/draft toggle, and attachment link.
5. **Event Management (`/admin/events`)**: CRUD with dates, venue, category, banner image, registration links.
6. **Gallery Management (`/admin/gallery`)**: Image addition, categorized grouping, deletion.
7. **Faculty Management (`/admin/faculty`)**: Add/edit faculty profiles, designations, subjects, photos, qualifications.
8. **Admission Enquiries (`/admin/admissions`)**: Review applications, update status (`New`, `Contacted`, `Under Review`, `Admitted`, `Rejected`), add counsellor notes.
9. **Contact Messages (`/admin/messages`)**: Review inquiries, mark read/unread, record response status.
10. **Website Settings (`/admin/settings`)**: Contact phone, admissions email, address, affiliation code, social links.
11. **Admin User & Roles (`/admin/users`)**: Role-based access control (`Super Admin`, `Admin`, `Editor`).

---

## 5. Express & MongoDB Backend
- **Resilient MongoDB Config**: Connects to `MONGODB_URI` from `.env`. If no local MongoDB server is active, gracefully falls back to `mongodb-memory-server` in development mode, ensuring the app runs out-of-the-box on any local Windows machine without installation friction.
- **REST APIs**: Full CRUD coverage with JWT bearer token verification and bcrypt password hashing.
- **Auto-Seeding**: Seeds high-fidelity notices, events, faculty, gallery items, settings, and default administrator (`admin@xyzschool.edu` / `Admin@123456`).
