// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ element, redirectTo }) {
  const { loggedInUser } = useAuth();
  return loggedInUser ? element : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
