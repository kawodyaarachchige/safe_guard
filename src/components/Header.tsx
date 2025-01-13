import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Shield, LogOut } from 'lucide-react';
import { RootState } from '../store/store';
import { clearUser } from '../store/slices/userSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-purple-800">SafeGuard</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-purple-600">Dashboard</Link>
                <Link to="/location" className="text-gray-600 hover:text-purple-600">Location</Link>
                <Link to="/report" className="text-gray-600 hover:text-purple-600">Report</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-purple-600">Login</Link>
                <Link 
                  to="/signup" 
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}