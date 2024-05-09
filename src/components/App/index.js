import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Login';
import Menu from '../Menu';
import Clients from '../Clients DashBoard';
import Inventory from '../Inventory DashBoard';
import Meetings from '../Meetings DashBoard';
import Employees from '../Employees DashBoard';
import Logout from '../Logout';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
export default App;

