import React, { useState, useEffect } from 'react';

import Login from '../Login';
import InventoryDashboard from '../Inventory DashBoard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <InventoryDashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
/*
import React from 'react';
import HamburgerMenu from './HamburgerMenu';

function App() {
  return (
    <div className="App">
      <HamburgerMenu />
    </div>
  );
}

export default App;
*/