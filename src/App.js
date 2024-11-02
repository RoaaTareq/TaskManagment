// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './views/Home/Home';
import Navbar from './views/Layout/Navbar';
import MainFooter from './views/Layout/MainFooter';
import Register from './views/Auth/Register';
import Login from './views/Auth/Login';
import MainSidebar from './views/Dashboard/Layout/MainSidebar';
import NotFound from './views/Error/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AppProviders from './context/AppProviders';
import './i18n';

function App() {
  return (
    <AppProviders>
      <Router>
        <Navbar />
        <MainContent />
      </Router>
    </AppProviders>
  );
}

function MainContent() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute
              element={<MainSidebar />}
              redirectTo="/sign-in"
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      
      
      {location.pathname === '/' && <MainFooter />}
    </>
  );
}

export default App;
