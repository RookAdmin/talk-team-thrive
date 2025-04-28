
import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Talk Team Thrive. All rights reserved.</p>
          <div className="mt-1">
            <a href="#" className="text-brand-primary hover:underline mx-2">Terms of Service</a>
            <a href="#" className="text-brand-primary hover:underline mx-2">Privacy Policy</a>
            <a href="#" className="text-brand-primary hover:underline mx-2">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
