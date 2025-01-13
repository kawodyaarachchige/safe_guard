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
      <header className="bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Branding */}
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-extrabold tracking-wide">SafeGuard</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                  to="/"
                  className="hover:text-yellow-400 transition-colors duration-200"
              >
                Home
              </Link>
              {user ? (
                  <>
                    <Link
                        to="/dashboard"
                        className="hover:text-yellow-400 transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                    <Link
                        to="/location"
                        className="hover:text-yellow-400 transition-colors duration-200"
                    >
                      Location
                    </Link>
                    <Link
                        to="/report"
                        className="hover:text-yellow-400 transition-colors duration-200"
                    >
                      Report
                    </Link>
                  </>
              ) : (
                  <>
                    <Link
                        to="/login"
                        className="hover:text-yellow-400 transition-colors duration-200"
                    >
                      Login
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 transition-all"
                    >
                      Sign Up
                    </Link>
                  </>
              )}
            </nav>

            {/* Logout Button */}
            {user && (
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-200"
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
