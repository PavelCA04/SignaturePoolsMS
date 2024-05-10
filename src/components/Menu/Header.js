import React from 'react';
import Logout from '../Logout';

const Header = ({ setIsAuthenticated, subtitle }) => {
  return (
    <header style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>General Dashboard</h1>
        <Logout setIsAuthenticated={setIsAuthenticated} style={{ marginTop: '10px' }} />
      </div>
      
      <h2 className="header-subtitle" style={{ marginTop: '10px' }}>
        {subtitle || "General information about the company's departments"}
      </h2>
    </header>
  );
};

export default Header;
