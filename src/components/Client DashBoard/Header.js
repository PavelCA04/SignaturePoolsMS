import React from 'react';

import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
      <h1>Client Management Software</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add Client</button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
