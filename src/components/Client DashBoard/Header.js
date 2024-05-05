import React, { useState } from 'react';
import Logout from '../Logout';

const ClientHeader = ({ setIsAdding, setIsAuthenticated, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (onSearch) {
      onSearch(newSearchTerm);
    }
  };

  return (
    <header>
      <h1>Client Management Software</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '500px', padding: '0.75rem 1.25rem' }}
          />
          <button onClick={() => setIsAdding(true)}>Add Client</button>
        </div>

        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default ClientHeader;