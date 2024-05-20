import React, { useState } from 'react';
import Logout from '../Logout';


const MainMenuIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginTop: '1px' }}
  >
    <path
      d="M10.7866 4.77305L6.41157 0.944923C6.17592 0.738737 5.82408 0.738737 5.58844 0.944923L1.21343 4.77305C1.0778 4.89173 1 5.06318 1 5.24341V10.5848C1 10.93 1.27982 11.2098 1.625 11.2098H10.375C10.7202 11.2098 11 10.93 11 10.5848V5.24341C11 5.06318 10.9222 4.89173 10.7866 4.77305Z"
      stroke="white"
      strokeOpacity="0.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Header = ({ setIsAdding, setIsAuthenticated, onSearch, subtitle, returnToMainMenu, fetchData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {    
    const newSearchTerm = e.target.value;
    fetchData(newSearchTerm);
    setSearchTerm(newSearchTerm);
  };

  return (
    <header style={{ borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Inventory Management Software</h1>
          <div style={{ display: 'flex', alignItems: 'center' , marginTop: '11px'}}>
            <button onClick={returnToMainMenu}>
              {MainMenuIcon}
            </button>
            <Logout setIsAuthenticated={setIsAuthenticated} />
          </div>
        </div>
        <h2 className="header-subtitle" style={{ marginTop: '10px' }}>
          {subtitle || "General information about the company's inventory."}
        </h2>
      </div>

      {/* Section containing the search bar and add button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search Item..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '1028px', padding: '0.75rem 1.25rem' }}
          />
          <button onClick={() => setIsAdding(true)}>Add Item</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
