import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-blue selection:text-white">
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
