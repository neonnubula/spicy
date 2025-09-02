
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-6" style={{ backgroundColor: '#0b0a1d' }}>
      <div className="section-container">
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#hero" className="text-white/80 hover:text-white transition-colors">
              Home
            </a>
            <a href="#features" className="text-white/80 hover:text-white transition-colors">
              Features
            </a>
            <a href="#download" className="text-white/80 hover:text-white transition-colors">
              Download
            </a>
          </div>
          <p className="text-center text-white text-sm">© {year} Most Important Thing. All rights reserved.</p>
          <p className="text-center text-white/60 text-xs">Transform your life one day at a time</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
