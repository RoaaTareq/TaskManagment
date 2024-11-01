import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/Home/Home';
import Navbar from './views/Layout/Navbar';
import MainFooter from './views/Layout/MainFooter';
import Register from './views/Auth/Register';
import Login from './views/Auth/Login';
import Dashboard from './views/Dashboard/Dashboard';
import MainSidebar from './views/Dashboard/Layout/MainSidebar';

function App() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        {/* Protect the dashboard route */}
        <Route
          path="/dashboard/*"
          element={loggedInUser ? <MainSidebar /> : <Navigate to="/sign-in" />}
        />
      </Routes>
      <MainFooter />
    </Router>
  );
}

export default App;
