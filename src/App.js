import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './views/Home/Home';
import Navbar from './views/Layout/Navbar';
import MainFooter from './views/Layout/MainFooter';
import Register from './views/Auth/Register';
import Login from './views/Auth/Login';
import MainSidebar from './views/Dashboard/Layout/MainSidebar';
import NotFound from './views/Error/NotFound';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './i18n';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <MainContent />
      </Router>
    </AuthProvider>
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
      
      {/* Render footer only on home page */}
      {location.pathname === '/' && <MainFooter />}
    </>
  );
}

export default App;
