import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/common/PublicLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Academics } from './pages/public/Academics';
import { Admissions } from './pages/public/Admissions';
import { Facilities } from './pages/public/Facilities';
import { Faculty } from './pages/public/Faculty';
import { Gallery } from './pages/public/Gallery';
import { Notices } from './pages/public/Notices';
import { Events } from './pages/public/Events';
import { Contact } from './pages/public/Contact';
import { Faq } from './pages/public/Faq';
import { PrivacyPolicy } from './pages/public/PrivacyPolicy';
import { NotFound } from './pages/public/NotFound';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAdmissions } from './pages/admin/AdminAdmissions';
import { AdminNotices } from './pages/admin/AdminNotices';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AdminFaculty } from './pages/admin/AdminFaculty';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminUsers } from './pages/admin/AdminUsers';

export default function App() {
  return (
    <Routes>
      {/* Public Routes with Glassmorphic Navbar & Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Redirect legacy /admin to /admin22 */}
      <Route path="/admin" element={<Navigate to="/admin22/dashboard" replace />} />
      <Route path="/admin/login" element={<Navigate to="/admin22/login" replace />} />
      <Route path="/admin/*" element={<Navigate to="/admin22/dashboard" replace />} />

      {/* Admin Authentication under /admin22 */}
      <Route path="/admin22/login" element={<AdminLogin />} />

      {/* Admin Protected Console under /admin22 */}
      <Route
        path="/admin22"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin22/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="admissions" element={<AdminAdmissions />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="faculty" element={<AdminFaculty />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route
          path="users"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
