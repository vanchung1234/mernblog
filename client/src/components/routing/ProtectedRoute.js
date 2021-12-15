import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '../layouts/Header';
import Navbar from '../layouts/Navbar';
const ProtectedRoute = ({ children }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className="loading">
        <span>Trang đang tải vui lòng chờ :)</span>
      </div>
    );
  return isAuthenticated ? (
    <div className="home">
      <Navbar />
      {children}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
