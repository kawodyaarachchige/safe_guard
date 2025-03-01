/**
 * Project Name: SafeGuard
 * Author: Tharushi Kawodya
 * Email: kawodya.wa@gmail.com
 * Copyright (c) 2025 TK. All rights reserved.
 * Unauthorized copying of this file, via any medium, is strictly prohibited.
 * Licensed under the MIT License.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Footer from './components/Footer';
import EmergencyButton from './components/EmergencyButton';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import LocationPage from './pages/LocationPage';
import DashboardPage from './pages/DashboardPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ContactManagerPage from "./pages/ContactManger.tsx";

import PanicMode from "./components/PanicMode.tsx";
import AboutPage from "./pages/About.tsx";
import PeriodDetails from "./pages/PeriodDetails.tsx";
import ChatBot from "./components/ChatBot.tsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/location" element={<LocationPage />} />
              {/*<Route path="/period-details" element={<PeriodDetails/>} />*/}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/contacts" element={<ContactManagerPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </Routes>
          </main>
          <EmergencyButton />
          <PanicMode />
          <ChatBot/>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;