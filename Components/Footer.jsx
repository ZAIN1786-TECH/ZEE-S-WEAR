import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Contact Us', path: '/contact' }
  ];

  return (
    <footer className="bg-black text-white p-2 mt-8 rounded-2xl m-4">
      <div className="text-center">
        <p className="mb-2">
          &copy; {currentYear} Zee's Wear. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 text-sm">
          {footerLinks.map((link, index) => (
            <Link 
              key={index}
              to={link.path}
              className="hover:text-amber-300 transition duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;