import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedAdminRoute() {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (!token || !userStr) {
    // Not logged in, redirect to admin login
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);

    // Check if user is admin
    if (user.role !== 'admin') {
      // Not admin, redirect to homepage
      alert('Access Denied: Admin privileges required');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return <Navigate to="/" replace />;
    }

    // User is admin, render the protected content
    return <Outlet />;
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/admin/login" replace />;
  }
}
