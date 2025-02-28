import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {LogOut, Heart, Cookie} from 'lucide-react';
import { RootState } from '../store/store';
import {clearUser, setUser} from '../store/slices/userSlice';
import Cookies from "js-cookie";
import {all} from "axios";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user) {
      const userId = Cookies.get('user_id')
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      userId? dispatch(setUser(userId)) : navigate('/');
    }
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove('user_id');
    Cookies.remove('user_email');
    Cookies.remove('user_name');
    navigate('/');
  };

  return (
      <header className="glass-effect sticky top-0 z-50 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-2 rounded-lg">
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              SafeGuard
            </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
              {user ? (
                  <>
                    <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">Dashboard</Link>
                    <Link to="/location" className="text-gray-600 hover:text-purple-600 transition-colors">Location</Link>
                    <Link to="/period-details" className="text-gray-600 hover:text-purple-600 transition-colors">Period Details</Link>
                    <Link to="/report" className="text-gray-600 hover:text-purple-600 transition-colors">Report</Link>
                    <Link to="/contacts" className="text-gray-700 hover:text-purple-500">Phone Book</Link>
                  </>
              ) : (
                  <>
                    <Link to="/login" className="text-gray-600 hover:text-purple-600 transition-colors">Login</Link>
                    <Link
                        to="/signup"
                        className="button-gradient text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                    >
                      Sign Up
                    </Link>
                  </>
              )}
            </nav>

            {user && (
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
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