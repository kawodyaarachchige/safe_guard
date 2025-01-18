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
import AIChat from "./pages/AIChat.tsx";
import PanicMode from "./components/PanicMode.tsx";
import AboutPage from "./pages/About.tsx";

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
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/contacts" element={<ContactManagerPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/aichat" element={<AIChat />} />
            </Routes>
          </main>
          <EmergencyButton />
          <PanicMode />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;