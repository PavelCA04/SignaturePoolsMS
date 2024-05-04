import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './HamburgerMenu.css'; 

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    switch (menuItem) {
      case 'about':
        Swal.fire({
          title: 'About Us',
          text: 'This is a description of what we do.',
          icon: 'info',
          confirmButtonText: 'Okay',
        });
        break;

      case 'contact':
        Swal.fire({
          title: 'Contact Us',
          text: 'You can contact us at contact@example.com.',
          icon: 'info',
          confirmButtonText: 'Got it',
        });
        break;

      // Add more cases as needed
      default:
        Swal.fire({
          title: 'Notice',
          text: `You clicked on ${menuItem}.`,
          icon: 'info',
          confirmButtonText: 'Understood',
        });
        break;
    }
  };

  return (
    <div className="hamburger-menu">
      <button className={`hamburger ${isOpen ? 'is-open' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className={`menu ${isOpen ? 'is-open' : ''}`}>
        <a href="#home" onClick={() => handleMenuItemClick('home')}>Home</a>
        <a href="#about" onClick={() => handleMenuItemClick('about')}>About</a>
        <a href="#services" onClick={() => handleMenuItemClick('services')}>Services</a>
        <a href="#contact" onClick={() => handleMenuItemClick('contact')}>Contact</a>
      </div>
    </div>
  );
};

export default HamburgerMenu;
