import React, { useState } from 'react';
import Logout from '../Logout';
import { showGeneratePdfPopup } from '../Meeting DashBoard/GenPDFReport';

const MeetingHeader = ({ setIsAdding, setIsAuthenticated, onSearch, meetingData, subtitle, returnToMainMenu }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (onSearch) {
      onSearch(newSearchTerm);
    }
  };

  const handleGeneratePdf = () => {
    showGeneratePdfPopup(meetingData);
  };

  return (
    <header style={{ borderBottom: '1px solid #ddd' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}>Meeting Management Software</h1>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '11px' }}>
            <button onClick={returnToMainMenu}>Main Menu</button>
            <Logout setIsAuthenticated={setIsAuthenticated} />
          </div>
        </div>
        {/* Add the subtitle here */}
        <h2 className="header-subtitle" style={{ marginTop: '10px' }}>
          {subtitle || "Manage your meetings efficiently and effectively."}
        </h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search Meetings..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ padding: '0.75rem 1.25rem', width: '1028px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => setIsAdding(true)}>Add Meeting</button>
          <button onClick={handleGeneratePdf}>Generate PDF Report</button>
        </div>
      </div>
    </header>
  );
};

export default MeetingHeader;
