
import React from "react";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-white py-6">
      <div className="section-container">
        <p className="text-center text-gray-600 text-sm">© {year} Hackademia. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
