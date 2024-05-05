import React, { useState } from 'react';
import Swal from 'sweetalert2';


const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (moduleName) => {
    Swal.fire({
      title: `Selected ${moduleName}`,
      text: `You have selected ${moduleName}`,
      icon: 'info',
      confirmButtonText: 'Ok',
    });
  };

  return (
    <div className="hamburger-menu">
      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      {menuOpen && (
        <div className="menu-content">
          <div className="menu-item" onClick={() => handleMenuClick('Module 1')}>
            Module 1
          </div>
          <div className="menu-item" onClick={() => handleMenuClick('Module 2')}>
            Module 2
          </div>
          <div className="menu-item" onClick={() => handleMenuClick('Module 3')}>
            Module 3
          </div>
          <div className="menu-item" onClick={() => handleMenuClick('Module 4')}>
            Module 4
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
