import React, { useState } from 'react';
import Logout from '../Logout';

const ClientHeader = ({ setIsAdding, setIsAuthenticated, onSearch, subtitle, returnToMainMenu }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (onSearch) {
      onSearch(newSearchTerm);
    }
  };

  return (
    <header style={{ borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Client Management Software</h1>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '11px' }}>
            <button onClick={returnToMainMenu}>Main Menu</button>
            <Logout setIsAuthenticated={setIsAuthenticated} />
          </div>
        </div>
        <h2 className="header-subtitle" style={{ marginTop: '10px' }}>
          {subtitle || "Manage your clients efficiently and effectively."}
        </h2>
      </div>

      {/* Section containing the search bar and add button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '1028px', padding: '0.75rem 1.25rem' }}
          />
          <button onClick={() => setIsAdding(true)}>Add Client</button>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
